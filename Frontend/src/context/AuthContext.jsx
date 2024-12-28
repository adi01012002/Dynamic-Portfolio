// import { createContext, useState, useEffect } from "react";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [token, setToken] = useState(localStorage.getItem("authToken") || null);

//   useEffect(() => {
//     if (token) {
//       // Decode token or fetch user details if needed
//       setUser({ username: "User" }); // Example user setup, fetch real details if required
//     }
//   }, [token]);

//   const login = (userData) => {
//     setUser(userData);
//     setToken(userData.token);
//     localStorage.setItem("authToken", userData.token);
//   };

//   const logout = () => {
//     setUser(null);
//     setToken(null);
//     localStorage.removeItem("authToken");
//   };

//   return (
//     <AuthContext.Provider value={{ user, token, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;

import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("authToken") || null);
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = "http://localhost:3000";
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const response = await axios.get(`${API_BASE_URL}/auth/profile`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(response);
          setUser(response.data.user1); // Update with the user data from API
        } catch (error) {
          console.error("Failed to fetch user:", error);
          logout();
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  const login = (userData) => {
    setUser(userData.user); // Assuming `userData` contains user details and token
    setToken(userData.token);
    localStorage.setItem("authToken", userData.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
