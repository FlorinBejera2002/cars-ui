import { useNavigate } from "react-router-dom";
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
      await updateCar(id, updatedCar, token);
      setEditCarId(null);
    } catch (error) {
      console.error("There was a problem updating the car:", error);
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
    <div className="flex flex-col items-center mt-20">
      <div className="flex gap-20 mb-10">
        <TextInput
          onChange={(e) => setFilterName(e.target.value)}
          placeholder="Filter by name"
          type="name"
          value={filterName}
        />
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-full bg-white shadow-lg rounded-lg">
          <Table.Head>
            <Table.HeadCell>
              <Checkbox checked={selectAll} onChange={handleSelectAll} />
            </Table.HeadCell>
            <Table.HeadCell>Id</Table.HeadCell>
            <Table.HeadCell>Brand</Table.HeadCell>
            <Table.HeadCell>Model</Table.HeadCell>
            <Table.HeadCell></Table.HeadCell>
            <Table.HeadCell>
              {selectedCars.length > 0 && (
                <button
                  className="text-red-700 font-bold text-sm"
                  onClick={handleDeleteSelected}
                >
                  Delete
                </button>
              )}
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Edit</span>
            </Table.HeadCell>
            <Table.HeadCell>
              <span className="sr-only">Delete</span>
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className="divide-y">
            {filteredCars.map((car) => (
              <React.Fragment key={car.id}>
                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800 relative">
                  <Table.Cell
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectCar(car.id);
                    }}
                  >
                    <Checkbox
                      checked={selectedCars.includes(car.id)}
                      className="z-20 cursor-pointer"
                      onChange={(e) => {
                        e.stopPropagation();
                        handleSelectCar(car.id);
                      }}
                    />
                  </Table.Cell>
                  <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    {car.id}
                  </Table.Cell>
                  <Table.Cell onClick={() => showCarDetails(car.id)}>
                    {car.brand}
                  </Table.Cell>
                  <Table.Cell onClick={() => showCarDetails(car.id)}>
                    {car.model}
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        setEditCarId(car.id);
                      }}
                    >
                      Edit
                    </button>
                  </Table.Cell>
                  <Table.Cell>
                    <button
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 z-10"
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteCarId(car.id);
                      }}
                    >
                      Delete
                    </button>
                  </Table.Cell>
                </Table.Row>
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
                        handleSave(car.id, updatedCar)
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
