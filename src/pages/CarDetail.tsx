import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ICars } from "../types";
import { getAllCars } from "../api/cars-api";
import { Card, Spinner } from "flowbite-react";

export const CarDetail = () => {
  const { carId } = useParams<{ carId: string }>();
  const [car, setCar] = useState<ICars | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const cars = await getAllCars(""); // trimite un token valid aici dacă este necesar
        const foundCar = cars.find((c) => c.id === Number(carId));
        if (foundCar) {
          setCar(foundCar);
        } else {
          setError("Car not found");
        }
        setLoading(false);
      } catch (error) {
        console.error("There was a problem fetching car details:", error);
        setError("There was a problem fetching car details");
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [carId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="xl" />
      </div>
    );
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  if (!car) {
    return (
      <p className="text-center text-gray-500">No car details available</p>
    );
  }

  return (
    <div className="container w-full flex flex-col justify-center items-center mt-10">
      <Card>
        <h1 className="text-5xl font-bold mb-3">
          {car.brand} {car.model}
        </h1>
        <div className="grid gap-4 text-2xl">
          <div>
            <strong>Id:</strong> {car.id}
          </div>
          <div>
            <strong>Brand:</strong> {car.brand}
          </div>
          <div>
            <strong>Model:</strong> {car.model}
          </div>
          <div>
            <strong>Color:</strong> {car.color}
          </div>
          <div>
            <strong>Engine:</strong> {car.engine}
          </div>
          <div>
            <strong>Horse Power:</strong> {car.horsePower}
          </div>
        </div>
      </Card>
    </div>
  );
};
