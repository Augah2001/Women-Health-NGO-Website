import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://zany-space-goggles-pv5jqqjg9572rrg6-3000.app.github.dev/api", // Replace with your API base URL
  timeout: 300000, // Optional: Timeout after 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
