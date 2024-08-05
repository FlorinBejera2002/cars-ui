import { useNavigate } from "react-router-dom";
import { ICars } from "../types";
import { FormInput } from "../components/FormInput";
import { addCar } from "../api/cars-api";

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

  return (
    <div className="flex justify-center items-center mt-20">
      <FormInput
        buttonColor="blue"
        functionEvent={async (carData) => {
          await addCar(carData, token);
          navigate("/");
        }}
        textButton="Add Car"
        valueState={initialCarState}
      />
    </div>
  );
};
