import React, { useState } from "react";
import { useMachine } from "@xstate/react";
import { useDropzone } from "react-dropzone";
import { todosMachine } from "../todos/todosMachine";
import TodosTable from "../todosTable/TodosTable";
import { ITodo } from "../../interfaces";
import { Button, Spacer, SpacerRow } from "../../global.styles";
import { FlexDropzone, Text } from "./Dropzone.styles";

interface Props {
  onClose: (isActive: boolean) => void;
  onAdd: (todos: ITodo[]) => void;
}

const Dropzone: React.FC<Props> = ({ onClose, onAdd }) => {
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [selectedFilePath, setSelectedFilePath] = useState();
  const [todosState, send] = useMachine(todosMachine, {
    actions: {
      loadData: (context, event) => {
        send({
          type: "RESOLVE",
          todos: todos,
        });
      },
    },
  });

  const message = todosState.context.message;

  const handleCancelClick = () => {
    onClose(false);
  };

  const handleAddClick = (todos: ITodo[]) => {
    console.log("todos: ", todos);
    onAdd(todos);
    onClose(false);
  };

  const onDrop = (acceptedFiles: any[]) => {
    send({ type: "LOAD" });
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();

      reader.onabort = () => {
        send({ type: "REJECT", errorMessage: "file reading was aborted" });
      };
      reader.onerror = () => {
        send({ type: "REJECT", errorMessage: "file reading has failed" });
      };
      reader.onload = () => {
        const result = JSON.parse(reader.result as string);
        setTodos(result);
        setSelectedFilePath(file.path);
      };
      reader.readAsText(file);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <>
      <FlexDropzone>
        {!selectedFilePath ? (
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
              <Text>Drop the files here ...</Text>
            ) : (
              <Text>
                Drag 'n' drop some files here, or click to select files
              </Text>
            )}
          </div>
        ) : (
          <div>{selectedFilePath}</div>
        )}
      </FlexDropzone>
      <Spacer />
      <Button
        onClick={() => {
          send({
            type: "LOAD",
            message: "Todos have been successfully loaded",
          });
        }}
      >
        load todos
      </Button>
      <SpacerRow />
      <Button onClick={handleCancelClick}>cancel</Button>
      <Text>{todosState.context.errorMessage}</Text>
      <TodosTable todos={todosState.context.todos || []} />
      {message && (
        <>
          <Button onClick={() => handleAddClick(todosState.context.todos)}>
            Add todos
          </Button>
          <Text>{message}</Text>
        </>
      )}
    </>
  );
};

export default Dropzone;
