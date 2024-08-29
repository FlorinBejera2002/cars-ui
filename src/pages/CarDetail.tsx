import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { ICars } from "../types";
import { getAllCars } from "../api/cars-api";
import { Card, Spinner } from "flowbite-react";
import { TbArrowBackUp } from "react-icons/tb";


export const CarDetail = ({ token }: { token: string }) => {
  const { carId } = useParams<{ carId: string }>();
  const [car, setCar] = useState<ICars | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const cars = await getAllCars(token);
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
    <div className=" w-full flex flex-col justify-center items-center mt-10 px-4">
      <Card className="bg-gradient-to-r from-gray-100 to-gray-50 shadow-lg rounded-lg p-10">
        <h1 className="text-5xl font-extrabold font-serif text-center text-gray-800 mb-6">
          {car.brand} {car.model}
        </h1>
        <div className="flex flex-col gap-4 text-lg md:text-2xl">
          <div className="flex items-center">
            <strong className="mr-2 font-serif text-gray-700">Id:</strong>
            <span className="text-gray-900 font-serif">{car.id}</span>
          </div>
          <div className="flex items-center">
            <strong className="mr-2 font-serif text-gray-700">Brand:</strong>
            <span className="text-gray-900 font-serif">{car.brand}</span>
          </div>
          <div className="flex items-center">
            <strong className="mr-2 font-serif text-gray-700">Model:</strong>
            <span className="text-gray-900 font-serif">{car.model}</span>
          </div>
          <div className="flex items-center">
            <strong className="mr-2 font-serif text-gray-700">Color:</strong>
            <span className="text-gray-900 font-serif">{car.color}</span>
          </div>
          <div className="flex items-center">
            <strong className="mr-2 font-serif text-gray-700">Engine:</strong>
            <span className="text-gray-900 font-serif">{car.engine}</span>
          </div>
          <div className="flex items-center">
            <strong className="mr-2 font-serif text-gray-700">Horse Power:</strong>
            <span className="text-gray-900 font-serif">{car.horsePower}</span>
          </div>
          <Link to={"/"} className="text-white mt-10 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            <TbArrowBackUp />
            Back
          </Link>
        </div>
      </Card>
    </div >
  );
};
