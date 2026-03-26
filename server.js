const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { Pool } = require('pg');

const app = express();
app.use(cors()); 
app.use(express.json({ limit: '50mb' })); 

// Database configuration
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'facereco',
    password: 'Shreyansh1$', // Ensure this matches your pgAdmin password
    port: 5432,
});

pool.query('SELECT NOW()', (err, res) => {
    if (err) console.error("❌ DB CONNECTION FAILED:", err.message);
    else console.log("✅ DB CONNECTED SUCCESSFULLY");
});

app.post('/api/login/face', async (req, res) => {
    try {
        const { image } = req.body; 
        if (!image) return res.status(400).json({ error: "No image received" });

        // 1. Ask Python to recognize the face
        const pythonResponse = await axios.post('http://localhost:8000/recognize-face/', { image });

        // CASE A: FACE IS KNOWN
        if (pythonResponse.data.status === "success") {
            const faceId = pythonResponse.data.userId;
            const dbResult = await pool.query('SELECT * FROM students WHERE face_id = $1', [faceId]);

            if (dbResult.rows.length > 0) {
                return res.status(200).json({ status: "login", user: dbResult.rows[0] });
            } else {
                // If AI knows them but DB doesn't, do NOT create a recovery record, since it violates not-null constraints (email, password etc.)
                return res.status(200).json({ status: "error", message: "Face recognized, but user not found in database. Please register." });
            }
        } 
        
        // CASE B: FACE IS UNKNOWN OR NO FACE
        else {
            if (pythonResponse.data.status === "noface") {
                return res.status(200).json({ status: "noface", message: "No face detected in webcam." });
            } else if (pythonResponse.data.status === "error") {
                return res.status(200).json({ status: "error", message: pythonResponse.data.message });
            } else {
                return res.status(200).json({ status: "unknown", message: "Face not recognized." });
            }
        }
    } catch (error) {
        console.error("❌ SERVER ERROR:", error.message);
        res.status(500).json({ error: "System Error", details: error.message });
    }
});

app.post('/api/register/face', async (req, res) => {
    try {
        const { images, name, email, password, role } = req.body;
        
        if (!images || images.length === 0) return res.status(400).json({ error: "No images received" });
        if (!name || !email || !password || !role) return res.status(400).json({ error: "All fields are required" });

        // Check for unique email
        const emailCheck = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
        if (emailCheck.rows.length > 0) {
            return res.status(400).json({ error: "Email is already registered. Please login instead." });
        }

        const idRes = await pool.query('SELECT COALESCE(MAX(face_id), 0) + 1 as next_id FROM students');
        const nextId = idRes.rows[0].next_id;

        const newUser = await pool.query(
            'INSERT INTO students (face_id, name, email, password, role) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nextId, name, email, password, role]
        );

        // Trigger the Python training sequence by sending all images
        const pythonResponse = await axios.post(`http://localhost:8000/train-new-face/${nextId}`, 
            { images }, 
            { timeout: 60000 } // Ensures Node doesn't hang up on Python
        );

        if (pythonResponse.data.status === "error") {
            // Delete the student record if training failed
            await pool.query('DELETE FROM students WHERE face_id = $1', [nextId]);
            return res.status(400).json({ error: pythonResponse.data.message });
        }

        return res.status(201).json({ 
            status: "registered", 
            message: "Training complete!", 
            user: newUser.rows[0] 
        });
    } catch (error) {
        console.error("❌ SERVER ERROR:", error.message);
        res.status(500).json({ error: "System Error", details: error.message });
    }
});

app.post('/api/login/password', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) return res.status(400).json({ error: "Email, password, and role required" });

        const dbResult = await pool.query('SELECT * FROM students WHERE email = $1', [email]);
        if (dbResult.rows.length === 0) {
            return res.status(404).json({ error: "User not found. Please register." });
        }

        const user = dbResult.rows[0];
        if (user.password !== password) {
            return res.status(401).json({ error: "Incorrect password." });
        }
        
        if (user.role !== role) {
            return res.status(403).json({ error: `User is registered as ${user.role}, not ${role}.` });
        }

        return res.status(200).json({ status: "login", user });
    } catch (error) {
        console.error("❌ SERVER ERROR:", error.message);
        res.status(500).json({ error: "System Error", details: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Node.js Bridge Server ready on port ${PORT}`));