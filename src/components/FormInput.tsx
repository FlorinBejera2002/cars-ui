import { useState } from "react";
import { ICars } from "../types";
import { Button, Label, TextInput } from "flowbite-react";

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
    <div className="space-y-6 w-96">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="brand" value="Brand" />
        </div>
        <TextInput
          id="brand"
          onChange={(e) => setBrand(e.target.value)}
          value={brand}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="model" value="Model" />
        </div>
        <TextInput
          id="model"
          onChange={(e) => setModel(e.target.value)}
          value={model}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="color" value="Color" />
        </div>
        <TextInput
          id="color"
          onChange={(e) => setColor(e.target.value)}
          value={color}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="engine" value="Engine" />
        </div>
        <TextInput
          id="engine"
          onChange={(e) => setEngine(e.target.value)}
          value={engine}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="horsePower" value="Horse Power" />
        </div>
        <TextInput
          id="horsePower"
          type="number"
          onChange={(e) => setHorsePower(Number(e.target.value))}
          value={horsePower}
        />
      </div>
      <Button color={buttonColor} onClick={handleSubmit}>
        {textButton}
      </Button>
    </div>
  );
};
