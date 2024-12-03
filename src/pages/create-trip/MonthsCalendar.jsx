import React, { useState } from 'react';
import { format, startOfYear, endOfYear, eachMonthOfInterval } from 'date-fns';

const MonthsCalendar = ({ onMonthSelect, selectedMonth }) => {
  const [currentYear] = useState(new Date().getFullYear());
  const months = eachMonthOfInterval({
    start: startOfYear(new Date(currentYear)),
    end: endOfYear(new Date(currentYear))
  });

  const handleMonthClick = (month) => {
      // Change this to pass the month name instead of number
      onMonthSelect(format(month, 'MMMM'));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md mx-auto">
      <div className="grid grid-cols-3 gap-4">
        {months.map((month) => {
          const monthName = format(month, 'MMMM');
          // Now we can directly compare month names
          const isSelected = selectedMonth === monthName;

          return (
            <button
              key={monthName}
              onClick={() => handleMonthClick(month)}
              className={`
                py-3 px-4 rounded-xl transition-all duration-300
                ${isSelected 
                  ? 'bg-orange-500 text-white' 
                  : 'bg-gray-50 text-gray-700'
                }
              `}
            >
              {monthName}
            </button>
          );
        })}
      </div>
      {selectedMonth && (
        <div className="mt-4 text-center text-sm text-gray-600">
          Selected: {selectedMonth}
        </div>
      )}
    </div>
  );
};

export default MonthsCalendar;