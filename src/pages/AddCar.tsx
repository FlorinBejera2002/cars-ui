
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ICars } from "../types";
import { FormInput } from "../components/FormInput";
import { addCar } from "../api/cars-api";
import { Alert } from "flowbite-react";

const initialCarState: ICars = {
  brand: "",
  color: "",
  engine: "",
  horsePower: 0,
  id: 0,
  model: "",
};

export const AddCar = ({ token }: { token: string }) => {
  const navigate = useNavigate();
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handleAddCar = async (carData: ICars) => {
    await addCar(carData, token);
    setShowSuccessMessage(true);
    setTimeout(() => {
      setShowSuccessMessage(false);
      navigate("/");
    }, 3000);
  };

  return (
    <div className="flex justify-center items-center mt-20 flex-col">

      <FormInput
        buttonColor="blue"
        functionEvent={handleAddCar}
        textButton="Add Car"
        valueState={initialCarState}
      />
      {showSuccessMessage && (
        <Alert color="success" className="absolute bottom-10 right-10">
          Car added successfully!
        </Alert>
      )}
    </div>
  );
};