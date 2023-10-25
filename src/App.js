import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import { useState } from "react";
import Navbar from "./components/NavBar";
import jwt from 'jwt-decode';
import MainView from "./components/MainView/Index"
function App() {
  const navigate = useNavigate();

  const initAuthData = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwt(token);
      const user = {
        login: decodedToken.login,
          firstName: decodedToken.firstName,
          lastName: decodedToken.lastName,
          email: decodedToken.email,
          roles: decodedToken.roles
      };
      return { token, user };
    }
    return null;
  };

  const [authData, setAuthData] = useState(initAuthData);

  const authenticateUser = async (login, password) => {
    try {
      const requestBody = {
        login: login,
        password: password
      };
      const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      };

      const response = await fetch(`http://localhost:8080/auth/login`, requestOptions);

      if (response.ok) {
        const token = await response.json();
        localStorage.setItem("token", token.accessToken);
        const decodedToken = jwt(token.accessToken);
        const user = {
          login: decodedToken.login,
          firstName: decodedToken.firstName,
          lastName: decodedToken.lastName,
          email: decodedToken.email,
          roles: decodedToken.roles
        };
        setAuthData({ token, user });
        // Przekierowanie po udanej autoryzacji
        navigate("/");
      } else {
        if (response.status === 400) {
          console.log("Invalid login or password");
        }
      }
    } catch (error) {
      console.log("An error occurred during login:", error);
    }
  };

  const registerUser = async (login, password, firstName, lastName, email) => {
    try {
      const requestBody = {
        login: login,
        password: password,
        firstName: firstName,
        lastName: lastName,
        email: email
      };
      const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      };

      const response = await fetch(`http://localhost:8080/auth/register`, requestOptions);

      if (response.ok) {
        console.log('Registration success');
        navigate("/login");
      } else {
        const errorData = await response.json();
        console.log("Registration failed:", errorData);
      }
    } catch (error) {
      console.log("An error occurred during registration:", error);
    }
  };
  const logoutUser = () => {
    localStorage.removeItem("token");
    setAuthData(null);
    navigate("/login"); 
  };
  return (
    <div>
       <Navbar isAuthenticated={!!authData} logoutUser={logoutUser} />
      <Routes>
        <Route path="/login" element={<Login authenticateUser={authenticateUser} />} />
        <Route path="/register" element={<Register registerUser={registerUser} />} />
        <Route path="/" element={<MainView/>} /> 
      </Routes>
    </div>
  );
}

export default App;
