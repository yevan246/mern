import { useState } from "react";
import {
  useAddTodoMutation,
  useGetTodosQuery,
} from "../../redux/todoApiSlice";
import TodoItem from "../../components/TodoItem/TodoItem";

export default function Todos() {
  const [inputValue, setInputValue] = useState("");
  const { data: todos, isLoading, error } = useGetTodosQuery();
  const [addTodo] = useAddTodoMutation();


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputValue) {
      return alert("Enter value");
    }

    addTodo({ text: inputValue });
  };

  console.log(isLoading, todos);

  if (isLoading) {
    return "Loading...";
  }

  return (
    <div>
      {error && <div>{error.data.error}</div>}

      <form onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setInputValue(e.target.value)} />
        <button>Create</button>
      </form>

      {todos.map((todo) => <TodoItem key={todo._id} todo={todo} />)}
    </div>
  );
}
