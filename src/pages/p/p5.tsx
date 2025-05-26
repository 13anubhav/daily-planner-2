import React, { useState } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

interface DayReviewState {
  hoursSlept: number | null;
  healthyDiet: string[];
  waterIntake: boolean[];
  productivity: boolean[];
  overallMood: boolean[];
}

// Add theme types at the top
type Theme = {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  border: string;
};

const themes: Theme[] = [
  {
    name: 'Classic Blue',
    primary: 'bg-blue-500',
    secondary: 'bg-blue-100',
    accent: 'text-blue-500',
    background: 'bg-gray-50',
    text: 'text-gray-800',
    border: 'border-blue-200'
  },
  {
    name: 'Forest Green',
    primary: 'bg-emerald-500',
    secondary: 'bg-emerald-100',
    accent: 'text-emerald-500',
    background: 'bg-green-50',
    text: 'text-gray-800',
    border: 'border-emerald-200'
  },
  {
    name: 'Royal Purple',
    primary: 'bg-purple-500',
    secondary: 'bg-purple-100',
    accent: 'text-purple-500',
    background: 'bg-purple-50',
    text: 'text-gray-800',
    border: 'border-purple-200'
  },
  {
    name: 'Sunset Orange',
    primary: 'bg-orange-500',
    secondary: 'bg-orange-100',
    accent: 'text-orange-500',
    background: 'bg-orange-50',
    text: 'text-gray-800',
    border: 'border-orange-200'
  },
  {
    name: 'Ocean Teal',
    primary: 'bg-teal-500',
    secondary: 'bg-teal-100',
    accent: 'text-teal-500',
    background: 'bg-teal-50',
    text: 'text-gray-800',
    border: 'border-teal-200'
  },
  {
    name: 'Dark Mode',
    primary: 'bg-gray-800',
    secondary: 'bg-gray-700',
    accent: 'text-blue-400',
    background: 'bg-gray-900',
    text: 'text-gray-100',
    border: 'border-gray-600'
  }
];

