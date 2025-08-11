import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ListTodo } from 'lucide-react';
import ToDoItem from './ToDoItem';

const ToDoList = ({ todos, onToggle, onDelete, onEdit }) => {
  // Empty state
  if (todos.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-12 text-center"
      >
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <ListTodo className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            No tasks yet
          </h3>
          <p className="text-gray-600">
            Add your first task above to get started!
          </p>
        </div>
      </motion.div>
    );
  }

  const pendingTodos = todos.filter((todo) => !todo.completed);
  const completedTodos = todos.filter((todo) => todo.completed);

  return (
    <div className="space-y-6">
      {/* Pending */}
      {pendingTodos.length > 0 && (
        <section className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 transition hover:shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <ListTodo className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Pending Tasks ({pendingTodos.length})
            </h2>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {pendingTodos.map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <ToDoItem
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* Completed */}
      {completedTodos.length > 0 && (
        <section className="bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg p-6 transition hover:shadow-xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Completed Tasks ({completedTodos.length})
            </h2>
          </div>

          <div className="space-y-3">
            <AnimatePresence>
              {completedTodos.map((todo) => (
                <motion.div
                  key={todo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <ToDoItem
                    todo={todo}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      )}
    </div>
  );
};

export default ToDoList;