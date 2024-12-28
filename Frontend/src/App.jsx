// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LoginForm from "./components/LoginForm";
// import RegisterForm from "./components/RegisterForm";
// import Dashboard from "./components/Dashboard";

// import HomePage from "./components/HomePage";

// const App = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   return (
//     <Router>
//       <Routes>
//       <Route path="/" element={<HomePage/>} />
//         <Route path="/login" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
//         <Route path="/register" element={<RegisterForm />} />
//         <Route
//           path="/auth/dashboard/:id"
//           element={isLoggedIn ? <Dashboard /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}
//         />
//         <Route
//           path="/auth/portfolio-form"
//           element={isLoggedIn ? <PortfolioForm /> : <LoginForm setIsLoggedIn={setIsLoggedIn} />}
//         />
//         <Route
//           path="/auth/portfolio/:token"
//           element={<PortfolioPage />}
//         />
//         <Route path="*" element={<LoginForm setIsLoggedIn={setIsLoggedIn} />} />
//       </Routes>
//     </Router>
//   );
// };
// export default App;



import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginForm";
import RegisterPage from "./components/RegisterForm";
import Dashboard from "./components/Dashboard";
import PortfolioForm from "./components/PortfolioForm";
import PortfolioPage from "./components/PortfolioPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/auth/dashboard/:id" element={<Dashboard />} />
          <Route path="/auth/portfolio-form" element={ <PortfolioForm/>} />
          <Route path="/auth/portfolio/:id" element={<PortfolioPage/>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
