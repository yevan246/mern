import { useState } from "react";
import {
  useAddTodoMutation,
  useGetTodosQuery,
} from "../../redux/api/todoApiSlice";
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
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-8 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
          <h1 className="text-grey-darkest text-2xl font-semibold pb-4">Todo List</h1>
          {error && <div>{error.data.error}</div>}

          <form onSubmit={handleSubmit}>
            <input
              className="shadow appearance-none border rounded py-2.5 px-3 mr-4 text-grey-darker"
              placeholder="Add Todo"
              type="text"
              onChange={(e) => setInputValue(e.target.value)}
            />
            <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">
              Create
            </button>
          </form>
          <div className="flex m-4 items-center">
            {todos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
