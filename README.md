# Face Recognition For Mess Management System
A full-stack authentication system that uses OpenCV (LBPH) for face recognition and PostgreSQL for user data management.

## Tech Stack

### Frontend: 
React.js, Vite, React-Webcam

### Backend (Manager): 
Node.js, Express, PG (PostgreSQL driver)

### AI Engine (Brain): 
Python, FastAPI, OpenCV

### Database: 
PostgreSQL

## Project Setup

### STEP 1 Create datasabe:
Create a database named facereco and run the following SQL command to create the user table:

#### SQL Code:
CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    face_id INTEGER UNIQUE NOT NULL,
    name VARCHAR(100),
    email VARCHAR(100),
    last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

### Step 2 Python Setup:
Download Requirments , create a virtual environment , start servers

#### Bash Commands 

Run the commands inside project folder

1. python -venv venv
2. python\scipts\activate
3. pip install fastapi uvicorn opencv-contrib-python numpy Pilow
4. start python server: uvicorn main:app --reload --port 8000

### Step 3 Backend Setup:

Open a new terminal in parallel

#### Bash Commands:

Run the commands inside project folder:

1. npm install express cors axios pg
2. start backend server:node server.js

### Step 4 React Frontend:

Navigate to the frontend folder(cd frontend) inside the project folder, then run in a new parallel terminal

#### Bash commands:

1. npm install react-webcam react-router-dom
2. Start fontend server: npm run dev


## Workflow

### Capture: 
React captures a base64 image and sends it to Node.js (Port 5000).

### Recognition:
Node.js forwards the image to Python (Port 8000).

### Branching Logic

#### Known Face: 
If the AI recognizes you (e.g., ID 1), Node looks for you in PostgreSQL. If found, it logs you in. If not found in the DB (but known by AI), it auto-appends a record to sync them.

#### Unknown Face: 
If the AI doesn't recognize you, Node triggers train_my_face.py locally to start a new training session and adds a new record to the Database.

## Important Notes:

Camera Lock: The React webcam must be turned off when train_my_face.py starts, otherwise the Python script will crash (only one app can use the camera at a time).

Ports: 
* React: 5173

Node.js: 5000

Python AI: 8000