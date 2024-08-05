import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Label, TextInput, Spinner, Alert } from 'flowbite-react';
import { Car, getCarById, updateCar } from '../api/cars-api';

interface EditCarProps {
  token: null | string;
}

export const EditCar: React.FC<EditCarProps> = ({ token }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<null | string>(null);
  const [formData, setFormData] = useState<Partial<Car>>({});

  useEffect(() => {
    if (!token) {
      setError("No token provided");
      setLoading(false);
      return;
    }

    const fetchCar = async () => {
      try {
        const carData = await getCarById(token);
        setCar(carData);
        setFormData(carData);
      } catch (error) {
        console.error("Failed to fetch car:", error);
        setError("Failed to fetch car data");
      } finally {
        setLoading(false);
      }
    };

    fetchCar();
  }, [id, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (token && car) {
      try {
        await updateCar(car.id, formData as Car, token);
        navigate(`/car/${car.id}`);
      } catch (error) {
        console.error("Failed to update car:", error);
        setError("Failed to update car");
      }
    }
  };

  if (loading) return <Spinner aria-label="Loading car details..." />;
  if (error) return <Alert color="failure">{error}</Alert>;

  return (
    <div className="container mx-auto my-4 p-4">
      <form className="max-w-xl mx-auto" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Edit Car</h2>
        <div className="mb-4">
          <Label htmlFor="brand">Brand</Label>
          <TextInput
            id="brand"
            name="brand"
            value={formData.brand || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="model">Model</Label>
          <TextInput
            id="model"
            name="model"
            value={formData.model || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="color">Color</Label>
          <TextInput
            id="color"
            name="color"
            value={formData.color || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="engine">Engine</Label>
          <TextInput
            id="engine"
            name="engine"
            value={formData.engine || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Label htmlFor="horsePower">HorsePower</Label>
          <TextInput
            id="horsePower"
            name="horsePower"
            type="number"
            value={formData.horsePower || ''}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <Button type="submit">Save Changes</Button>
        </div>
      </form>
    </div>
  );
};
