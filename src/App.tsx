import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { CarTable } from "./pages/CarTable";
import { CarDetail } from "./pages/CarDetail";
import { AddCar } from "./pages/AddCar";
import { Login } from "./pages/Login";
import { Logout } from "./pages/Logout";

export const App = () => {
  const [token, setToken] = useState<null | string>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (token: string) => {
    localStorage.setItem("token", token);
    setToken(token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setIsAuthenticated(false);
  };

  return (
    <div className="container">
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to="/" />
              ) : (
                <Login onLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <>
                  <Logout onLogout={handleLogout} token={token!} />
                  <CarTable token={token!} />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/newcar"
            element={
              isAuthenticated ? (
                <AddCar token={token!} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/:carId"
            element={
              isAuthenticated ? (
                <CarDetail token={token!} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};
