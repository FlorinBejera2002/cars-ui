const BASE_URL = "http://localhost:3000";

import { ICars } from "../types";

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
  const response = await fetch(`${BASE_URL}/login`, {
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
  const response = await fetch(`${BASE_URL}/logout`, {
    headers: {
      Authorization: `Bearer ${token}`,
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

// For other API calls, ensure the token is included in the headers as shown in the examples below

export const getAllCars = async (token: string): Promise<ICars[]> => {
  const response = await fetch(`${BASE_URL}/cars`, {
    headers: {
      Authorization: `Bearer ${token}`,
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

export const deleteCar = async (id: number, token: string) => {
  const response = await fetch(`${BASE_URL}/cars/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete car");
  }

  return response.json();
};

export const updateCar = async (id: number, car: ICars, token: string) => {
  const response = await fetch(`${BASE_URL}/cars/${id}`, {
    body: JSON.stringify(car),
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Failed to update car");
  }

  return response.json();
};

export const addCar = async (car: ICars, token: string) => {
  const response = await fetch(`${BASE_URL}/cars`, {
    body: JSON.stringify(car),
    headers: {
      Authorization: `${token}`,
      "Content-type": "application/json; charset=UTF-8",
    },
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Failed to add new car");
  }

  return response.json();
};

export const getDetailsByParams = async (brand: string, model: string) => {
  const query = new URLSearchParams();

  if (brand) query.append("brand", brand);
  if (model) query.append("model", model);

  const response = await fetch(`${BASE_URL}/cars?${query.toString()}`, {
    method: "GET",
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};
