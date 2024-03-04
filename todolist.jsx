import { useState } from "react";
import TodoTable from "./todotable";

export default function TodoList() {
  const [todo, setTodo] = useState({ description: '', date: '' })
  const [todos, setTodos] = useState([])

  const handleInputChange = (event) => {
    setTodo({ ...todo, [event.target.name]: event.target.value });
  }

  const addTodo = (event) => {
    if (!todo.description.trim() || !todo.date.trim()) {
      alert('Syötä molempiin kenttiin tiedot');
      return;
    }
    event.preventDefault();
    setTodos([...todos, todo]);
    setTodo({ description: '', date: '' });
  }

  const deleteEntry = (index) => {
    console.log(index)
    setTodos(todos.filter((todo, i) => i !== index));
  }

  return (
      <div className="TodoList">
          <form>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={todo.description}
              onChange={handleInputChange}
            />
            <input
              type="date"
              name="date"
              placeholder="Date"
              value={todo.date}
              onChange={handleInputChange}
            />
            <button onClick={addTodo}>Add ToDo</button>
          </form>

          <TodoTable todos={todos} poistaTehtava={deleteEntry}/>
      </div>
  );
}
