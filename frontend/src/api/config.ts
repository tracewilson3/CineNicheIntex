export const API_URL =
  window.location.hostname === "localhost"
    ? "https://localhost:5000/Movies"
    : "https://cineniche415backend.azurewebsites.net/Movies";

export const AUTH_URL =
window.location.hostname === "localhost"
    ? "https://localhost:5000/auth"
    : "https://cineniche415backend.azurewebsites.net/auth";


    