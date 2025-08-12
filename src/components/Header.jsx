// Importing React, useState hook, and required icons from lucide-react
import React, { useState } from 'react';
import { Plus, CheckCircle2, Clock, ListTodo } from 'lucide-react';

// Header component that shows stats and allows adding new tasks
// Props:
// totalTasks -> total number of tasks
// completedTasks -> number of completed tasks
// onAddTask -> function to add a new task
const Header = ({ totalTasks, completedTasks, onAddTask }) => {
  // Local state to hold the input value for new task
  const [inputValue, setInputValue] = useState('');
  // State to show animation when adding a task
  const [isAdding, setIsAdding] = useState(false);

  // Function to handle form submit
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page reload
    if (inputValue.trim()) { // Only add if input is not empty
      setIsAdding(true); // Trigger "adding" animation
      onAddTask(inputValue.trim()); // Call parent function to add task
      setInputValue(''); // Clear input field
      // Stop animation after a short delay
      setTimeout(() => setIsAdding(false), 200);
    }
  };

  // Calculate pending tasks
  const pendingTasks = totalTasks - completedTasks;
  // Calculate completion percentage
  const completionPercentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Choose progress bar color based on percentage
  const progressColor =
    completionPercentage >= 80
      ? 'from-green-500 to-green-600' // High completion = green
      : completionPercentage >= 40
      ? 'from-yellow-400 to-yellow-500' // Medium completion = yellow
      : 'from-red-500 to-red-600'; // Low completion = red

  return (
    <div className="bg-white/40 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-8 transition-all duration-300">
      {/* App Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          Task Manager
        </h1>
        <p className="text-gray-600">Stay organized and productive</p>
      </div>

      {/* Stats Section - Shows Total, Completed, and Pending */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">

        {/* Total Tasks Card */}
        <div className="p-4 rounded-xl border border-blue-200 
                        bg-gradient-to-r from-blue-50 to-blue-100
                        shadow hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Total Tasks</p>
              <p className="text-2xl font-bold text-blue-800">{totalTasks}</p>
            </div>
            <ListTodo className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        {/* Completed Tasks Card */}
        <div className="p-4 rounded-xl border border-green-200
                        bg-gradient-to-r from-green-50 to-green-100
                        shadow hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold text-green-800">{completedTasks}</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
        </div>

        {/* Pending Tasks Card */}
        <div className="p-4 rounded-xl border border-amber-200
                        bg-gradient-to-r from-amber-50 to-amber-100
                        shadow hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-600 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold text-amber-800">{pendingTasks}</p>
            </div>
            <Clock className="w-8 h-8 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Progress Bar Section */}
      {totalTasks > 0 && (
        <div className="mb-8">
          {/* Progress label and percentage */}
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">Progress</span>
            <span className="text-sm font-medium text-gray-800">
              {completionPercentage}%
            </span>
          </div>
          {/* Bar Background */}
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            {/* Progress indicator */}
            <div
              className={`bg-gradient-to-r ${progressColor} h-3 rounded-full transition-all duration-700 ease-out`}
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Add Task Input */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={inputValue} // Controlled input
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="w-full pl-4 pr-12 py-4 border-2 border-gray-200 
                     rounded-xl focus:border-blue-500 
                     focus:ring-4 focus:ring-blue-100 
                     outline-none transition-all duration-200 
                     text-gray-800 placeholder-gray-400
                     bg-white/70"
        />
        {/* Add button */}
        <button
          type="submit"
          disabled={!inputValue.trim() || isAdding} // Disable if input is empty or in adding state
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg 
                      transition-all duration-200
                      ${inputValue.trim() && !isAdding
                        ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl scale-100'
                        : 'bg-gray-300 text-gray-500 scale-95'}
                      ${isAdding ? 'animate-pulse' : ''}`}
        >
          {/* Plus icon - rotates if adding */}
          <Plus
            className={`w-5 h-5 transition-transform duration-200 ${
              isAdding ? 'rotate-45' : ''
            }`}
          />
        </button>
      </form>
    </div>
  );
};

// Export Header component
export default Header;


