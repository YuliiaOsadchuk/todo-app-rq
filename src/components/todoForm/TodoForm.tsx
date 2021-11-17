import React, { useState } from "react";
import { Spacer, SpacerRow, Button, Input, Row } from "../../global.styles";
import { Label } from "./TodoForm.styles";
import { useMutation, useQueryClient } from "react-query";
import { addTodo } from "../../api";
import Modal from "../modal/Modal";
import { ITodo } from "../../interfaces";

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [isActiveModal, setIsActiveModal] = useState(false);

  const { mutateAsync: addTodoMutation } = useMutation(addTodo, {
    onSuccess: (data) => {
      queryClient.setQueryData(["todos"], data);
    },
  });
  const queryClient = useQueryClient();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleAddTodo = async (title: string) => {
    await addTodoMutation({
      id: Date.now(),
      title: title,
      completed: false,
    });
    setTitle("");
  };

  const handleAddTodos = async (todos: ITodo[]) => {
    await addTodoMutation(todos);
  };

  const handleUploadTodos = () => {
    setIsActiveModal(true);
  };

  const handleCloseModal = () => {
    setIsActiveModal(false);
  };

  return (
    <>
      <Label htmlFor="title">Add todo</Label>
      <Spacer />
      <Input
        type="text"
        placeholder="Enter title"
        id="title"
        onChange={handleInputChange}
        value={title}
      />
      <Spacer />
      <Row>
        <Button
          onClick={() => {
            handleAddTodo(title);
          }}
        >
          Add todos
        </Button>
        <SpacerRow />
        <Button onClick={handleUploadTodos}>Upload todos</Button>
      </Row>
      <Modal
        isActive={isActiveModal}
        onClose={handleCloseModal}
        onAdd={handleAddTodos}
      />
    </>
  );
};

export default TodoForm;
