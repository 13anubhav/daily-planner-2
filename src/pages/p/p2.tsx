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

const DailyPlanner: React.FC = () => {
  const [priorities, setPriorities] = useState<Task[]>([
    { id: 1, text: '', completed: false },
    { id: 2, text: '', completed: false },
    { id: 3, text: '', completed: false },
  ]);

  const [tasks, setTasks] = useState<Task[]>(
    Array(10).fill(null).map((_, i) => ({ id: i, text: '', completed: false }))
  ); 

  const [dayReview, setDayReview] = useState<DayReviewState>({
    hoursSlept: null,
    healthyDiet: [],
    waterIntake: Array(8).fill(false),
    productivity: Array(5).fill(false),
    overallMood: Array(5).fill(false),
  });

  const timeSlots = [
    '5 am', '6 am', '7 am', '8 am', '9 am', '10 am', '11 am', '12 pm',
    '1 pm', '2 pm', '3 pm', '4 pm', '5 pm', '6 pm', '7 pm', '8 pm', '9 pm', '10 pm'
  ];

  // Handler for hours slept
  const handleHoursSlept = (hours: number) => {
    setDayReview(prev => ({
      ...prev,
      hoursSlept: hours
    }));
  };

  // Handler for healthy diet
  const handleDietToggle = (meal: string) => {
    setDayReview(prev => ({
      ...prev,
      healthyDiet: prev.healthyDiet.includes(meal)
        ? prev.healthyDiet.filter(m => m !== meal)
        : [...prev.healthyDiet, meal]
    }));
  };

  // Handler for toggleable arrays (water, productivity, mood)
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

  // Update the Top 3 Priorities section
  const Top3Priorities = () => (
    <div>
      <h2 className="text-lg font-semibold mb-3 flex items-center">
        <span className="text-blue-500 mr-2">•••</span>
        TOP 3 PRIORITIES FOR TODAY
      </h2>
      <div className="space-y-4">
        {priorities.map((priority, index) => (
          <div key={priority.id} className="flex items-start">
            <span className="mr-2 mt-1 flex-shrink-0">{index + 1}.</span>
            <div className="w-full">
              <div
                className="w-full border-b border-gray-200 focus-within:border-blue-500"
                style={{ minHeight: '24px' }}
              >
                <div
                  contentEditable
                  className="w-full outline-none p-1 whitespace-pre-wrap break-words"
                  onInput={(e) => {
                    // Handle schedule input if needed
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  

  // Update the To-Do List section
// Update the To-Do List section
const TodoList = () => (
  <div>
    <h2 className="text-lg font-semibold mb-3">≡ TO-DO LIST</h2>
    <div className="space-y-2">
      {tasks.map((task) => (
        <div key={task.id} className="flex items-center">
          <input
            type="checkbox"
            className="mr-2 rounded-full h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
            checked={task.completed}
            onChange={() => {
              setTasks(prev => prev.map(t =>
                t.id === task.id ? { ...t, completed: !t.completed } : t
              ));
            }}
          />
          <input
            type="text"
            value={task.text}
            onChange={(e) => {
              setTasks(prev => prev.map(t =>
                t.id === task.id ? { ...t, text: e.target.value } : t
              ));
            }}
            className={`w-full border-b border-gray-200 focus:outline-none focus:border-blue-500 p-1
              ${task.completed ? 'line-through text-gray-500' : ''}`}
            placeholder="Enter task..."
          />
        </div>
      ))}
    </div>
  </div>
);

  // Update the Day Schedule section
  const DaySchedule = () => (
    <div>
      <h2 className="text-lg font-semibold mb-3">📅 DAY SCHEDULE</h2>
      <div className="space-y-2">
        {timeSlots.map((time) => (
          <div key={time} className="flex items-center">
            <span className="w-20 text-gray-600 flex-shrink-0 text-sm">
              {time}
            </span>
            <div className="w-full ml-2">
              <div
                className="w-full border-b border-gray-200 focus-within:border-blue-500"
                style={{ minHeight: '24px' }}
              >
                <div
                  contentEditable
                  className="w-full outline-none py-1 whitespace-pre-wrap break-words min-h-[24px] leading-6"
                  onInput={(e) => {
                    // Handle schedule input if needed
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Update the Day Review section
  const DayReview = () => (
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
                className={`w-6 h-6 border border-gray-300 rounded-full 
                  ${dayReview.hoursSlept === num ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
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
                className={`px-2 py-1 border border-gray-300 rounded 
                  ${dayReview.healthyDiet.includes(full) ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
                onClick={() => handleDietToggle(full)}
                title={full}
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
                className={`w-6 h-6 border border-gray-300 rounded-full 
                  ${isChecked ? 'bg-blue-500 text-white' : 'hover:bg-blue-100'}`}
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
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-gray-600">Day: 233/132</div>
          <div className="text-2xl font-bold">THU</div>
          <div className="text-xl">AUGUST 21</div>
        </div>

        {/* Make Today Great Section */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-blue-600 mb-2">
            🔑 I'LL MAKE TODAY GREAT BY
          </h2>
          <div className="border-b border-gray-200"></div>
        </div>

        {/* Main Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Top 3 Priorities */}
            <Top3Priorities />

            {/* To-Do List */}
            <TodoList />
          </div>

          {/* Right Column - Schedule */}
          <div>
            <DaySchedule />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {/* Left Bottom */}
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-3">📸 TODAY'S BEST MOMENT</h2>
              <textarea
                className="w-full border border-gray-200 rounded-md p-2 h-24 focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-3">🙏 WHAT I'M GRATEFUL FOR</h2>
              <textarea
                className="w-full border border-gray-200 rounded-md p-2 h-24 focus:outline-none focus:border-blue-500"
              ></textarea>
            </div>
          </div>

          {/* Right Bottom - Day Review */}
          <DayReview />
        </div>

        {/* Daily Reminder */}
        <div className="mt-8 text-center text-gray-600 italic">
          <p>Daily Reminder: At the end of the day what matters is what you get done, not how you feel about it.</p>
          <p>You have to have a level of accountability to get to where you want to go</p>
        </div>
      </div>
    </div>
  );
};

export default DailyPlanner;