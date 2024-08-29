import { useState } from "react";
import { ICars } from "../types";
import { Button, Label, TextInput, Card } from "flowbite-react";

type IProps = {
  buttonColor?: string;
  functionEvent: (carData: ICars) => void;
  textButton: string;
  valueState: ICars;
};

export const FormInput = ({
  buttonColor,
  functionEvent,
  textButton,
  valueState,
}: IProps) => {
  const [brand, setBrand] = useState(valueState.brand);
  const [model, setModel] = useState(valueState.model);
  const [color, setColor] = useState(valueState.color);
  const [engine, setEngine] = useState(valueState.engine);
  const [horsePower, setHorsePower] = useState(valueState.horsePower);

  const handleSubmit = () => {
    functionEvent({
      id: valueState.id,
      brand,
      model,
      color,
      engine,
      horsePower,
    });
  };

  return (
    <div className="flex justify-center items-center">
      <Card className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Add New Car
        </h2>
        <div className="space-y-4">
          <div>
            <Label htmlFor="brand" value="Brand" className="text-gray-700" />
            <TextInput
              id="brand"
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
              placeholder="Enter car brand"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="model" value="Model" className="text-gray-700" />
            <TextInput
              id="model"
              onChange={(e) => setModel(e.target.value)}
              value={model}
              placeholder="Enter car model"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="color" value="Color" className="text-gray-700" />
            <TextInput
              id="color"
              onChange={(e) => setColor(e.target.value)}
              value={color}
              placeholder="Enter car color"
              className="mt-2"
            />
          </div>
          <div>
            <Label htmlFor="engine" value="Engine" className="text-gray-700" />
            <TextInput
              id="engine"
              onChange={(e) => setEngine(e.target.value)}
              value={engine}
              placeholder="Enter engine details"
              className="mt-2"
            />
          </div>
          <div>
            <Label
              htmlFor="horsePower"
              value="Horse Power"
              className="text-gray-700"
            />
            <TextInput
              id="horsePower"
              type="number"
              onChange={(e) => setHorsePower(Number(e.target.value))}
              value={horsePower}
              className="mt-2"
            />
          </div>
        </div>
        <Button color={buttonColor} onClick={handleSubmit} className="w-full">
          {textButton}
        </Button>
      </Card>
    </div>
  );
};
