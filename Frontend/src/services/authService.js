import axios from "axios";

// Use environment variable for the base URL
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});


export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);

    const data = response.data;
    if (data.token) {
      localStorage.setItem("token", data.token);
    } else {
      throw new Error("Token not provided by the server");
    }
    console.log(response)
    return data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || error.message || "Login failed";
    console.error("Error logging in:", errorMessage);
    throw new Error(errorMessage);
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    const { message } = response.data;

    if (response.status === 201) {
      return { success: true, message };
    } else {
      throw new Error(response.data?.message || "Registration failed");
    }
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};