# Personal Healthcare Assistant

A full-stack web application that allows users to securely manage their personal health information — including medical profile, medications, appointments, and emergency contacts — with an AI-powered health assistant and a scannable emergency QR code for critical situations.

> **Final-year B.Tech project (CSE — AI & Data Science)**
> Built with the MERN stack, using only user-provided or simulated data. This application does **not** connect to any real hospital or medical database.

🔗 **Live Demo:** [https://personal-healthcare-assistant-front.vercel.app](https://personal-healthcare-assistant-front.vercel.app)

---

## Features

- **User Authentication** — Secure registration and login using JWT and bcrypt password hashing
- **Health Profile** — Store age, gender, blood group, allergies, chronic conditions, and current medications
- **Medication Tracker** — Add, edit, and delete medications with dosage, frequency, and timing
- **Appointment Manager** — Schedule and manage upcoming doctor appointments
- **Emergency Contacts** — Save emergency contacts with an option to mark them publicly visible
- **Emergency QR Code** — Generates a scannable QR code linking to a public emergency profile page, showing only critical info (blood group, allergies, chronic conditions, and opted-in contacts) — no login required for first responders
- **AI Health Assistant** — Chat interface powered by the Gemini API, using the user's profile context to answer general health questions (not a diagnostic tool)
- **Dashboard** — A single overview page summarizing profile, medications, and appointments

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js (Vite) + Tailwind CSS |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas + Mongoose |
| Authentication | JWT + bcrypt |
| HTTP Client | Axios |
| AI | Gemini API |
| Deployment | Vercel (frontend) + Render (backend) |

---

## Project Structure

```
personal-healthcare-assistant/
├── frontend/
│   └── src/
│       ├── components/     # Reusable UI components (Navbar, ProtectedRoute)
│       ├── pages/          # Page-level components (Login, Dashboard, etc.)
│       ├── services/       # Axios instance and API calls
│       ├── App.jsx
│       └── main.jsx
│
└── backend/
    ├── models/              # Mongoose schemas (User, HealthProfile, etc.)
    ├── routes/              # Express route handlers
    ├── middleware/          # JWT authentication middleware
    └── server.js            # Entry point
```

---

## Getting Started (Local Setup)

### Prerequisites
- Node.js (v18 or higher)
- A MongoDB Atlas account (free tier)
- A Gemini API key

### 1. Clone the repository

```bash
git clone https://github.com/zaara1017/personal-healthcare-assistant.git
cd personal-healthcare-assistant
```

### 2. Backend setup

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/` (see [`.env.example`](./backend/.env.example)):

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_gemini_api_key
```

Run the backend:

```bash
npm run dev
```

Backend will start on `http://localhost:5000`.

### 3. Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

Frontend will start on `http://localhost:5173`.

---

## Security Practices Followed

- Passwords are hashed using bcrypt before storage — plain-text passwords are never saved
- Authentication is handled via stateless JWT tokens with a 7-day expiry
- All private API routes are protected by middleware that verifies the JWT and scopes every database query to the logged-in user, preventing users from accessing each other's data
- Secrets (database URI, JWT secret, API keys) are stored in environment variables and excluded from version control via `.gitignore`
- The public emergency profile endpoint only exposes fields the user has explicitly marked as public — no authentication data, medications, or appointments are ever exposed
- CORS is restricted to the deployed frontend origin in production

---

## API Overview

| Route | Method | Protected | Description |
|---|---|---|---|
| `/api/auth/register` | POST | No | Register a new user |
| `/api/auth/login` | POST | No | Log in and receive a JWT |
| `/api/auth/me` | GET | Yes | Get the logged-in user's details |
| `/api/profile` | GET / POST | Yes | Fetch / create-update health profile |
| `/api/medications` | GET / POST / PUT / DELETE | Yes | Manage medications |
| `/api/appointments` | GET / POST / PUT / DELETE | Yes | Manage appointments |
| `/api/emergency-contacts` | GET / POST / PUT / DELETE | Yes | Manage emergency contacts |
| `/api/public/emergency/:userId` | GET | No | Public emergency profile (QR code target) |

---

## Disclaimer

This application is an academic project built for demonstration purposes. It uses simulated or user-provided data only and is **not connected to any real hospital, clinic, or medical records system**. The AI health assistant provides general informational content only and is **not a substitute for professional medical advice, diagnosis, or treatment**. Always consult a qualified healthcare provider for medical concerns.

---

## Author

**Zaara Sahid**
B.Tech CSE (AI & Data Science), Shri Vishnu Engineering College For Women, Bhimavaram
