import React from 'react';
import { CheckCircle2, ListTodo } from 'lucide-react';
import ToDoItem from './ToDoItem';

// ToDoList component displays a list of tasks, separated into Pending and Completed
// Props:
// todos -> array of task objects
// onToggle -> toggles completion status
// onDelete -> deletes a task
// onEdit -> edits a task
const ToDoList = ({ todos, onToggle, onDelete, onEdit }) => {
  if (todos.length === 0) {
    return (
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-12 text-center transition-all duration-300">
        <div className="flex flex-col items-center">

          {/* Icon with pulse animation */}
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <ListTodo className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No tasks yet
          </h3>
          <p className="text-gray-600">
            Add your first task above to get started!
          </p>
        </div>
      </div>
    );
  }

  // Separate tasks into pending and completed arrays
  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="space-y-6">
      
      {/* Pending Tasks Section */}
      {pendingTodos.length > 0 && (
        <section className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <ListTodo className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Pending Tasks ({pendingTodos.length})
            </h2>
          </div>

          {/* Render pending task items */}
          <div className="space-y-3 transition-all duration-300">
            {pendingTodos.map((todo) => (
              <ToDoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </section>
      )}

      {/* Completed Tasks Section */}
      {completedTodos.length > 0 && (
        <section className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl">
          {/* Section header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Completed Tasks ({completedTodos.length})
            </h2>
          </div>

          {/* Render completed task items */}
          <div className="space-y-3 transition-all duration-300">
            {completedTodos.map((todo) => (
              <ToDoItem
                key={todo.id}
                todo={todo}
                onToggle={onToggle}
                onDelete={onDelete}
                onEdit={onEdit}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ToDoList;
