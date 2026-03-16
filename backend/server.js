const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const BASE_URL = "https://api.mangadex.org";

app.get("/api/search", async (req, res) => {
  const { title } = req.query;

  try {
    const response = await axios.get(
      "https://api.mangadex.org/manga",
      {
        params: {
          title,
          includes: ["cover_art"],
          limit: 12
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch manga" });
  }
});

// Get chapters of a manga
app.get("/api/chapters/:mangaId", async (req, res) => {
  const { mangaId } = req.params;

  try {
    const response = await axios.get(
      "https://api.mangadex.org/chapter",
      {
        params: {
          manga: mangaId,
          translatedLanguage: ["en"],
          order: { chapter: "asc" },
          limit: 100
        }
      }
    );

    const chapters = response.data.data.filter(
      (c) => c.attributes.pages > 0
    );

    res.json({ data: chapters });

  } catch (err) {
    res.status(500).json({ error: "Failed to fetch chapters" });
  }
});

// Get pages of a chapter
app.get("/api/read/:chapterId", async (req, res) => {
  const { chapterId } = req.params;

  try {
    const response = await axios.get(
      `https://api.mangadex.org/at-home/server/${chapterId}`
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pages" });
  }
});

app.get("/api/recommended", async (req, res) => {
  try {
    const response = await axios.get(
      "https://api.mangadex.org/manga",
      {
        params: {
          limit: 20,
          order: { followedCount: "desc" },
          includes: ["cover_art"]
        }
      }
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch manga" });
  }
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
app.get("/", (req, res) => {
  res.send("Manga Reader API is running");
});