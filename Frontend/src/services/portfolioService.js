import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createPortfolio = async (data) => {
  const token = localStorage.getItem("token"); // Ensure token is retrieved correctly

  if (!token) {
    throw new Error("Token is missing");
  }

  // try {
    const response = await axios.post(
      `${API_BASE_URL}/portfolio/create`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(response)
    return response.data; // Assuming the server responds with the created portfolio
  // } catch (error) {
  //   console.error("Error creating portfolio:", error.response?.data || error.message);
  //   throw error.response?.data || error;
  // }
};


export const fetchPortfolioByUserId = async (userId) => {
  console.log(userId)
  try {
    const token = localStorage.getItem("token"); // Ensure token is present in localStorage
    if (!token) {
      throw new Error("Token is missing. Please log in.");
    }

    const response = await axios.get(`${API_BASE_URL}/portfolio/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token for authentication
      },
    });
    console.log(response)
    return response.data.portfolio; // Assuming the server responds with { portfolio: {...} }
  } catch (error) {
    console.error("Error fetching portfolio:", error.response?.data || error.message);
    throw error.response?.data || error; // Re-throw for handling in the calling code
  }
};



// import axios from "axios";

// const API_BASE_URL = "http://localhost:3000";

// export const createPortfolio = async (portfolioData) => {
//   try {
//     const response = await axios.post(`${API_BASE_URL}/portfolio/create`, portfolioData);
//     return response.data.portfolio;
//   } catch (error) {
//     console.error("Error creating portfolio:", error);
//     return null;
//   }
// };

// export const fetchPortfolioByUserId = async () => {
//   try {
//     // console.log(userId)
//     const response = await axios.get(`${API_BASE_URL}/portfolio/get`);
//     console.log(response)
//     return response.data.portfolio;
//   } catch (error) {
//     console.error("Error fetching portfolio:", error);
//     return null;
//   }
// };



// // fetchPortfolioByUserId