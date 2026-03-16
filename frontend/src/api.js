import axios from "axios";

const API = axios.create({
  baseURL: "https://manga-reader-ve08.onrender.com/api"
});

export const searchManga = (title) =>
  API.get(`/search?title=${title}`);

export const getChapters = (mangaId) =>
  API.get(`/chapters/${mangaId}`);

export const readChapter = (chapterId) =>
  API.get(`/read/${chapterId}`);
export const getRecommended = () =>
  API.get("/recommended");