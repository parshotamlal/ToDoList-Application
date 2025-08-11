import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import ToDoList from './components/ToDoList';
import './index.css';


function App() {
  const [todos, setTodos] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  // Load from localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTodos) {
      const parsedTodos = JSON.parse(savedTodos).map((todo) => ({
        ...todo,
        createdAt: new Date(todo.createdAt)
      }));
      setTodos(parsedTodos);
    }
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    }
  }, []);

  // Save todos
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const addTodo = (text) => {
    const newTodo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const toggleTodo = (id) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const editTodo = (id, newText) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  const completedTasks = todos.filter(todo => todo.completed).length;

  return (
    <div className={`min-h-screen transition-colors duration-300 
      ${darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white' 
        : 'bg-gradient-to-br from-blue-50 via-white to-purple-50 text-gray-900'}`}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-3 py-2 rounded-xl text-sm font-medium 
              bg-white/30 dark:bg-gray-700/50 backdrop-blur-lg
              shadow-md hover:shadow-lg transition-all duration-300
              hover:scale-105"
          >
            {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-white/40 dark:bg-gray-800/40 backdrop-blur-md shadow-xl transition-all duration-300">
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
