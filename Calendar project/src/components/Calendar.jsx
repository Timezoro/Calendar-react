import React, { useState, useEffect } from 'react';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [datesHTML, setDatesHTML] = useState('');

  // Function to update the calendar
  const updateCalendar = () => {
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    const firstDay = new Date(currentYear, currentMonth, 1); // Corrected from 0 to 1
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();

    const monthYearString = currentDate.toLocaleString('default', {
      month: 'long',
      year: 'numeric',
    });

    let datesHTML = '';

    // Previous month's dates
    for (let i = firstDayIndex; i > 0; i--) {
      const prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
      datesHTML += `<div class="date inactive">${prevDate.getDate()}</div>`;
    }

    // Current month's dates
    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentYear, currentMonth, i);
      const activeClass = date.toDateString() === new Date().toDateString() ? 'active' : '';
      datesHTML += `<div class="date ${activeClass}">${i}</div>`;
    }

    // Next month's dates
    for (let i = 1; i <= 7 - lastDayIndex; i++) {
      const nextDate = new Date(currentYear, currentMonth + 1, i);
      datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
    }

    // Ensure 6 rows in the calendar
    let currentLine = datesHTML.match(/<div class="date/g)?.length / 7 || 0;
    const lastDate = parseInt(datesHTML.match(/<div class="date inactive">(\d+)<\/div>$/)?.[1] || 0);

    while (currentLine < 6) {
      for (let i = 1; i <= 7; i++) {
        const nextDate = new Date(currentYear, currentMonth + 1, lastDate + i);
        datesHTML += `<div class="date inactive">${nextDate.getDate()}</div>`;
      }
      currentLine++;
    }

    setDatesHTML(datesHTML);
    document.getElementById('monthYear').textContent = monthYearString;
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
  return (
    <div className="calendar-container">
        {/* Calendar Header */}
        <div className="calendar-header flex items-center justify-between mb-4">
        <button id="todayBtn" onClick={handleTodayClick} className="bg-gray-300 p-2 rounded ">
          Today
        </button>
        <button id="prevBtn" onClick={handlePrevClick} className="bg-gray-300 p-2 rounded">
          Prev
        </button>
        <div id="monthYear" className="text-lg font-bold"></div>
        <button id="nextBtn" onClick={handleNextClick} className="bg-gray-300 p-2 rounded">
          Next
        </button>
        </div>

        {/* Calendar Dates */}
        <div className = "w-full h-full">
        <div className="grid grid-cols-7 gap-2 text-center">
            {days.map((day) => (
                <div key={day} className="date font-bold">{day}</div>
            ))}
        </div>
            <div id="dates" className="grid grid-cols-7 gap-2 text-center" dangerouslySetInnerHTML={{ __html: datesHTML }}></div>
        </div> 
    </div>
  );
};

export default Calendar;
