import React, { useState } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

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
            <div>
              <h2 className="text-lg font-semibold mb-3 flex items-center">
                <span className="text-blue-500 mr-2">•••</span>
                TOP 3 PRIORITIES FOR TODAY
              </h2>
              <div className="space-y-2">
                {priorities.map((priority, index) => (
                  <div key={priority.id} className="flex items-center">
                    <span className="mr-2">{index + 1}.</span>
                    <input
                      type="text"
                      className="w-full border-b border-gray-200 focus:outline-none focus:border-blue-500 p-1"
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
                  <div key={task.id} className="flex items-center">
                    <input
                      type="checkbox"
                      className="mr-2 rounded-full"
                    />
                    <input
                      type="text"
                      className="w-full border-b border-gray-200 focus:outline-none focus:border-blue-500 p-1"
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
                <div key={time} className="flex items-center">
                  <span className="w-16 text-gray-600">{time}</span>
                  <input
                    type="text"
                    className="w-full border-b border-gray-200 focus:outline-none focus:border-blue-500 p-1"
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
          <div>
            <h2 className="text-lg font-semibold mb-3">📊 DAY REVIEW</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span>Hours Slept:</span>
                <div className="flex gap-1">
                  {[1,2,3,4,5,6,7,8,9].map((num) => (
                    <button key={num} className="w-6 h-6 border border-gray-300 rounded-full hover:bg-blue-500 hover:text-white">
                      {num}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Healthy Diet:</span>
                <div className="flex gap-2">
                  {['BD', 'LD', 'SD', 'DD'].map((label) => (
                    <button key={label} className="px-2 py-1 border border-gray-300 rounded hover:bg-blue-500 hover:text-white">
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Water Intake:</span>
                <div className="flex gap-1">
                  {Array(8).fill(null).map((_, i) => (
                    <button key={i} className="w-6 h-6 border border-gray-300 rounded-full hover:bg-blue-500">
                      ○
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Productivity:</span>
                <div className="flex gap-1">
                  {Array(5).fill(null).map((_, i) => (
                    <button key={i} className="text-xl hover:text-yellow-500">
                      ⭐
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span>Overall Mood:</span>
                <div className="flex gap-1">
                  {Array(5).fill(null).map((_, i) => (
                    <button key={i} className="text-xl hover:text-red-500">
                      ❤️
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
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