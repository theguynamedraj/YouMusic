const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

console.log("Booting YouMusic Backend...");

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Backend OK");
});

// Convert route
app.post("/convert", async (req, res) => {
  const { url } = req.body;
  console.log("Received request:", url);

  // UNIVERSAL YouTube video ID extractor
  let videoId = null;

  try {
    const urlObj = new URL(url);

    if (urlObj.hostname.includes("youtu.be")) {
      videoId = urlObj.pathname.slice(1);
    } else if (urlObj.pathname.startsWith("/shorts/")) {
      videoId = urlObj.pathname.split("/shorts/")[1];
    } else {
      videoId = urlObj.searchParams.get("v");
    }
  } catch {
    videoId = null;
  }

  // Fallback regex (ANY format)
  if (!videoId) {
    const match = url.match(/(v=|\/shorts\/|\/)([A-Za-z0-9_-]{11})/);
    videoId = match ? match[2] : null;
  }

  console.log("Extracted Video ID:", videoId);

  // Validate ID
  if (!videoId) {
    console.log("❌ Invalid YouTube link");
    return res.status(400).json({ error: "Invalid YouTube URL" });
  }

  try {
    const response = await axios.get("https://youtube-mp36.p.rapidapi.com/dl", {
      params: { id: videoId },
      headers: {
        "X-RapidAPI-Key": process.env.RAPIDAPI_KEY,
        "X-RapidAPI-Host": "youtube-mp36.p.rapidapi.com",
      },
    });

    console.log("✔ RapidAPI Response:", response.data);
    res.json(response.data);

  } catch (error) {
    console.log("❌ RapidAPI ERROR:", error.response?.data || error.message);

    res.status(500).json({
      error:
        error.response?.data?.msg ||
        error.response?.data?.error ||
        "RapidAPI request failed",
      status: error.response?.data?.status || "error"
    });
  }
});

app.listen(5000, () => console.log("YouMusic backend running 🎧 on port 5000"));
