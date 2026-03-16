import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api"
});

export const searchManga = (title) =>
  API.get(`/search?title=${title}`);

export const getChapters = (mangaId) =>
  API.get(`/chapters/${mangaId}`);

export const readChapter = (chapterId) =>
  API.get(`/read/${chapterId}`);
export const getRecommended = () =>
  API.get("/recommended");