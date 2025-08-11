// Importing necessary modules and icons
import React, { useState } from 'react';
import { Plus, CheckCircle2, Clock } from 'lucide-react';

// Header Component
const Header = ({ totalTasks, completedTasks, onAddTask }) => {
  const [inputValue, setInputValue] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setIsAdding(true);
      onAddTask(inputValue.trim());
      setInputValue('');
      setTimeout(() => setIsAdding(false), 200);
    }
  };

  const pendingTasks = totalTasks - completedTasks;
  const completionPercentage = totalTasks > 0
    ? Math.round((completedTasks / totalTasks) * 100)
    : 0;

  return (
    <div className="bg-white/40 dark:bg-gray-800/40 backdrop-blur-lg rounded-2xl shadow-xl p-8 mb-8 transition-all duration-300">
      
      {/* Title */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          Task Manager
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Stay organized and productive
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {/* Total Tasks */}
        <div className="p-4 rounded-xl border border-blue-200 dark:border-blue-500/40 
                        bg-gradient-to-r from-blue-50 to-blue-100 
                        dark:from-blue-900/30 dark:to-blue-800/30
                        shadow hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 dark:text-blue-300 text-sm font-medium">Total Tasks</p>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-200">{totalTasks}</p>
            </div>
            <Clock className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        {/* Completed */}
        <div className="p-4 rounded-xl border border-green-200 dark:border-green-500/40 
                        bg-gradient-to-r from-green-50 to-green-100 
                        dark:from-green-900/30 dark:to-green-800/30
                        shadow hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 dark:text-green-300 text-sm font-medium">Completed</p>
              <p className="text-2xl font-bold text-green-800 dark:text-green-200">{completedTasks}</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-500" />
          </div>
        </div>

        {/* Pending */}
        <div className="p-4 rounded-xl border border-amber-200 dark:border-amber-500/40 
                        bg-gradient-to-r from-amber-50 to-amber-100 
                        dark:from-amber-900/30 dark:to-amber-800/30
                        shadow hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-amber-600 dark:text-amber-300 text-sm font-medium">Pending</p>
              <p className="text-2xl font-bold text-amber-800 dark:text-amber-200">{pendingTasks}</p>
            </div>
            <Clock className="w-8 h-8 text-amber-500" />
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      {totalTasks > 0 && (
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Progress</span>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-700 ease-out"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
        </div>
      )}

      {/* Add Task */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a new task..."
          className="w-full pl-4 pr-12 py-4 border-2 border-gray-200 dark:border-gray-600 
                     rounded-xl focus:border-blue-500 dark:focus:border-blue-400 
                     focus:ring-4 focus:ring-blue-100 dark:focus:ring-blue-900 
                     outline-none transition-all duration-200 
                     text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500
                     bg-white/70 dark:bg-gray-800/70"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isAdding}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-lg 
                      transition-all duration-200
                      ${inputValue.trim() && !isAdding
                        ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-lg hover:shadow-xl scale-100'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500 dark:text-gray-400 scale-95'}
                      ${isAdding ? 'animate-pulse' : ''}`}
        >
          <Plus className={`w-5 h-5 transition-transform duration-200 ${isAdding ? 'rotate-45' : ''}`} />
        </button>
      </form>
    </div>
  );
};

export default Header;

