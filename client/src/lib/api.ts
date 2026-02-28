import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fileApi = axios.create({
  baseURL: API_BASE_URL,
  // Let the browser set the boundary for multipart/form-data
});

// We can add interceptors here later if we implement JWT Auth
