import React, { useState } from 'react';

const CalendarWeek = ({ events }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0); // New state to track week offset

  const currentDate = new Date();

  const getWeekDates = () => {
    const startOfWeek = currentDate.getDate() - currentDate.getDay() + currentWeekOffset * 7; // Adjust week by offset
    let dates = [];
    for (let i = 0; i < 7; i++) {
      let date = new Date(currentDate);
      date.setDate(startOfWeek + i);
      dates.push({
        dayName: date.toLocaleString('default', { weekday: 'long' }), // Day name
        dayNumber: date.getDate(), // Day number
        fullDate: date.toDateString(), // Full date
      });
    }
    return dates;
  };

  const weekDates = getWeekDates();

  const groupEventsByDate = () => {
    let groupedEvents = {};
    weekDates.forEach((day) => {
      groupedEvents[day.fullDate] = events.filter((event) => {
        const eventDate = new Date(event.date).toDateString();
        return eventDate === day.fullDate;
      });
    });
    return groupedEvents;
  };

  const groupedEvents = groupEventsByDate();

  const handleDayClick = (day) => {
    setSelectedDay(day);
  };

  const handlePrevWeek = () => {
    setCurrentWeekOffset(currentWeekOffset - 1); // Move to previous week
  };

  const handleNextWeek = () => {
    setCurrentWeekOffset(currentWeekOffset + 1); // Move to next week
  };

  return (
    <div className="w-full h-full p-4">
      {/* Navigation buttons for week */}
      <div className="flex justify-between mb-4">
        <button onClick={handlePrevWeek} className="hover:text-red-500 ">Prev </button>
        <h2 className="text-2xl font-bold">Week of {weekDates[0].dayName}, {weekDates[0].dayNumber}</h2>
        <button onClick={handleNextWeek} className="hover:text-red-500">Next </button>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Left side: Schedule for the selected day */}
        <div className="col-span-3 pr-4 ">
          {selectedDay ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Schedule on {selectedDay.dayName}, {selectedDay.dayNumber}</h2>
              <div className="space-y-2">
                {groupedEvents[selectedDay.fullDate] && groupedEvents[selectedDay.fullDate].length > 0 ? (
                  groupedEvents[selectedDay.fullDate].map((event, index) => (
                    <div key={index} className="bg-gray-100 p-2 rounded">
                      <p className="font-semibold">{event.name}</p>
                      <p className="text-sm">{event.startTime} - {event.endTime}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No events</p>
                )}
              </div>
            </>
          ) : (
            <h2 className="text-xl font-semibold">Select a day to view the schedule</h2>
          )}
        </div>

        {/* Right side: Weekdays grid */}
        <div className="col-span-9 grid grid-cols-7 gap-5 ">
          {weekDates.map((day, index) => (
            <div
              key={index}
              className={`pt-4 cursor-pointer ${selectedDay === day ? 'bg-blue-200 border-blue-500 ' : 'hover:shadow-md '}`}
              onClick={() => handleDayClick(day)}
            >
              <h3 className="text-lg font-bold mb-2 ">{day.dayName}</h3>
              <p className="text-sm">{day.dayNumber}</p>

              {/* Show multiple dots if there are multiple events */}
              <div className="flex justify-center items-center space-x-1 mt-2 ">
                {groupedEvents[day.fullDate] && groupedEvents[day.fullDate].length > 0 ? (
                  groupedEvents[day.fullDate].map((_, dotIndex) => (
                    <span key={dotIndex} className="w-2 h-2 bg-red-500 rounded-full"></span>
                  ))
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarWeek;
