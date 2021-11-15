import React from "react";
import { ITodo } from "../../interfaces";
import { Cell, Table, Thead } from "./TodosTable.styles";

interface Props {
  todos: ITodo[];
}

const TodosTable: React.FC<Props> = ({ todos }) => (
  <>
    {todos.length ? (
      <Table>
        <Thead>
          <tr>
            <Cell>id</Cell>
            <Cell>title</Cell>
            <Cell>completed</Cell>
          </tr>
        </Thead>
        <tbody>
          {todos.map(({ id, title, completed }) => (
            <tr key={id}>
              <Cell>{id}</Cell>
              <Cell>{title}</Cell>
              <Cell>{`${completed}`}</Cell>
            </tr>
          ))}
        </tbody>
      </Table>
    ) : (
      <p>You dont have any todo yet</p>
    )}
  </>
);

export default TodosTable;
