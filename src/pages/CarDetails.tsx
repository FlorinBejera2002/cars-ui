// src/pages/CarDetails.tsx
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';
import { Car, getCarById } from '../api/cars-api';

interface CarDetailsProps {
  token: null | string;
}

export const CarDetails: React.FC<CarDetailsProps> = ({ token }) => {
  const { id } = useParams<{ id: any }>();
  const [car, setCar] = useState<Car | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      if (token) {
        const carData = await getCarById(parseInt(id, 10), token);
        setCar(carData);
      }
    };

    fetchCar();
  }, [id, token]);

  if (!car) return <p>Loading...</p>;

  return (
    <div className="container mx-auto my-4 p-4">
      <Card>
        <h2 className="text-2xl font-bold mb-2">
          {car.brand} {car.model}
        </h2>
        <ul>
          <li className="mb-2">
            <strong>Color:</strong> {car.color}
          </li>
          <li className="mb-2">
            <strong>Engine:</strong> {car.engine}
          </li>
          <li className="mb-2">
            <strong>HorsePower:</strong> {car.horsePower}
          </li>
          <li className="mb-2">
            <strong>ID:</strong> {car.id}
          </li>
        </ul>
      </Card>
    </div>
  );
};
