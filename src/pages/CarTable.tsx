// src/pages/CarTable.tsx
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Table, Spinner, Alert, Button, TextInput } from 'flowbite-react';

import { Car, deleteCar, getAllCars } from "../api/cars-api";

interface CarTableProps {
  token: null | string;
}

export const CarTable: React.FC<CarTableProps> = ({ token }) => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  const [search, setSearch] = useState<string>("");
  const [sortKey, setSortKey] = useState<"" | keyof Car>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      if (token) {
        try {
          const cars = await getAllCars(token);
          setCars(cars);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch cars:", error);
          setError("Failed to fetch cars");
          setLoading(false);
        }
      } else {
        setError("No token provided");
        setLoading(false);
      }
    };

    fetchCars();
  }, [token]);

  const handleRowClick = (id: number) => {
    navigate(`/car/${id}`);
  };

  const handleSort = (key: keyof Car) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleDelete = async (id: number) => {
    if (token) {
      try {
        await deleteCar(id, token);
        setCars(cars.filter((car) => car.id !== id));
      } catch (error) {
        console.error("Failed to delete car:", error);
        setError("Failed to delete car");
      }
    }
  };

  const handleEdit = (id: number) => {
    navigate(`/edit-car/${id}`);
  };

  if (loading) return <Spinner aria-label="Loading cars..." />;
  if (error) return <Alert color="failure">{error}</Alert>;

  // Filtrare și sortare a mașinilor
  const filteredCars = cars.filter((car) =>
    Object.values(car).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortKey) {
      const fieldA = a[sortKey];
      const fieldB = b[sortKey];

      if (typeof fieldA === "string" && typeof fieldB === "string") {
        return sortOrder === "asc"
          ? fieldA.localeCompare(fieldB)
          : fieldB.localeCompare(fieldA);
      } else if (typeof fieldA === "number" && typeof fieldB === "number") {
        return sortOrder === "asc" ? fieldA - fieldB : fieldB - fieldA;
      }
    }

    return 0;
  });

  return (
    <div className="overflow-x-auto p-4">
      <TextInput
        className="mb-4"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search cars..."
        type="text"
        value={search}
      />
      <Table hoverable>
        <Table.Head>
          {["id", "brand", "model", "color", "engine", "horsePower"].map(
            (key) => (
              <Table.HeadCell
                key={key}
                onClick={() => handleSort(key as keyof Car)}
                className="cursor-pointer"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Table.HeadCell>
            )
          )}
          <Table.HeadCell>Actions</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {sortedCars.map((car) => (
            <Table.Row
              className="cursor-pointer hover:bg-gray-100"
              key={car.id}
              onClick={() => handleRowClick(car.id)}
            >
              <Table.Cell>{car.id}</Table.Cell>
              <Table.Cell>{car.brand}</Table.Cell>
              <Table.Cell>{car.model}</Table.Cell>
              <Table.Cell>{car.color}</Table.Cell>
              <Table.Cell>{car.engine}</Table.Cell>
              <Table.Cell>{car.horsePower}</Table.Cell>
              <Table.Cell className="flex space-x-2">
                <Button
                  color="failure"
                  onClick={(e:any) => {
                    e.stopPropagation();
                    handleDelete(car.id);
                  }}
                >
                  Delete
                </Button>
                <Button
                  color="primary"
                  onClick={(e:any) => {
                    e.stopPropagation();
                    handleEdit(car.id);
                  }}
                >
                  Edit
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};
