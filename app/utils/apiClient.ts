import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jubilant-space-lamp-pjw45v6q9j752rvrg-3000.app.github.dev/api", // Replace with your API base URL
  timeout: 300000, // Optional: Timeout after 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