const DailyPlanner: React.FC = () => {
  const [priorities, setPriorities] = useState<Task[]>([
    { id: 1, text: '', completed: false },
    { id: 2, text: '', completed: false },
    { id: 3, text: '', completed: false },
  ]);

  const [tasks, setTasks] = useState<Task[]>(
    Array(15).fill(null).map((_, i) => ({ id: i, text: '', completed: false }))
  );

  const timeSlots = [
    '5 am', '6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm',
    '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm'
  ];

  const [dayReview, setDayReview] = useState<DayReviewState>({
    hoursSlept: null,
    healthyDiet: [],
    waterIntake: Array(8).fill(false),
    productivity: Array(5).fill(false),
    overallMood: Array(5).fill(false),
  });

  // Get current date
  const today = new Date();

  // Calculate day of year
  const getDayOfYear = (date: Date): number => {
    const start = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  // Get days remaining in year
  const getDaysRemaining = (date: Date): number => {
    const year = date.getFullYear();
    const lastDay = new Date(year, 11, 31); // December 31
    const diff = lastDay.getTime() - date.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    return Math.floor(diff / oneDay);
  };

  // Format day name
  const dayName = today.toLocaleString('en-US', { weekday: 'short' }).toUpperCase();
  
  // Format month and date
  const month = today.toLocaleString('en-US', { month: 'long' }).toUpperCase();
  const date = today.getDate();

  // Calculate day of year and days remaining
  const dayOfYear = getDayOfYear(today);
  const daysRemaining = getDaysRemaining(today);

  // Add theme state
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  // Add theme selector component
  const ThemeSelector = () => (
    <div className="fixed bottom-4 right-4 md:top-4 md:bottom-auto z-50">
      <div className="bg-white rounded-lg shadow-lg p-2 flex flex-col gap-2">
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => setCurrentTheme(theme)}
            className={`w-8 h-8 rounded-full ${theme.primary} hover:ring-2 hover:ring-offset-2
              ${currentTheme.name === theme.name ? 'ring-2 ring-offset-2' : ''}`}
            title={theme.name}
          />
        ))}
      </div>
    </div>
  );

  const handleHoursSlept = (hours: number) => {
    setDayReview(prev => ({
      ...prev,
      hoursSlept: hours
    }));
  };

  const handleDietToggle = (meal: string) => {
    setDayReview(prev => ({
      ...prev,
      healthyDiet: prev.healthyDiet.includes(meal)
        ? prev.healthyDiet.filter(m => m !== meal)
        : [...prev.healthyDiet, meal]
    }));
  };

  const handleArrayToggle = (
    key: 'waterIntake' | 'productivity' | 'overallMood',
    index: number
  ) => {
    setDayReview(prev => ({
      ...prev,
      [key]: prev[key].map((value, i) => 
        i === index ? !value : value
      )
    }));
  };

  // Update input styles
  const inputStyles = `
    w-full border-b ${currentTheme.border} focus:outline-none focus:border-${currentTheme.accent} p-1 
    whitespace-pre-wrap break-words overflow-hidden resize-none bg-transparent
    ${currentTheme.text}
  `;

  const textareaStyles = `
    w-full border ${currentTheme.border} rounded-md p-2 h-24 
    focus:outline-none focus:${currentTheme.accent} break-words resize-none
    bg-transparent ${currentTheme.text}
  `;

  return (
    <div className={`min-h-screen ${currentTheme.background} p-4 md:p-8 transition-colors duration-200`}>
      <ThemeSelector />
      <div className={`max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 
        ${currentTheme.text} transition-colors duration-200`}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className={`${currentTheme.text} break-normal`}>
            Day: {dayOfYear}/{daysRemaining}
          </div>
          <div className={`text-2xl font-bold ${currentTheme.accent}`}>{dayName}</div>
          <div className="text-xl">{month} {date}</div>
        </div>

        {/* Make Today Great Section */}
        <div className="mb-8">
          <h2 className={`text-lg font-semibold ${currentTheme.accent} mb-2 break-normal`}>
            🔑 I'LL MAKE TODAY GREAT BY
          </h2>
          <div className={`border-b ${currentTheme.border}`}></div>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Top 3 Priorities */}
            <div>
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <span className="text-blue-500 mr-2">•••</span>
                TOP 3 PRIORITIES FOR TODAY
              </h2>
              <div className="space-y-2">
                {priorities.map((priority, index) => (
                  <div key={priority.id} className="flex items-start">
                    <span className="mr-2 mt-1">{index + 1}.</span>
                    <textarea
                      value={priority.text}
                      onChange={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                        setPriorities(prev => prev.map(p =>
                          p.id === priority.id ? { ...p, text: e.target.value } : p
                        ));
                      }}
                      className={`${inputStyles} min-h-[2rem]`}
                      rows={1}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* To-Do List */}
            <div>
              <h2 className="text-lg font-semibold mb-3">≡ TO-DO LIST</h2>
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-start">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => {
                        setTasks(prev => prev.map(t =>
                          t.id === task.id ? { ...t, completed: !t.completed } : t
                        ));
                      }}
                      className="mr-2 mt-1 rounded-full"
                    />
                    <textarea
                      value={task.text}
                      onChange={(e) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = `${e.target.scrollHeight}px`;
                        setTasks(prev => prev.map(t =>
                          t.id === task.id ? { ...t, text: e.target.value } : t
                        ));
                      }}
                      className={`${inputStyles} min-h-[2rem] ${task.completed ? 'line-through text-gray-500' : ''}`}
                      rows={1}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Schedule */}
          <div>
            <h2 className="text-lg font-semibold mb-3">📅 DAY SCHEDULE</h2>
            <div className="space-y-2">
              {timeSlots.map((time) => (
                <div key={time} className="flex items-start">
                  <span className="w-16 text-gray-600 mt-1">{time}</span>
                  <textarea
                    className={`${inputStyles} min-h-[2rem]`}
                    rows={1}
                    onChange={(e) => {
                      e.target.style.height = 'auto';
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Left Bottom */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">📸 TODAY'S BEST MOMENT</h2>
              <textarea
                className={textareaStyles}
              ></textarea>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-3">🙏 WHAT I'M GRATEFUL FOR</h2>
              <textarea
                className={textareaStyles}
              ></textarea>
            </div>
          </div>

          {/* Right Bottom - Day Review */}
          <div>
            <h2 className="text-lg font-semibold mb-3">📊 DAY REVIEW</h2>
            <div className="space-y-4">
              {/* Hours Slept */}
              <div className="flex items-center justify-between">
                <span>Hours Slept:</span>
                <div className="flex gap-1">
                  {[1,2,3,4,5,6,7,8,9].map((num) => (
                    <button
                      key={num}
                      className={`w-6 h-6 border border-gray-300 rounded-full hover:bg-blue-500 hover:text-white
                        ${dayReview.hoursSlept === num ? 'bg-blue-500 text-white' : ''}`}
                      onClick={() => handleHoursSlept(num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Healthy Diet */}
              <div className="flex items-center justify-between">
                <span>Healthy Diet:</span>
                <div className="flex gap-2">
                  {[
                    { label: 'Breakfast', full: 'Breakfast' },
                    { label: 'Lunch', full: 'Lunch' },
                    { label: 'Snack', full: 'Snack' },
                    { label: 'Dinner', full: 'Dinner' }
                  ].map(({ label, full }) => (
                    <button
                      key={label}
                      className={`px-2 py-1 border border-gray-300 rounded hover:bg-blue-500 hover:text-white
                        ${dayReview.healthyDiet.includes(full) ? 'bg-blue-500 text-white' : ''}`}
                      onClick={() => handleDietToggle(full)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Water Intake */}
              <div className="flex items-center justify-between">
                <span>Water Intake:</span>
                <div className="flex gap-1">
                  {dayReview.waterIntake.map((isChecked, i) => (
                    <button
                      key={i}
                      className={`w-6 h-6 border border-gray-300 rounded-full hover:bg-blue-500
                        ${isChecked ? 'bg-blue-500 text-white' : ''}`}
                      onClick={() => handleArrayToggle('waterIntake', i)}
                    >
                      ○
                    </button>
                  ))}
                </div>
              </div>

              {/* Productivity */}
              <div className="flex items-center justify-between">
          <span>Productivity:</span>
          <div className="flex gap-1">
            {dayReview.productivity.map((isChecked, i) => (
              <button
                key={i}
                className={`text-xl transition-colors duration-200 
                  ${isChecked 
                    ? 'text-yellow-500' 
                    : 'text-gray-300 hover:text-yellow-200'
                  }`}
                onClick={() => handleArrayToggle('productivity', i)}
                title={`Toggle star ${i + 1}`}
              >
                {isChecked ? '⭐' : '☆'}
              </button>
            ))}
          </div>
        </div>

              {/* Overall Mood */}
              <div className="flex items-center justify-between">
          <span>Overall Mood:</span>
          <div className="flex gap-1">
            {dayReview.overallMood.map((isChecked, i) => (
              <button
                key={i}
                className={`text-xl transition-colors duration-200 
                  ${isChecked 
                    ? 'text-red-500' 
                    : 'text-gray-300 hover:text-red-200'
                  }`}
                onClick={() => handleArrayToggle('overallMood', i)}
                title={`Toggle heart ${i + 1}`}
              >
                {isChecked ? '❤️' : '♡'}
              </button>
            ))}
          </div>
        </div>
            </div>
          </div>
        </div>

        {/* Daily Reminder */}
        <div className="mt-8 text-center text-gray-600 italic break-normal">
          <p>Daily Reminder: At the end of the day what matters is what you get done, not how you feel about it.</p>
          <p>You have to have a level of accountability to get to where you want to go</p>
        </div>
      </div>
    </div>
  );
};

export default DailyPlanner;