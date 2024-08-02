// src/pages/CreateCar.tsx
import React, { useState } from 'react'

import { createCar } from '../api/cars-api'

interface CreateCarProps {
  token: null | string
}

export const CreateCar: React.FC<CreateCarProps> = ({ token }) => {
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [color, setColor] = useState('')
  const [engine, setEngine] = useState('')
  const [horsePower, setHorsePower] = useState<null | number>(null)
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (token) {
      try {
        await createCar(
          { brand, color, engine, horsePower: horsePower ?? 0, model },
          token
        )
        setMessage('Car created successfully!')
        setBrand('')
        setModel('')
        setColor('')
        setEngine('')
        setHorsePower(null)
      } catch (error) {
        setMessage('Failed to create car')
      }
    }
  }

  return (
    <div className="container mx-auto my-4 p-4">
      <h2 className="text-2xl font-bold mb-4">Create New Car</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">
            Brand
            <input
              className="w-full px-3 py-2 mt-1 border rounded"
              onChange={(e) => setBrand(e.target.value)}
              type="text"
              value={brand}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Model
            <input
              className="w-full px-3 py-2 mt-1 border rounded"
              onChange={(e) => setModel(e.target.value)}
              type="text"
              value={model}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Color
            <input
              className="w-full px-3 py-2 mt-1 border rounded"
              onChange={(e) => setColor(e.target.value)}
              type="text"
              value={color}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Engine
            <input
              className="w-full px-3 py-2 mt-1 border rounded"
              onChange={(e) => setEngine(e.target.value)}
              type="text"
              value={engine}
            />
          </label>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            HorsePower
            <input
              className="w-full px-3 py-2 mt-1 border rounded"
              onChange={(e) => setHorsePower(parseInt(e.target.value, 10))}
              type="number"
              value={horsePower ?? ''}
            />
          </label>
        </div>
        <button
          className="w-full px-3 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
          type="submit"
        >
          Create Car
        </button>
      </form>
      {message && <p className="mt-4 text-center text-red-500">{message}</p>}
    </div>
  )
}
