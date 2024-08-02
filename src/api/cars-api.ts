export interface Car {
  brand: string;
  color: string;
  engine: string;
  horsePower: number;
  id: number;
  model: string;
}

export interface User {
  id: number;
  password: string;
  token: string;
  username: string;
}

export interface LoginResponse {
  message: string;
  user: User;
}

export interface LogoutResponse {
  message: string;
}

export const loginUser = async (
  username: string,
  password: string
): Promise<LoginResponse> => {
  const response = await fetch("http://localhost:3000/login", {
    body: JSON.stringify({ password, username }),
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }
  const data = await response.json();

  return data;
};

export const logoutUser = async (token: string): Promise<LogoutResponse> => {
  const response = await fetch("http://localhost:3000/logout", {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to logout");
  }
  const data = await response.json();

  return data;
};

export const updateCar = async (
  id: number,
  updatedData: Car,
  token: string
) => {
  const response = await fetch(`https://api.example.com/cars/${id}`, {
    method: "PETCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error updating car:", errorData);
    throw new Error("Failed to update car");
  }

  return response.json();
};

export const getAllCars = async (token: string): Promise<Car[]> => {
  const response = await fetch("http://localhost:3000/cars", {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch cars");
  }
  const data = await response.json();

  return data;
};

export const getCarById = async (id: number, token: string): Promise<Car> => {
  const response = await fetch(`http://localhost:3000/cars/${id}`, {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    method: "GET",
  });

  if (!response.ok) {
    // Arată mai multe informații despre răspunsul eșuat
    const errorData = await response.json();

    console.error("Error fetching car:", errorData);
    throw new Error("Failed to fetch car");
  }

  const data = await response.json();

  return data;
};

export const createCar = async (
  car: Omit<Car, "id">,
  token: string
): Promise<Car> => {
  const response = await fetch("http://localhost:3000/cars", {
    body: JSON.stringify(car),
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to create car");
  }
  const data = await response.json();

  return data;
};

export const deleteCar = async (id: number, token: string): Promise<void> => {
  const response = await fetch(`http://localhost:3000/cars/${id}`, {
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete car");
  }
};
