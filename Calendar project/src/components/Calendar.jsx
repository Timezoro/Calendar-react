import React, { useState, useEffect } from 'react';

const Calendar = ({ events, onAddEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarDays, setCalendarDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null); // Store the clicked date

  // Function to update the calendar
  const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();

    let days = [];

    // Previous month's dates
    for (let i = firstDayIndex; i > 0; i--) {
      const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
      days.push({
        date: prevDate.getDate(),
        fullDate: prevDate.toDateString(),
        isActive: false,
        isInactive: true, // Mark as inactive
      });
    }

    // Current month's dates
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentYear, currentMonth, i);
      days.push({
        date: i,
        fullDate: date.toDateString(),
        isActive: date.toDateString() === new Date().toDateString(),
        isInactive: false,
      });
    }

    // Next month's dates
    for (let i = 1; i <= 7 - lastDayIndex - 1; i++) {
      const nextDate = new Date(currentYear, currentMonth + 1, i);
      days.push({
        date: nextDate.getDate(),
        fullDate: nextDate.toDateString(),
        isActive: false,
        isInactive: true, // Mark as inactive
      });
    }

    // Ensure 6 rows in the calendar
    let currentLine = days.length / 7;
    const lastDate = days[days.length - 1].date;

    while (currentLine < 6) {
      for (let i = 1; i <= 7; i++) {
        const nextDate = new Date(currentYear, currentMonth + 1, lastDate + i);
        days.push({
          date: nextDate.getDate(),
          fullDate: nextDate.toDateString(),
          isActive: false,
          isInactive: true,
        });
      }
      currentLine++;
    }

    setCalendarDays(days);
  };

  // Effect to update the calendar when currentDate changes
  useEffect(() => {
    updateCalendar();
  }, [currentDate]);

  // Event handlers for navigating the calendar
  const handlePrevClick = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextClick = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  // Check if there are events for a particular day
  const hasEvents = (fullDate) => {
    return events.some((event) => new Date(event.date).toDateString() === fullDate);
  };

  return (
    <div className="calendar-container">
      {/* Calendar Header */}
      <div className="calendar-header flex items-center justify-between mb-4">
        <button id="prevBtn" onClick={handlePrevClick} className="p-2 rounded hover:text-red-500 font-semibold">
          Prev
        </button>
        <div id="monthYear" className="text-lg font-bold">
          {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </div>
        <button id="nextBtn" onClick={handleNextClick} className="p-2 rounded hover:text-red-500 font-semibold">
          Next
        </button>
      </div>

      {/* Calendar Dates */}
      <div className="w-full h-full">
        <div className="grid grid-cols-7 gap-5 text-center pb-3">
          {days.map((day) => (
            <div key={day} className="date font-extrabold">{day}</div>
          ))}
        </div>
        <div id="dates" className="grid grid-cols-7 gap-5 text-center cursor-pointer">
          {/* Loop through calendarDays to render the dates */}
          {calendarDays.map((day, index) => (
            <div
              key={index}
              onClick={() => handleDateClick(day.fullDate)} // Click handler to add event
              className={`date p-6 ${day.isActive ? ' text-red-500 font-bold ' : ''} ${
                day.isInactive ? 'text-gray-400' : ''
              } hover:text-red-500`}
            >
              {day.date}
              {/* Display a dot if there are events on this date */}
              {hasEvents(day.fullDate) && (
                <div className="flex justify-center ">
                  <span className="w-1 h-1 bg-red-400 rounded-full mt-2"></span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
