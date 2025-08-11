import React, { useState } from 'react';
import { Check, X, Edit3, Trash2, Save } from 'lucide-react';

const ToDoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  const handleDelete = () => {
    setIsDeleting(true);
    setTimeout(() => {
      onDelete(todo.id);
    }, 200);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleEdit();
    else if (e.key === 'Escape') handleCancel();
  };

  return (
    <div
      className={`
        group p-4 rounded-xl border-2 transition-all duration-300
        hover:shadow-lg hover:scale-[1.01] backdrop-blur-md
        ${todo.completed 
          ? 'bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 border-green-200 dark:border-green-500/40' 
          : 'bg-white/40 dark:bg-gray-800/40 border-gray-200 dark:border-gray-600 hover:border-blue-300 dark:hover:border-blue-400'}
        ${isDeleting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
        animate-fadeIn
      `}
    >
      <div className="flex items-center gap-4">
        {/* Completion Toggle */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`
            flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center
            transition-all duration-200 hover:scale-110
            ${todo.completed 
              ? 'bg-green-500 border-green-500 text-white shadow-inner' 
              : 'border-gray-300 dark:border-gray-500 hover:border-blue-500 dark:hover:border-blue-400'}
          `}
        >
          {todo.completed && <Check className="w-4 h-4" />}
        </button>

        {/* Task Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 px-3 py-1 border border-gray-300 dark:border-gray-600 rounded-lg 
                           focus:border-blue-500 dark:focus:border-blue-400 
                           focus:ring-2 focus:ring-blue-100 dark:focus:ring-blue-900
                           bg-white/70 dark:bg-gray-800/70 text-gray-800 dark:text-gray-200"
                autoFocus
              />
              <button
                onClick={handleEdit}
                className="p-1 text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300 hover:bg-green-100 dark:hover:bg-green-900/30 rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
              </button>
              <button
                onClick={handleCancel}
                className="p-1 text-gray-600 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span
                className={`
                  text-gray-800 dark:text-gray-200 transition-all duration-200
                  ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}
                `}
              >
                {todo.text}
              </span>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Metadata */}
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 pl-10">
        Created {todo.createdAt.toLocaleDateString()} at{' '}
        {todo.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default ToDoItem;