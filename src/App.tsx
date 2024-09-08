import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { CarTable } from "./pages/CarTable";
import { CarDetail } from "./pages/CarDetail";
import { AddCar } from "./pages/AddCar";
import { Login } from "./pages/Login";
import { Navbar } from "./components/Navbar";

export const App = () => {
  const [token, setToken] = useState<null | string>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Verifică dacă există un token în localStorage la montarea componentei
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
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
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
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
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
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
                // biome-ignore lint/style/noNonNullAssertion: <explanation>
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
