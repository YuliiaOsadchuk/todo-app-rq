import React, { useState } from "react";
import { useQuery } from "react-query";
import { ITodo } from "../../interfaces";
import { Button, Input, Spacer } from "../../global.styles";
import { Item, Title } from "./TodoList.styles";
import { fetchAllTodos, removeTodo } from "../../api";
import { useMutation, useQueryClient } from "react-query";

const TodoList: React.FC = () => {
  const [editableItem, setEditableItem] = useState<ITodo | null>(null);

  const { data } = useQuery("todos", fetchAllTodos);
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(removeTodo);

  console.log("list: ", data);

  const handleRemoveTodo = async (id: number) => {
    await mutateAsync(id);
    queryClient.invalidateQueries("todos");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    editableItem &&
      setEditableItem({ ...editableItem, title: event.target.value });
  };

  const renderEditableItem = (item: ITodo) => (
    <Spacer>
      <Input value={item.title} type="text" onChange={handleInputChange} />
      <Button>save</Button>
    </Spacer>
  );

  const renderItem = (item: ITodo) => (
    <Spacer key={item.id}>
      <Item>
        <div>
          <input type="checkbox" checked={item.completed} onChange={() => {}} />
          <Title completed={item.completed}>{item.title}</Title>
        </div>
        <Button onClick={() => {}}>edit</Button>
        <Button
          onClick={() => {
            handleRemoveTodo(item.id);
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
