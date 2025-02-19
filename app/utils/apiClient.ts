import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://women-health-ngo-website.vercel.app/api", // Replace with your API base URL
  timeout: 300000, // Optional: Timeout after 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
