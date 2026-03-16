import React, { useEffect, useState } from "react";
import { readChapter } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
function Reader() {
  const [pages, setPages] = useState([]);
  const { chapterId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const chapters = location.state?.chapters || [];

  useEffect(() => {
    console.log("Chapter ID:", chapterId);

    const fetchPages = async () => {
      const res = await readChapter(chapterId);

      console.log("API RESPONSE:", res.data);

      const base = res.data.baseUrl;
      const chapter = res.data.chapter;
      const hash = chapter.hash;

      const files =
        chapter.data.length > 0
          ? chapter.data
          : chapter.dataSaver;

      const urls = files.map(
        (file) => `${base}/data/${hash}/${file}`
      );

      console.log("IMAGE URLS:", urls);

      setPages(urls);
    };

    fetchPages();
  }, [chapterId]);

  const currentIndex = chapters.findIndex(
    (c) => c.id === chapterId
  );

  const nextChapter = () => {
    if (currentIndex < chapters.length - 1) {
      navigate(`/read/${chapters[currentIndex + 1].id}`, {
        state: { chapters },
      });
    }
  };

  const prevChapter = () => {
    if (currentIndex > 0) {
      navigate(`/read/${chapters[currentIndex - 1].id}`, {
        state: { chapters },
      });
    }
  };

  return (
    <div className="container">
      <div className="reader">

        <div className="reader-controls">
          <button onClick={() => navigate("/")}>Back</button>
          <button onClick={prevChapter}>Previous</button>
          <button onClick={nextChapter}>Next</button>
        </div>

      </div>


      {pages.length === 0 ? (
        <p>Loading pages...</p>
      ) : (
        pages.map((img, i) => (
          <img
            key={i}
            src={img}
            alt={`page-${i}`}
            loading="lazy"
            style={{ width: "100%" }}
          />
        ))
      )}
      <div className="reader">

        <div className="reader-controls">
          <button onClick={() => navigate("/")}>Back</button>
          <button onClick={prevChapter}>Previous</button>
          <button onClick={nextChapter}>Next</button>
        </div>

      </div>
    </div>
  );
}

export default Reader;