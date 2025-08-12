// Import React, useState hook, and icons from lucide-react
import React, { useState } from 'react';
import { Check, X, Edit3, Trash2, Save } from 'lucide-react';

// ToDoItem component represents a single task item
// Props:
// todo -> task object containing id, text, completed, createdAt
// onToggle -> function to toggle completion status
// onDelete -> function to delete task
// onEdit -> function to edit task text
const ToDoItem = ({ todo, onToggle, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  // State to trigger delete animation
  const [isDeleting, setIsDeleting] = useState(false);
  // Handles saving the edited text
  const handleEdit = () => {
    if (editText.trim() && editText !== todo.text) {
      onEdit(todo.id, editText.trim());
    }
    setIsEditing(false); 
  };

  // Cancels editing and restores original text
  const handleCancel = () => {
    setEditText(todo.text);
    setIsEditing(false);
  };

  // Handles delete with animation delay
  const handleDelete = () => {
    setIsDeleting(true); // Trigger animation
    setTimeout(() => {
      onDelete(todo.id); // Actually delete after delay
    }, 200);
  };

  // Handles keyboard shortcuts while editing
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleEdit(); // Save on Enter
    else if (e.key === 'Escape') handleCancel(); // Cancel on Escape
  };

  return (
    <div
      className={`
        group p-4 rounded-xl border-2 transition-all duration-300
        ${todo.completed 
          ? 'bg-gradient-to-r from-green-50 to-green-100 border-green-200' 
          : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50/40'}
        ${isDeleting ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}
      `}
    >
      <div className="flex items-center gap-4">
        
        {/* Completion Toggle Button */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`
            flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all
            ${todo.completed 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-blue-500'}
          `}
        >
          {todo.completed && <Check className="w-4 h-4" />}
        </button>

        {/* Task Text or Edit Input */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            // Editing Mode
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKeyPress}
                className="flex-1 px-3 py-1 border border-gray-300 rounded-lg 
                           focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                           bg-white text-gray-800"
                autoFocus
              />
              {/* Save Button */}
              <button
                onClick={handleEdit}
                className="p-1 text-green-600 hover:text-green-700 hover:bg-green-100 rounded-lg"
              >
                <Save className="w-4 h-4" />
              </button>
              {/* Cancel Button */}
              <button
                onClick={handleCancel}
                className="p-1 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            // Normal View Mode
            <div className="flex items-center justify-between">
              {/* Task Text */}
              <span
                className={`truncate text-gray-800 ${
                  todo.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {todo.text}
              </span>
              {/* Action Buttons (Edit/Delete) - show on hover */}
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-1 text-blue-600 hover:text-blue-700 hover:bg-blue-100 rounded-lg"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={handleDelete}
                  className="p-1 text-red-600 hover:text-red-700 hover:bg-red-100 rounded-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Metadata (Created Date & Time) */}
      <div className="mt-2 text-xs text-gray-500 pl-10">
        Created {todo.createdAt.toLocaleDateString()} •{' '}
        {todo.createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

export default ToDoItem;
