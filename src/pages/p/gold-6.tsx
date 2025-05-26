import React, { useState, useEffect } from 'react';

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
  mainBg: string;
  cardBg: string;
  primary: string;
  secondary: string;
  text: string;
  subtext: string;
  accent: string;
  border: string;
  inputBg: string;
  buttonHover: string;
  shadow: string;
};

const themes: Theme[] = [
  {
    name: "Ocean Breeze",
    mainBg: "bg-gradient-to-br from-blue-50 to-cyan-50",
    cardBg: "bg-white",
    primary: "bg-blue-600",
    secondary: "bg-blue-100",
    text: "text-gray-800",
    subtext: "text-gray-600",
    accent: "text-blue-600",
    border: "border-blue-200",
    inputBg: "bg-blue-50",
    buttonHover: "hover:bg-blue-700",
    shadow: "shadow-blue-100"
  },
  {
    name: "Forest Mint",
    mainBg: "bg-gradient-to-br from-emerald-50 to-green-50",
    cardBg: "bg-white",
    primary: "bg-emerald-600",
    secondary: "bg-emerald-100",
    text: "text-gray-800",
    subtext: "text-gray-600",
    accent: "text-emerald-600",
    border: "border-emerald-200",
    inputBg: "bg-emerald-50",
    buttonHover: "hover:bg-emerald-700",
    shadow: "shadow-emerald-100"
  },
  {
    name: "Royal Night",
    mainBg: "bg-gradient-to-br from-gray-900 to-indigo-900",
    cardBg: "bg-gray-800",
    primary: "bg-indigo-500",
    secondary: "bg-gray-700",
    text: "text-gray-100",
    subtext: "text-gray-300",
    accent: "text-indigo-400",
    border: "border-gray-700",
    inputBg: "bg-gray-700",
    buttonHover: "hover:bg-indigo-600",
    shadow: "shadow-gray-900"
  },
  {
    name: "Sunset Coral",
    mainBg: "bg-gradient-to-br from-orange-50 to-rose-50",
    cardBg: "bg-white",
    primary: "bg-rose-500",
    secondary: "bg-rose-100",
    text: "text-gray-800",
    subtext: "text-gray-600",
    accent: "text-rose-500",
    border: "border-rose-200",
    inputBg: "bg-rose-50",
    buttonHover: "hover:bg-rose-600",
    shadow: "shadow-rose-100"
  },
  {
    name: "Lavender Dreams",
    mainBg: "bg-gradient-to-br from-purple-50 to-fuchsia-50",
    cardBg: "bg-white",
    primary: "bg-purple-600",
    secondary: "bg-purple-100",
    text: "text-gray-800",
    subtext: "text-gray-600",
    accent: "text-purple-600",
    border: "border-purple-200",
    inputBg: "bg-purple-50",
    buttonHover: "hover:bg-purple-700",
    shadow: "shadow-purple-100"
  },
  {
    name: "Golden Hour",
    mainBg: "bg-gradient-to-br from-amber-50 to-yellow-50",
    cardBg: "bg-white",
    primary: "bg-amber-500",
    secondary: "bg-amber-100",
    text: "text-gray-800",
    subtext: "text-gray-600",
    accent: "text-amber-500",
    border: "border-amber-200",
    inputBg: "bg-amber-50",
    buttonHover: "hover:bg-amber-600",
    shadow: "shadow-amber-100"
  }
];

// Add this type and quotes data at the top of the file
type Quote = {
  text: string;
  author?: string;
};

