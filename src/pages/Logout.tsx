// src/pages/Logout.tsx
import React from 'react'

interface LogoutProps {
  onLogout: () => void
}

export const Logout: React.FC<LogoutProps> = ({ onLogout }) => {
  return (
    <button
      className="w-full px-3 py-2 font-bold text-white bg-red-500 rounded hover:bg-red-700"
      onClick={onLogout}
    >
      Logout
    </button>
  )
}
