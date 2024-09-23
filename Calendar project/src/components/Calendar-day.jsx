import React, { useState } from 'react';

const CalendarDay = ({ events }) => {
  const [selectedDay, setSelectedDay] = useState(new Date()); // Start with the current day

  const formatDate = (date) => date.toDateString();

  const groupEventsByDate = () => {
    let groupedEvents = {};
    groupedEvents[formatDate(selectedDay)] = events.filter((event) => {
      const eventDate = new Date(event.date).toDateString();
      return eventDate === formatDate(selectedDay);
    });
    return groupedEvents;
  };

  const groupedEvents = groupEventsByDate();

  const generateTimeSlots = () => {
    let slots = [];
    for (let i = 0; i < 24; i++) {
      const timeLabel = i < 10 ? `0${i}:00` : `${i}:00`;
      slots.push(timeLabel);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const getEventPosition = (event) => {
    const startHour = new Date(`1970-01-01T${event.startTime}:00`).getHours();
    const endHour = new Date(`1970-01-01T${event.endTime}:00`).getHours();
    const duration = endHour - startHour;
    return { startHour, duration };
  };

  const handlePrevDay = () => {
    setSelectedDay(new Date(selectedDay.setDate(selectedDay.getDate() - 1)));
  };

  const handleNextDay = () => {
    setSelectedDay(new Date(selectedDay.setDate(selectedDay.getDate() + 1)));
  };
 
  return (

    <div className="w-full h-full p-4 ">
      {/* Header with Prev/Next buttons */}
      <div className="mb-5 flex items-center justify-center text-center space-x-10">
        <button onClick={handlePrevDay} className="hover:text-red-500">Prev</button>
        <span className="text-2xl font-bold px-4 py-2 w-64">
          {selectedDay.toLocaleString('default', { weekday: 'long' })}, {selectedDay.getDate()} {selectedDay.toLocaleString('default', { month: 'long' })} {selectedDay.getFullYear()}
        </span>
        <button onClick={handleNextDay} className="hover:text-red-500">Next</button>
      </div>


      <div className="grid grid-cols-12 gap-5 ">
        {/* Left side: Time slots with hour separator lines */}
        <div className="col-span-2 border-r pr-4 relative">
          <div className="space-y-2">
            {timeSlots.map((slot, index) => (
              <div key={index} className="relative">
                <div className="text-sm text-gray-500">{slot}</div>
                <div className="border-t border-gray-300 absolute left-0 w-full top-full"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right side: Events grid with hour separator lines */}
        <div className="col-span-10 relative">
          {/* Hour separator lines */}
          {timeSlots.map((_, index) => (
            <div
              key={index}
              className="border-t border-gray-300 absolute left-0 w-full"
              style={{ top: `${index * 4}rem` }}
            ></div>
          ))}

          {/* Show events at the correct time slot */}
          {groupedEvents[formatDate(selectedDay)] &&
            groupedEvents[formatDate(selectedDay)].map((event, index) => {
              const { startHour, duration } = getEventPosition(event);
              return (
                <div
                  key={index}
                  className="absolute bg-red-500 text-white p-2 rounded"
                  style={{ top: `${startHour * 4}rem`, height: `${duration * 4}rem`, width: '100%' }}
                >
                  <p className="font-semibold">{event.name}</p>
                  <p className="text-sm">{event.startTime} - {event.endTime}</p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CalendarDay;
