import React, { useEffect, useState } from "react";
import { getChapters } from "../api";

function ChapterList({ mangaId, onSelect }) {
  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    const fetchChapters = async () => {
      const res = await getChapters(mangaId);
      setChapters(res.data.data);
    };

    fetchChapters();
  }, [mangaId]);
  return (
    <div>
      <h2>Chapters</h2>

      {chapters.map((ch) => (
        <div key={ch.id}>
          <button onClick={() => onSelect(ch.id)}>
            Chapter {ch.attributes.chapter}
          </button>
        </div>
      ))}
    </div>
  );
}

export default ChapterList;