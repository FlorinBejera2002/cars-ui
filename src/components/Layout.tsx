import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-500 p-4 text-white text-center">
        <h1>Car Management System</h1>
      </header>
      <main className="p-4">{children}</main>
      <footer className="bg-blue-500 p-4 text-white text-center">
        <p>&copy; 2024 Car Management System</p>
      </footer>
    </div>
  );
};
