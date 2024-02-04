import { useState } from "react";
import { useAddTodoMutation, useGetTodosQuery } from "../../redux/todoApiSlice"

export default function Todos() {
    const [inputValue, setInputValue] = useState('')
    const {data: todos, isLoading, error} = useGetTodosQuery()
    const [addTodo] = useAddTodoMutation();

    console.log(isLoading, todos); 
    if(isLoading) {
        return 'Loading...'
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(!inputValue) {
            return alert('Enter value')
        }

        addTodo({text: inputValue})
    }


  return (
    <div>
        {error && <div>{error.data.error}</div>}

        <form onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setInputValue(e.target.value)}/>
            <button>Create</button>    
        </form>    

        {todos.map((todo) => (
            <div key={todo._id}> 
                {todo.text}
            </div>
        ))}
    </div>
  )
}
