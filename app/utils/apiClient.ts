import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://www.whiztrust.org/api/", // Replace with your API base URL
  timeout: 3000000, // Optional: Timeout after 10 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
