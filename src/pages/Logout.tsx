import React from "react";
import { logoutUser } from "../api/cars-api";

interface LogoutProps {
  onLogout: () => void;
  token: string;
}

export const Logout: React.FC<LogoutProps> = ({ onLogout, token }) => {
  const handleLogout = async () => {
    try {
      await logoutUser(token);
      onLogout();
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
    >
      Logout
    </button>
  );
};
