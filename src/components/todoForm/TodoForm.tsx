import React, { useState } from "react";
import { ITodo } from "../../interfaces";
import { Spacer, Button, Input } from "../../global.styles";
import { Label } from "./TodoForm.styles";
import { useMutation } from "react-query";
import { addTodo } from "../../api";

const TodoForm: React.FC = () => {
  const [title, setTitle] = useState("");

  const { mutateAsync } = useMutation(addTodo);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleAddTodo = async (title: string) => {
    await mutateAsync({
      id: Date.now(),
      title: title,
      completed: false,
    });
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
      <Button
        onClick={() => {
          handleAddTodo(title);
        }}
      >
        Add
      </Button>
    </>
  );
};

export default TodoForm;