const dailyReminders: Quote[] = [
  {
    text: "Do what you can, with what you have, where you are.",
    author: "Theodore Roosevelt"
  },
  {
    text: "Believe you can and you're halfway there.",
    author: "Theodore Roosevelt"
  },
  {
    text: "Act as if what you do makes a difference. It does.",
    author: "William James"
  },
  {
    text: "Well done is better than well said.",
    author: "Benjamin Franklin"
  },
  {
    text: "Perfection is not attainable, but if we chase perfection we can catch excellence.",
    author: "Vince Lombardi"
  },
  {
    text: "Dream big and dare to fail.",
    author: "Norman Vaughan"
  },
  {
    text: "You are never too old to set another goal or to dream a new dream.",
    author: "C.S. Lewis"
  },
  {
    text: "Hardships often prepare ordinary people for an extraordinary destiny.",
    author: "C.S. Lewis"
  },
  {
    text: "If you want to lift yourself up, lift up someone else.",
    author: "Booker T. Washington"
  },
  {
    text: "Don't watch the clock; do what it does. Keep going.",
    author: "Sam Levenson"
  },
  {
    text: "The best way to predict the future is to create it.",
    author: "Peter Drucker"
  },
  {
    text: "If opportunity doesn't knock, build a door.",
    author: "Milton Berle"
  },
  {
    text: "Failure is simply the opportunity to begin again, this time more intelligently.",
    author: "Henry Ford"
  },
  {
    text: "Quality means doing it right when no one is looking.",
    author: "Henry Ford"
  },
  {
    text: "Life is 10% what happens to us and 90% how we react to it.",
    author: "Charles R. Swindoll"
  },
  {
    text: "A goal properly set is halfway reached.",
    author: "Zig Ziglar"
  },
  {
    text: "You don't have to be great to start, but you have to start to be great.",
    author: "Zig Ziglar"
  },
  {
    text: "Success is not how high you have climbed, but how you make a positive difference to the world.",
    author: "Roy T. Bennett"
  },
  {
    text: "Start where you are. Use what you have. Do what you can.",
    author: "Arthur Ashe"
  },
  {
    text: "Happiness depends upon ourselves.",
    author: "Aristotle"
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain"
  },
  {
    text: "Do what you love and you'll never work a day in your life.",
    author: "Marc Anthony"
  },
  {
    text: "Everything you've ever wanted is on the other side of fear.",
    author: "George Addair"
  },
  {
    text: "I find that the harder I work, the more luck I seem to have.",
    author: "Thomas Jefferson"
  },
  {
    text: "Success is getting what you want. Happiness is wanting what you get.",
    author: "Dale Carnegie"
  },
  {
    text: "Opportunities don't happen. You create them.",
    author: "Chris Grosser"
  },
  {
    text: "Great things are done by a series of small things brought together.",
    author: "Vincent Van Gogh"
  },
  {
    text: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    author: "Ralph Waldo Emerson"
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius"
  },
  {
    text: "The only place where success comes before work is in the dictionary.",
    author: "Vidal Sassoon"
  },
  {
    text: "Success is not in what you have, but who you are.",
    author: "Bo Bennett"
  },
  {
    text: "Courage is resistance to fear, mastery of fear—not absence of fear.",
    author: "Mark Twain"
  },
  {
    text: "We may encounter many defeats but we must not be defeated.",
    author: "Maya Angelou"
  },
  {
    text: "Turn your wounds into wisdom.",
    author: "Oprah Winfrey"
  },
  {
    text: "Knowing is not enough; we must apply. Willing is not enough; we must do.",
    author: "Johann Wolfgang von Goethe"
  },
  {
    text: "Doubt kills more dreams than failure ever will.",
    author: "Suzy Kassem"
  },
  {
    text: "Action is the foundational key to all success.",
    author: "Pablo Picasso"
  },
  {
    text: "Your limitation—it's only your imagination.",
    author: "Unknown"
  },
  {
    text: "Push yourself, because no one else is going to do it for you.",
    author: "Unknown"
  },
  {
    text: "The harder you work for something, the greater you'll feel when you achieve it.",
    author: "Unknown"
  },
  {
    text: "Do something today that your future self will thank you for.",
    author: "Unknown"
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

  // Add state for current quote
  const [currentQuote, setCurrentQuote] = useState<Quote>(dailyReminders[0]);

  // Theme selector component with preview
  const ThemeSelector = () => (
    <div className={`mb-6 p-3 rounded-lg border ${currentTheme.border} ${currentTheme.cardBg}`}>
      <div className="flex flex-wrap gap-3 justify-center">
        {themes.map((theme) => (
          <button
            key={theme.name}
            onClick={() => setCurrentTheme(theme)}
            className={`w-10 h-10 rounded-lg ${theme.primary} 
              ${currentTheme.name === theme.name ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''}
              transition-all duration-200 hover:scale-105 shadow-md`}
            title={theme.name}
          >
            <span className="sr-only">{theme.name}</span>
          </button>
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

  // Update styles based on theme
  const inputStyles = `
    w-full border-b transition-colors duration-300
    ${currentTheme.border} ${currentTheme.text} ${currentTheme.inputBg}
    focus:outline-none focus:border-opacity-100 p-2 rounded-t-sm
    whitespace-pre-wrap break-words overflow-hidden resize-none
  `;

  const buttonStyles = `
    ${currentTheme.primary} text-white ${currentTheme.buttonHover}
    transition-all duration-200 shadow-sm
  `;

  // Add function to get random quote
  const getRandomQuote = () => {
    const currentIndex = dailyReminders.findIndex(q => q.text === currentQuote.text);
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * dailyReminders.length);
    } while (newIndex === currentIndex);
    setCurrentQuote(dailyReminders[newIndex]);
  };

  return (
    <div className={`min-h-screen ${currentTheme.mainBg} p-4 md:p-8 transition-all duration-300`}>
      <div className={`max-w-4xl mx-auto ${currentTheme.cardBg} rounded-xl shadow-xl p-6 
        ${currentTheme.text} transition-all duration-300 border ${currentTheme.border}`}>
        {/* Header with theme */}
        <div className="flex justify-between items-center mb-6">
          <div className={`${currentTheme.subtext} break-normal`}>
            Day: {dayOfYear}/{daysRemaining}
          </div>
          <div className={`text-2xl font-bold ${currentTheme.accent}`}>{dayName}</div>
          <div className={`text-xl ${currentTheme.text}`}>{month} {date}</div>
        </div>

        {/* Make Today Great section with Theme Selector */}
        <div className="mb-8">
          <h2 className={`text-lg font-semibold ${currentTheme.accent} mb-4`}>
            🔑 I'LL MAKE TODAY GREAT BY
          </h2>
          <ThemeSelector />
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
                      className={`form-checkbox rounded ${currentTheme.accent} border-2 ${currentTheme.border}`}
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
                className={`${inputStyles} hover:bg-opacity-80 min-h-[100px]`}
                placeholder="Write about your best moment today..."
                style={{
                  resize: 'vertical',
                  minHeight: '100px',
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}
              ></textarea>
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-3">🙏 WHAT I'M GRATEFUL FOR</h2>
              <textarea
                className={`${inputStyles} hover:bg-opacity-80 min-h-[100px]`}
                placeholder="List what you're grateful for..."
                style={{
                  resize: 'vertical',
                  minHeight: '100px',
                  maxHeight: '300px',
                  overflowY: 'auto'
                }}
              ></textarea>
            </div>
          </div>

          {/* Right Bottom - Day Review */}
          <div>
            <h2 className={`text-lg font-semibold mb-3 ${currentTheme.accent}`}>📊 DAY REVIEW</h2>
            <div className="space-y-6">
              {/* Hours Slept */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between">
                <span className={`${currentTheme.text} whitespace-nowrap`}>Hours Slept:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[3,4,5,6,7,8,9].map((num) => (
                    <button
                      key={num}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-200 text-sm sm:text-base
                        ${dayReview.hoursSlept === num 
                          ? `${currentTheme.primary} text-white scale-110 shadow-md` 
                          : `border ${currentTheme.border} ${currentTheme.text} hover:${currentTheme.primary} hover:text-white`
                        }`}
                      onClick={() => handleHoursSlept(num)}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>

              {/* Healthy Diet */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between">
                <span className={`${currentTheme.text} whitespace-nowrap`}>Healthy Diet:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'B', full: 'Breakfast', icon: '🍳' },
                    { label: 'L', full: 'Lunch', icon: '🍱' },
                    { label: 'S', full: 'Snack', icon: '🥪' },
                    { label: 'D', full: 'Dinner', icon: '🍽️' }
                  ].map(({ label, full, icon }) => (
                    <button
                      key={label}
                      className={`px-2 py-1 sm:px-3 sm:py-1.5 rounded-lg transition-all duration-200 flex items-center gap-1 min-w-[60px] justify-center
                        ${dayReview.healthyDiet.includes(full)
                          ? `${currentTheme.primary} text-white scale-105 shadow-md`
                          : `border ${currentTheme.border} ${currentTheme.text} hover:${currentTheme.primary} hover:text-white`
                        }`}
                      onClick={() => handleDietToggle(full)}
                      title={full}
                    >
                      <span className="text-sm">{icon}</span>
                      <span className="text-sm">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Water Intake */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between">
                <span className={`${currentTheme.text} whitespace-nowrap`}>Water Intake:</span>
                <div className="flex flex-wrap gap-1.5">
                  {dayReview.waterIntake.map((isChecked, i) => (
                    <button
                      key={i}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-all duration-200 flex items-center justify-center text-sm sm:text-base
                        ${isChecked 
                          ? `${currentTheme.primary} text-white scale-110 shadow-md` 
                          : `border ${currentTheme.border} ${currentTheme.text} hover:${currentTheme.primary} hover:text-white`
                        }`}
                      onClick={() => handleArrayToggle('waterIntake', i)}
                    >
                      {isChecked ? '💧' : '○'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Productivity */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between">
                <span className={`${currentTheme.text} whitespace-nowrap`}>Productivity:</span>
                <div className="flex flex-wrap gap-1.5">
                  {dayReview.productivity.map((isChecked, i) => (
                    <button
                      key={i}
                      className={`text-xl sm:text-2xl transition-all duration-200 transform
                        ${isChecked 
                          ? 'text-yellow-500 scale-110' 
                          : 'text-gray-300 hover:text-yellow-300'
                        }`}
                      onClick={() => handleArrayToggle('productivity', i)}
                      title={`Productivity level ${i + 1}`}
                    >
                      {isChecked ? '⭐' : '☆'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Overall Mood */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:justify-between">
                <span className={`${currentTheme.text} whitespace-nowrap`}>Overall Mood:</span>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { icon: '❤️', label: 'Sad' },
                    { icon: '❤️', label: 'Neutral' },
                    { icon: '❤️', label: 'Good' },
                    { icon: '❤️', label: 'Happy' },
                    { icon: '❤️', label: 'Excellent' }
                  ].map((mood, i) => (
                    <button
                      key={i}
                      className={`text-xl sm:text-2xl transition-all duration-200 transform
                        ${dayReview.overallMood[i] 
                          ? 'scale-125 shadow-lg' 
                          : 'opacity-50 hover:opacity-80'
                        }`}
                      onClick={() => handleArrayToggle('overallMood', i)}
                      title={mood.label}
                    >
                      {mood.icon}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Reminder Section */}
        <div className="mt-8">
          <div className={`p-6 rounded-lg ${currentTheme.secondary} bg-opacity-50 relative group`}>
            <h3 className={`text-lg font-semibold mb-4 ${currentTheme.accent}`}>
              ✨ Daily Reminder
            </h3>
            <div className="space-y-2 text-center">
              <p className={`text-lg italic ${currentTheme.text}`}>
                "{currentQuote.text}"
              </p>
              {currentQuote.author && (
                <p className={`text-sm ${currentTheme.subtext}`}>
                  - {currentQuote.author}
                </p>
              )}
            </div>
            <button
              onClick={getRandomQuote}
              className={`absolute top-4 right-4 p-2 rounded-full opacity-0 group-hover:opacity-100
                transition-all duration-200 ${currentTheme.primary} text-white hover:scale-110`}
              title="Get new reminder"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" 
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// // Optional: Add local storage to remember the last shown quote
// useEffect(() => {
//   const savedQuote = localStorage.getItem('dailyQuote');
//   if (savedQuote) {
//     setCurrentQuote(JSON.parse(savedQuote));
//   }
// }, []);

// useEffect(() => {
//   localStorage.setItem('dailyQuote', JSON.stringify(currentQuote));
// }, [currentQuote]);

export default DailyPlanner;