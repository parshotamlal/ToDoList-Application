import React, { useEffect, useState } from 'react';
import ToDoItem from './components/ToDoItem';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo) => ({
        ...todo,
        createdAt: new Date(todo.createdAt),
      }));
      setTodos(parsedTodos);
    }
  }, []);

  // Save todos
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const completedTasks = todos.filter((todo) => todo.completed).length;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full px-6 py-8">
        <div className="p-6 rounded-3xl bg-white/40 backdrop-blur-md shadow-xl">
          <Header
            totalTasks={todos.length}
            completedTasks={completedTasks}
            onAddTask={addTodo}
          />
          <ToDoList
            todos={todos}
            onToggle={toggleTodo}
            onDelete={deleteTodo}
            onEdit={editTodo}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
