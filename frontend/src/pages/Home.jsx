import React, { useState, useEffect } from "react";
import { searchManga } from "../api";
import { Link } from "react-router-dom";
import "../App.css";
import { getRecommended } from "../api";

function Home() {
  const [query, setQuery] = useState("");
  const [manga, setManga] = useState([]);

  const handleSearch = async () => {
    const res = await searchManga(query);
    setManga(res.data.data);
  };
  useEffect(() => {
    const fetchRecommended = async () => {
      const res = await getRecommended();
      setManga(res.data.data);
    };

    fetchRecommended();
  }, []);
  return (
    <div className="container">
      <header className="header">
        <h1>Manga Reader</h1>
      </header>
      <div className="search-bar">
        <input

          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search manga"
        />

        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="manga-grid">
        {manga.map((m) => {
          const cover = m.relationships.find(
            (rel) => rel.type === "cover_art"
          );

          const coverFile = manga.relationships.find(
            (r) => r.type === "cover_art"
          )?.attributes?.fileName;

          const coverUrl = `https://uploads.mangadex.org/covers/${manga.id}/${coverFile}`;

          return (

            <Link key={m.id} to={`/manga/${m.id}`}>
              <div className="manga-card">
                <img src={coverUrl} alt="" width="150" />
                <h3>{m.attributes.title.en}</h3>
              </div>
            </Link>

          );
        })}
      </div>
    </div>
  );
}

export default Home;