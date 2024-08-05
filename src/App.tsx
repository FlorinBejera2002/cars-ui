import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes
} from "react-router-dom";
import { useEffect, useState } from "react";

import { Logout } from "./pages/Logout";
import { Login } from "./pages/Login";
import { CreateCar } from "./pages/CreateCar";
import { CarTable } from "./pages/CarTable";
import { CarDetails } from "./pages/CarDetails";
import { EditCar } from "./pages/EditCar";
import { Navbar } from "./components/nav";

export function App() {
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

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
        <Route
            path="/"
            element={!isAuthenticated ? <Login onLogin={handleLogin} /> : (
              <>
                <Logout onLogout={handleLogout} />
                <CarTable token={token} />
              </>
            )}
          />
          <Route path="/" element={<CarTable token={token} />} />
          <Route path="/car/:id" element={<CarDetails token={token} />} />
          <Route path="/create-car" element={<CreateCar token={token} />} />
          <Route path="/edit-car/:id" element={<EditCar token={token} />} />
          <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}
