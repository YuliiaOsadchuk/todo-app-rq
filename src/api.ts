import { ITodo } from "./interfaces";

const API_URL =
  "https://my-json-server.typicode.com/YuliiaOsadchuk/todo-app-rq/todos";

export const fetchAllTodos = async (): Promise<ITodo[]> => {
  const response = await fetch(`${API_URL}`);

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
    body: JSON.stringify({
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
    }),
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
