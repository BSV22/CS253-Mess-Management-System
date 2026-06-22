#  Mess Management System with Face Recognition

A polished full-stack mess automation system built for student access, manager approval, and face-based authentication.

![Project Banner](https://img.shields.io/badge/Face%20Recognition-OpenCV-blue) ![Tech Stack](https://img.shields.io/badge/Stack-Python%20%7C%20Node%20%7C%20React-yellow) ![DB](https://img.shields.io/badge/Database-PostgreSQL-blueviolet)

---

##  What this project does

This repository combines:

- **Face recognition login** using Python + OpenCV
- **React login interface** with webcam capture
- **Node.js bridge** for image forwarding and authentication
- **Mess management backend** for student/manager workflows

The result is a unified system for student registration, manager approval, and secure mess access.

---


## Contributors

- Shreyansh Dewangan
- Rishith Jalagam
- B Mahath
- Parth Parashar
- Priyanshi Meena
- Inapakurti Rajesh
- Eranki Venkata Jhanani
- Basavakiran Shivanand Deshmukh
- Rohan Kumar
- Siddhant Singh

---

##  Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Repository Structure](#-repository-structure)
- [Getting Started](#-getting-started)
- [Configuration](#-configuration)
- [Run the Services](#-run-the-services)
- [Database Setup](#-database-setup)
- [Default Credentials](#-default-credentials)
- [Workflow](#-workflow)
- [Important Notes](#-important-notes)
- [Troubleshooting](#-troubleshooting)

---

##  Features

- Face login via webcam capture
- Manual email/password login
- Student registration and manager approval
- Face profile storage and recognition
- Mess transactions, menu, feedback, polls, and announcements
- Email support for notifications

---

##  Architecture

### Modules

- `main.py` — Python FastAPI service for face recognition
- `server.js` — Root Node.js bridge for face login and registration
- `Mess_Management_Backend/` — Full mess backend with Express, Sequelize, and PostgreSQL
- `Mess automation login page/` — React + Vite frontend for login UI

### High-level flow

1. React captures webcam image
2. Node/Mess backend sends image to Python face service
3. Python compares face against stored gallery
4. Backend authenticates and returns login response

---

##  Tech Stack

- **Backend**: Node.js, Express, Sequelize
- **Face AI**: Python, FastAPI, OpenCV, NumPy
- **Frontend**: React, Vite, React Webcam
- **Database**: PostgreSQL
- **Authentication**: JWT, Bcrypt
- **Mail**: Nodemailer

---

##  Repository Structure

- `/main.py` — Face recognition API server
- `/server.js` — Root Node.js bridge
- `/package.json` — Root Node dependencies
- `/requirments.txt` — Python dependencies
- `/Mess automation login page/` — React frontend
- `/Mess_Management_Backend/` — Mess backend source code
- `/TrainingImage/` — Training images
- `/TrainingImageLabel/` — Training labels
- `/dlib-19.22.99-cp310-cp310-win_amd64.whl` — Windows dlib wheel

---

##  Getting Started

### 1. Start the Python face recognition service

```bash
cd Final-codes
python3 -m venv venv
source venv/bin/activate
pip install -r requirments.txt
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### 2. Start the Node.js face bridge

```bash
cd Final-codes1
npm install
node server.js
```

### 3. Start the React frontend

```bash
cd Final-codes1/Mess automation login page
npm install
npm run dev
```

### 4. Start the Mess management backend

```bash
cd Final-codes1/Mess_Management_Backend
npm install
npm run dev
```

---

##  Configuration

Create a `.env` file in `Mess_Management_Backend/`:

```env
PORT=5000
DB_URL=postgres://USER:PASSWORD@HOST:PORT/DATABASE
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_password
VITE_API_FACE=http://localhost:8000
```

---

##  Database Setup

Create a PostgreSQL database named `facereco` and use this schema for the root bridge service:

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  face_id INTEGER UNIQUE NOT NULL,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(50) NOT NULL,
  last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 👤 Default Credentials

The seed script creates a default manager account:

```text
email: manager@mess.com
password: abcd1234
```

> Newly registered students must be approved by a manager before they can log in.

---

##  Workflow

### Face recognition flow

- React captures the webcam image
- Backend sends the image to Python
- Python identifies the face from the gallery
- Backend returns login status

### Mess backend flow

- Student registration
- Manager approval
- Menu and transaction tracking
- Feedback and polls
- Face profile login support

---

##  Important Notes

- Run Python, frontend, and backend services in separate terminals
- Ensure PostgreSQL is running and `.env` is configured
- Avoid port conflicts: `5000` is used by the mess backend by default
- Only one app should access the webcam at a time

---

##  Troubleshooting

- Face login fails if Python service is down
- Database errors indicate `DB_URL` or PostgreSQL access issues
- Email failures indicate incorrect `EMAIL_USER`/`EMAIL_PASS`

---

##  Additional Notes

- `Mess automation login page/README.md` has frontend-specific setup details
- The face recognition logic lives in `main.py`
- The mess backend code lives in `Mess_Management_Backend/src/`

---

Thanks for using this mess automation system!
