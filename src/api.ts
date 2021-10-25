import { ITodo } from "./interfaces";

const API_URL = "http://localhost:3000/todos";

export const getAllTodos = async (): Promise<ITodo[]> => {
  const response = await fetch(`${API_URL}`);
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return response.json();
};

export const getTodo = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error("Something went wrong");
  }
  return response.json();
};

export const addTodo = async (todo: ITodo): Promise<ITodo> => {
  const response = await fetch(`${API_URL}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
};

export const removeTodo = async (id: number) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
};

export const updateTodo = async (todo: ITodo) => {
  const response = await fetch(`${API_URL}/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });

  if (!response.ok) {
    throw new Error("Something went wrong");
  }

  return response.json();
};
