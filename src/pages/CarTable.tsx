import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import React from "react";
import { getAllCars, deleteCar, updateCar } from "../api/cars-api";
import { ICars } from "../types";
import { FormInput } from "../components/FormInput";

import {
  Alert,
  Spinner,
  Button,
  Checkbox,
  Modal,
  Table,
  TextInput,
} from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export const CarTable = ({ token }: { token: string }) => {
  const navigate = useNavigate();
  const [cars, setCars] = useState<ICars[]>([]);
  const [error, setError] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [editCarId, setEditCarId] = useState<null | number>(null);
  const [filterName, setFilterName] = useState("");
  const [deleteCarId, setDeleteCarId] = useState<null | number>(null);
  const [selectedCars, setSelectedCars] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCars = async () => {
      if (!token) {
        setError("No token provided");
        setLoading(false);
        navigate("/login");
        return;
      }

      try {
        const cars = await getAllCars(token);
        setCars(cars);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch cars:", error);
        setError("Failed to fetch cars");
        setLoading(false);
      }
    };

    fetchCars();
  }, [token, navigate]);

  const showCarDetails = async (id: number) => {
    navigate(`/${id}`);
  };

  const handleSave = async (id: number, updatedCar: ICars) => {
    try {
      const response = await updateCar(id, updatedCar, token);
      if (response) {
        setSuccessMessage("Car updated successfully!");
        setErrorMessage(null); // Reset error message
        setEditCarId(null);

        // Actualizează starea cu mașina editată
        setCars((prevCars) =>
          prevCars.map((car) => (car.id === id ? response : car))
        );
      }
    } catch (error) {
      setEditCarId(null);
      setErrorMessage("Failed to update car. Please try again.");
      setSuccessMessage(null); // Reset success message
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedCars([]);
    } else {
      setSelectedCars(cars.map((car) => car.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectCar = (id: number) => {
    if (selectedCars.includes(id)) {
      setSelectedCars(selectedCars.filter((carId) => carId !== id));
    } else {
      setSelectedCars([...selectedCars, id]);
    }
  };

  const handleDeleteSelected = () => {
    try {
      selectedCars.forEach(async (carId) => await deleteCar(carId, token));
    } catch (error) {
      console.error("There was a problem deleting the selected cars:", error);
    }
  };

  const filteredCars = cars.filter(
    (item) =>
      item.brand.toLowerCase().includes(filterName.toLowerCase()) ||
      item.model.toLowerCase().includes(filterName.toLowerCase())
  );

  if (loading) return <Spinner aria-label="Loading cars..." />;
  if (error) return <Alert color="failure">{error}</Alert>;

  return (
    <div className="flex flex-col items-center bg-gradient-to-t from-white to-slate-300">
      <div className="w-full max-w-6xl">
        <div className="flex mb-5 mt-4 justify-between">
          <div className="flex items-center gap-3">
            <Link to={"/newCar"} className="bg-white text-gray-700 py-2 px-10 rounded-md font-bold text-serif">Add new car</Link>
          </div>
          <TextInput
            onChange={(e) => setFilterName(e.target.value)}
            placeholder="Search..."
            type="name"
            value={filterName}
          />
        </div>
        <Table className="shadow-lg rounded-lg w-full" hoverable={true}>
          <Table.Head className="h-12">
            <Table.HeadCell className="text-left">
              <Checkbox checked={selectAll} onChange={handleSelectAll} />
            </Table.HeadCell>
            <Table.HeadCell className="text-left">Id</Table.HeadCell>
            <Table.HeadCell className="text-left">Emblem</Table.HeadCell>
            <Table.HeadCell className="text-left">Brand</Table.HeadCell>
            <Table.HeadCell className="text-left">Model</Table.HeadCell>
            <Table.HeadCell className="text-left">Color</Table.HeadCell>
            <Table.HeadCell className="text-left">Horse Power</Table.HeadCell>
            <Table.HeadCell className="text-right">
              {selectedCars.length > 0 && (
                <button
                  className="text-red-700 font-bold text-sm z-10"
                  onClick={handleDeleteSelected}
                >
                  Delete
                </button>
              )}
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y w-full">
            {filteredCars.map((car) => (
              <React.Fragment key={car.id}>
                <Table.Row className="bg-white relative w-full">
                  <Table.Cell className="text-left">
                    <Checkbox
                      checked={selectedCars.includes(car.id)}
                      className="z-20 cursor-pointer"
                      onChange={(e) => {
                        e.stopPropagation();
                        handleSelectCar(car.id);
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white" onClick={() => showCarDetails(car.id)}>
                    {car.id}
                  </Table.Cell>
                  <Table.Cell className="text-left" onClick={() => showCarDetails(car.id)}>
                    <img
                      src={`../../public/${car.brand.toLocaleLowerCase()}.png`}
                      alt={`${car.brand} logo`}
                      className="h-5 w-auto"
                    />
                  </Table.Cell>
                  <Table.Cell
                    className="text-left"
                    onClick={() => showCarDetails(car.id)}
                  >
                    {car.brand}
                  </Table.Cell>

                  <Table.Cell
                    className="text-left"
                    onClick={() => showCarDetails(car.id)}
                  >
                    {car.model}
                  </Table.Cell>
                  <Table.Cell
                    className="text-left"
                    onClick={() => showCarDetails(car.id)}
                  >
                    {car.color}
                  </Table.Cell>
                  <Table.Cell
                    className="text-left"
                    onClick={() => showCarDetails(car.id)}
                  >
                    {car.horsePower}
                  </Table.Cell>

                  <Table.Cell className="text-right">
                    <button
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 z-10 pr-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditCarId(car.id);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="font-bold text-red-700 hover:underline z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteCarId(car.id);
                      }}
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>

                {successMessage && (
                  <Alert
                    color="success"
                    className="fixed bottom-4 right-4 z-50"
                    onDismiss={() => setSuccessMessage(null)}
                  >
                    {successMessage}
                  </Alert>
                )}
                {errorMessage && (
                  <Alert
                    color="failure"
                    className="fixed bottom-4 right-4 z-50"
                    onDismiss={() => setErrorMessage(null)}
                  >
                    {errorMessage}
                  </Alert>
                )}

                <Modal
                  onClose={() => setEditCarId(null)}
                  show={editCarId === car.id}
                  size="lg"
                >
                  <Modal.Header>Edit Car</Modal.Header>
                  <Modal.Body>
                    <FormInput
                      buttonColor="success"
                      functionEvent={(updatedCar) =>
                        handleSave(editCarId, updatedCar)
                      }
                      textButton="Save"
                      valueState={car}
                    />
                  </Modal.Body>
                </Modal>
                <Modal
                  onClose={() => setDeleteCarId(null)}
                  popup={true}
                  show={deleteCarId === car.id}
                  size="lg"
                >
                  <Modal.Header></Modal.Header>
                  <Modal.Body>
                    <div className="">
                      <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200 text-center" />
                      <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400 text-center">
                        Are you sure you want to delete this car?
                      </h3>
                      <div className="grid gap-2 mb-12 ml-10">
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

                      <div className="flex justify-center gap-4">
                        <Button
                          color="failure"
                          onClick={() => {
                            deleteCar(car.id, token);
                            setDeleteCarId(null);
                          }}
                        >
                          Delete
                        </Button>
                        <Button
                          color="gray"
                          onClick={() => setDeleteCarId(null)}
                        >
                          No, cancel
                        </Button>
                      </div>
                    </div>
                  </Modal.Body>
                </Modal>
              </React.Fragment>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
