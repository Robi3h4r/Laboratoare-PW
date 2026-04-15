import { useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  function handleAdd() {
    if (input.trim() === '') return;
    setTodos([...todos, input]);
    setInput('');
  }

  function handleDelete(index) {
    setTodos(todos.filter((_, i) => i !== index));
  }

  return (
    <div>
      <h3>Todo List</h3>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Adauga un task..."
      />

      <button onClick={handleAdd}>Adauga</button>

      <ul>
        {todos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => handleDelete(index)}>Șterge</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;