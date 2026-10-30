const configuredApiUrl = import.meta.env.VITE_API_URL;

export const API_BASE_URL = configuredApiUrl
  ? `${configuredApiUrl.startsWith("http") ? "" : "https://"}${configuredApiUrl}`.replace(/\/$/, "")
  : "http://localhost:5000";
