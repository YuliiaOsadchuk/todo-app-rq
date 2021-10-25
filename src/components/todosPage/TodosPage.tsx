import React from "react";
import { Container } from "./TodosPage.styles";
import TodoForm from "../todoForm/TodoForm";
import TodoList from "../todoList/TodoList";

const TodosPage: React.FC = () => (
  <Container>
    <TodoForm />
    <TodoList />
  </Container>
);

export default TodosPage;
