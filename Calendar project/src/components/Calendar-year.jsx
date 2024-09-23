import React from 'react';

const CalendarYear = ({ events }) => {
  const currentYear = new Date().getFullYear();

  // Generate an array of months
  const getMonthDates = () => {
    const months = [];
    for (let month = 0; month < 12; month++) {
      const firstDayOfMonth = new Date(currentYear, month, 1);
      const daysInMonth = new Date(currentYear, month + 1, 0).getDate(); // Last day of the month
      const days = [];
      
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, month, day);
        days.push({
          dayNumber: day,
          fullDate: date.toDateString(),
        });
      }
      
      months.push({
        monthName: firstDayOfMonth.toLocaleString('default', { month: 'long' }),
        days,
      });
    }
    return months;
  };

  const months = getMonthDates();

  const groupEventsByDate = () => {
    let groupedEvents = {};
    months.forEach((month) => {
      month.days.forEach((day) => {
        groupedEvents[day.fullDate] = events.filter((event) => {
          const eventDate = new Date(event.date).toDateString();
          return eventDate === day.fullDate;
        });
      });
    });
    return groupedEvents;
  };

  const groupedEvents = groupEventsByDate();

  return (
    <div className="w-full h-full p-4 grid grid-cols-4 gap-6">
      {months.map((month, monthIndex) => (
        <div key={monthIndex} className="border p-4">
          <h2 className="text-xl font-bold mb-4 text-center">{month.monthName}</h2>
          <div className="grid grid-cols-7 gap-2">
            {/* Days of the week headers */}
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={index} className="text-center font-semibold">{day}</div>
            ))}

            {/* Render each day of the month */}
            {month.days.map((day, dayIndex) => (
              <div key={dayIndex} className="h-12 w-12 p-1 border text-center relative">
                <p>{day.dayNumber}</p>
                {/* Show a small dot if there are events on that day */}
                {groupedEvents[day.fullDate] && groupedEvents[day.fullDate].length > 0 && (
                  <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                    {groupedEvents[day.fullDate].map((event, eventIndex) => (
                      <span key={eventIndex} className="w-2 h-2 bg-red-500 rounded-full block"></span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CalendarYear;
