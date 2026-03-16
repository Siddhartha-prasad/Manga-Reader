import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import MangaDetails from "./pages/MangaDetails";
import Reader from "./pages/Reader";
import "./App.css";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/manga/:id" element={<MangaDetails />} />
          <Route path="/read/:chapterId" element={<Reader />} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;