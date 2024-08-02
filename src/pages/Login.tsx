// src/pages/Login.tsx
import React, { FormEvent, useState } from 'react'

import { loginUser } from '../api/cars-api'

interface LoginProps {
  onLogin: (token: string) => void
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      const data = await loginUser(username, password)

      if (data.user) {
        setMessage('Login successful!')
        onLogin(data.user.token)
      } else {
        setMessage('Invalid credentials')
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
    }
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-full max-w-md p-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">
              Username
              <input
                className="w-full px-3 py-2 mt-1 border rounded"
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                value={username}
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Password
              <input
                className="w-full px-3 py-2 mt-1 border rounded"
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                value={password}
              />
            </label>
          </div>
          <button
            className="w-full px-3 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
            type="submit"
          >
            Login
          </button>
        </form>
        {message && <p className="mt-4 text-center text-red-500">{message}</p>}
      </div>
    </div>
  )
}
