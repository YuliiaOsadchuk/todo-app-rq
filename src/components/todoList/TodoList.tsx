import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { ITodo } from "../../interfaces";
import { Button, Input, Spacer } from "../../global.styles";
import { Item, Title } from "./TodoList.styles";
import { getAllTodos, removeTodo, updateTodo } from "../../api";

const TodoList: React.FC = () => {
  const [editableItem, setEditableItem] = useState<ITodo | null>(null);

  const { data } = useQuery("todos", getAllTodos, {
    cacheTime: 5000,
  });
  const { mutateAsync: mutateRemove } = useMutation(removeTodo);
  const { mutateAsync: mutateEdit } = useMutation(updateTodo);

  const queryClient = useQueryClient();

  const handleTodoRemove = async (id: number) => {
    await mutateRemove(id);
    queryClient.invalidateQueries("todos");
  };

  const handleTodoEdit = async (item: ITodo) => {
    setEditableItem(item);
  };

  const handleTodoSave = async (item: ITodo) => {
    await mutateEdit(item);
    queryClient.invalidateQueries("todos");
    setEditableItem(null);
  };

  const handleTodoToogle = async (item: ITodo) => {
    await mutateEdit({ ...item, completed: !item.completed });
    queryClient.invalidateQueries("todos");
    setEditableItem(null);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    editableItem &&
      setEditableItem({ ...editableItem, title: event.target.value });
  };

  const renderEditableItem = (item: ITodo) => (
    <Spacer>
      <Input value={item.title} type="text" onChange={handleInputChange} />
      <Button onClick={() => handleTodoSave(item)}>save</Button>
    </Spacer>
  );

  const renderItem = (item: ITodo) => (
    <Spacer key={item.id}>
      <Item>
        <div>
          <input
            type="checkbox"
            checked={item.completed}
            onChange={() => {
              handleTodoToogle(item);
            }}
          />
          <Title completed={item.completed}>{item.title}</Title>
        </div>
        <Button
          onClick={() => {
            handleTodoEdit(item);
          }}
        >
          edit
        </Button>
        <Button
          onClick={() => {
            handleTodoRemove(item.id);
          }}
        >
          delete
        </Button>
      </Item>
    </Spacer>
  );

  return (
    <Spacer>
      {data &&
        data.map((todo) =>
          editableItem?.id === todo.id
            ? renderEditableItem(editableItem)
            : renderItem(todo)
        )}
    </Spacer>
  );
};

export default TodoList;
