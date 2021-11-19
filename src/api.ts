import { ITodo } from "./interfaces";

const API_URL = "http://localhost:5000/todos";

export const getAllTodos = async (): Promise<ITodo[]> => {
  try {
    const response = await fetch(`${API_URL}`);
    return response.json();
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getTodo = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    return response.json();
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const addTodo = async (
  todo: ITodo | ITodo[]
): Promise<ITodo | ITodo[]> => {
  try {
    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    return response.json();
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const removeTodo = async (id: number) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return response.json();
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const updateTodo = async (todo: ITodo) => {
  try {
    const response = await fetch(`${API_URL}/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    return response.json();
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
