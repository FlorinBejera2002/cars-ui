import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";

import { CarTable } from "./pages/CarTable";
import { CarDetail } from "./pages/CarDetail";
import { AddCar } from "./pages/AddCar";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";

export const App = () => {
  const [token, setToken] = useState<null | string>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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
    <div className="h-full">
      <BrowserRouter>
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
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
                <CarTable token={token!} />
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
