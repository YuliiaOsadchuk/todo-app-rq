import { createMachine, assign } from "xstate";
import { ITodo } from "../../interfaces";

interface TodosContext {
  todos: ITodo[];
  message: string;
  errorMessage: string;
}

export const todosMachine = createMachine<TodosContext>(
  {
    id: "todosMachine",
    initial: "idle",
    context: {
      todos: [],
      message: "",
      errorMessage: "",
    },
    states: {
      idle: {
        on: {
          LOAD: "loading",
        },
      },
      loading: {
        on: {
          RESOLVE: { target: "success", actions: ["loadData", "setTodos"] },
          REJECT: { target: "failed", actions: ["setErrorMessage"] },
        },
      },
      failed: {
        on: {
          LOAD: "loading",
        },
      },
      success: {
        on: {
          LOAD: { target: "loading", actions: ["setMessage"] },
        },
      },
    },
  },
  {
    actions: {
      setTodos: assign((context, event: any) => ({
        todos: event.todos,
      })),
      setMessage: assign((context, event: any) => ({
        message: event.message,
      })),
      setErrorMessage: assign((context, event: any) => ({
        errorMessage: event.errorMessage,
      })),
      loadData: assign((context, event: any) => ({
        todos: event.todos,
      })),
    },
  }
);
