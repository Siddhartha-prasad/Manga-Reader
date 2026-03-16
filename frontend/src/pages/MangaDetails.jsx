import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getChapters } from "../api";
import { Link } from "react-router-dom";



function MangaDetails() {
  const { id } = useParams();
  const [chapters, setChapters] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      const res = await getChapters(id);
      setChapters(res.data.data);
    };

    fetch();
  }, [id]);

  return (
    <div className="container">
      <button onClick={() => navigate("/")}>Back</button>
      <h1>Chapters</h1>

      {chapters.map((ch) => (
        <div key={ch.id}>
          <Link
            to={`/read/${ch.id}`}
            state={{ chapters }}
          >
            Chapter {ch.attributes.chapter}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default MangaDetails;