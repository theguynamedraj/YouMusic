import { useState } from "react";
import "./App.css";

function App() {
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // All your existing functions remain unchanged (extractVideoId, isValidYouTubeUrl, convert)
  const extractVideoId = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes("youtu.be")) {
        return urlObj.pathname.slice(1);
      } else if (urlObj.pathname.startsWith("/shorts/")) {
        return urlObj.pathname.split("/shorts/")[1];
      } else {
        return urlObj.searchParams.get("v");
      }
    } catch {
      return null;
    }
  };

  const isValidYouTubeUrl = (url) => {
    try {
      const urlObj = new URL(url);
      return (
        urlObj.hostname.includes("youtube.com") ||
        urlObj.hostname.includes("youtu.be")
      );
    } catch {
      return false;
    }
  };

  const convert = async () => {
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await fetch("http://localhost:5000/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: youtubeUrl }),
      });

      const data = await res.json();

      if (!data.link && data.error) throw new Error(data.error);

      const videoId =
        extractVideoId(youtubeUrl) ||
        youtubeUrl.split("v=")[1]?.split("&")[0] ||
        youtubeUrl.split("youtu.be/")[1] ||
        youtubeUrl.split("shorts/")[1];

      setResult({
        link: data.link,
        title: data.title,
        duration: Math.round(data.duration),
        filesize: (data.filesize / 1024 / 1024).toFixed(2),
        thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
      });
    } catch (err) {
      let message = "Something went wrong.";

      if (err.message.includes("Invalid YouTube URL")) {
        message = "Please paste a valid YouTube link.";
      } else if (err.message.includes("Removed")) {
        message = "This video is removed or blocked.";
      } else if (err.message.includes("Not Available")) {
        message =
          "This video cannot be converted (copyright or region blocked).";
      } else if (err.message.includes("Failed to fetch")) {
        message = "Cannot reach server. Is backend running?";
      } else {
        message = "Conversion failed. Try a different link.";
      }

      setError(message);
    }

    setLoading(false);
  };

  return (
    <div className="app-wrapper">
      <div className="container">
        <div className="header">
          <div className="logo">
            <svg className="music-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
            </svg>
            <h1>YouMusic</h1>
          </div>
          <p className="subtitle">Download your favourite YouTube songs as high-quality MP3</p>
        </div>

        <div className="input-section glass">
          <div className="input-group">
            <svg
              className="input-icon"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>

            <input
              type="text"
              placeholder="Paste YouTube URL here..."
              value={youtubeUrl}
              onChange={(e) => {
                let cleaned = e.target.value.trim();
                cleaned = cleaned.split("&")[0];
                cleaned = cleaned.split("?si=")[0];
                cleaned = cleaned.replace(/&pp=.*/g, "");
                setYoutubeUrl(cleaned);
              }}
            />
          </div>
          {youtubeUrl && !isValidYouTubeUrl(youtubeUrl) && (
            <p className="error-inline">⚠️ Invalid YouTube link</p>
          )}
          <button
            className="convert-btn"
            onClick={convert}
            disabled={!youtubeUrl || !isValidYouTubeUrl(youtubeUrl) || loading}
          >
            {loading ? (
              <>
                <div className="spinner-small"></div>
                Processing...
              </>
            ) : (
              <>
                <svg
                  className="btn-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                Convert to MP3
              </>
            )}
          </button>
        </div>

        {loading && (
          <div className="loading-card glass">
            <div className="spinner-large"></div>
            <p>Extracting audio... This may take a moment</p>
          </div>
        )}

        {error && (
          <div className="error-card glass">
            <svg className="error-icon" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
            {error}
          </div>
        )}

        {result && (
          <div className="result-card glass elevate">
            <div className="thumbnail-wrapper">
              <img
                src={result.thumbnail}
                alt="Video thumbnail"
                className="thumbnail"
              />
              <div className="play-overlay">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5,3 19,12 5,21 5,3" />
                </svg>
              </div>
            </div>
            <div className="result-info">
              <h3 className="title">{result.title}</h3>
              <div className="meta-grid">
                <div className="meta-item">
                  <svg
                    className="meta-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{result.duration}s</span>
                </div>
                <div className="meta-item">
                  <svg
                    className="meta-icon"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <rect x="3" y="7" width="18" height="10" rx="2" />
                    <circle cx="12" cy="13" r="1" />
                  </svg>
                  <span>{result.filesize} MB</span>
                </div>
              </div>
            </div>
            <a
              href={result.link}
              className="download-link"
              target="_blank"
              rel="noreferrer"
              download
            >
              <button className="download-btn">
                <svg
                  className="btn-icon"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download MP3
              </button>
            </a>
          </div>
        )}
        {/*Footer*/}
        <footer className="creator-footer">
  <p>Made with ❤️ by <a href="https://github.com/theguynamedraj" target="_blank" rel="noreferrer">Raj Aryan</a></p>
</footer>


      </div>
    </div>
  );
}


export default App;
