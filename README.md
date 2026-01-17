# 🎧 YouMusic

YouMusic is a full-stack web application that converts YouTube videos into MP3 audio files for **personal and educational use**.  
It provides a clean, responsive interface with smart validation, error handling, and fast conversions.

🚀 **Live Demo**  
👉 https://youmusiclive.vercel.app

---

## ✨ Features

- 🎵 Convert YouTube videos to MP3
- 🖼️ Displays video thumbnail, title, duration, and file size
- ⚡ Fast conversion using RapidAPI
- ✅ Supports all YouTube link formats (watch, youtu.be, shorts)
- 🔄 Loading spinner with friendly error messages
- 📱 Fully responsive design (mobile, tablet, desktop)
- 🔐 Secure API key handling with environment variables
- ☁️ Deployed on cloud platforms

---

## 🛠 Tech Stack

### Frontend
- React (Create React App)
- CSS (Responsive UI)
- Fetch API

### Backend
- Node.js
- Express.js
- RapidAPI (YouTube MP3 API)
- Axios
- CORS

### Deployment
- Frontend: **Vercel**
- Backend: **Railway**
- Version Control: **Git & GitHub**

---

## 📂 Project Structure

YouMusic/
├── backend/
│   ├── server.js
│   ├── package.json
│   └── .env (ignored)
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md

---

## ⚙️ Environment Variables

The backend requires the following environment variable:

```env
RAPIDAPI_KEY=your_rapidapi_key_here
```
⚠️ Do NOT commit .env files to GitHub.
Use Railway / Vercel dashboards to store secrets.

🚀 Run Locally

1️⃣ Clone the repository
git clone https://github.com/YOUR_GITHUB_USERNAME/youmusic.git

cd youmusic

2️⃣ Start backend
cd backend
npm install
npm start

3️⃣ Start frontend
cd frontend
npm install
npm start

Frontend runs on http://localhost:3000

Backend runs on http://localhost:5000

# ⚠️ Disclaimer

This project is intended for personal and educational use only.
Downloading or redistributing copyrighted content may violate YouTube’s Terms of Service.
The developer is not responsible for any misuse of this application.


# 📌 Future Enhancements


🎧 Ringtone trimming (select 10–30 seconds)


🌙 Dark mode


📱 Progressive Web App (PWA)


📊 Usage analytics


📂 Download history


🎼 Playlist support


# 👨‍💻 Author

Raj Aryan


GitHub: https://github.com/theguynamedraj


Role: Full-Stack Web Developer



⭐ If you like this project, don’t forget to give it a star!
