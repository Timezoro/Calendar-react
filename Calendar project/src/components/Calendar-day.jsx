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
      const timeLabel = i < 10 ? (
        <>
          <span className="w-full inline-block border-b-2 border-gray-300 hover:text-red-500">0{i}:00</span>
          <br />
          <br />
          <br />
          <span className="w-full inline-block border-b-2 border-gray-100 hover:text-red-500">0{i}:30</span>
        </>
      ) : (
        <>
          <span className="w-full inline-block border-b-2 border-gray-300 hover:text-red-500">{i}:00</span>
          <br />
          <br />
          <br />
          <span className="w-full inline-block border-b-2 border-gray-100 hover:text-red-500">{i}:30</span>
          {i === 23 && (
            <span>
              <br />
              <br />
              <br />
              <span className="w-full inline-block border-b-2 border-gray-300 ">00:00</span>
            </span>
          )}
        </>
      );
      slots.push(timeLabel);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const getEventPosition = (event) => {
    const startTime = new Date(`1970-01-01T${event.startTime}:00`);
    const endTime = new Date(`1970-01-01T${event.endTime}:00`);

    const startHour = startTime.getHours();
    const startMinute = startTime.getMinutes();

    const endHour = endTime.getHours();
    const endMinute = endTime.getMinutes();

    // Calculate the top position based on hours and minutes
    const topPosition = startHour * 4 + (startMinute / 60) * 4; // 4rem per hour

    // Calculate the event duration (in hours and minutes)
    const durationHours = endHour - startHour;
    const durationMinutes = (endMinute - startMinute) / 60;
    const eventHeight = (durationHours + durationMinutes) * 4; // 4rem per hour

    return { topPosition, eventHeight };
  };

  const handlePrevDay = () => {
    setSelectedDay(new Date(selectedDay.setDate(selectedDay.getDate() - 1)));
  };

  const handleNextDay = () => {
    setSelectedDay(new Date(selectedDay.setDate(selectedDay.getDate() + 1)));
  };

  return (
    <div className="w-full h-full p-4">
      {/* Header with Prev/Next buttons */}
      <div className="mb-5 flex items-center justify-center text-center space-x-10">
        <button onClick={handlePrevDay} className="hover:text-red-500">Prev</button>
        <span className="text-2xl font-bold px-4 py-2 w-56">
          {selectedDay.toLocaleString('default', { weekday: 'long' })}, 
          {selectedDay.getDate()} {selectedDay.toLocaleString('default', 
          { month: 'long' })} {selectedDay.getFullYear()}
        </span>
        <button onClick={handleNextDay} className="hover:text-red-500">Next</button>
      </div>

      <div className="grid grid-cols-12 gap-5">
        <div className="col-span-12 relative w-full">
          {/* Time slots */}
          <div className="space-y-10 pl-2 pt-1">
            {timeSlots.map((slot, index) => (
              <div key={index} className="relative w-full">
                <div className="text-sm text-gray-500 h-30">{slot}</div>
              </div>
            ))}
          </div>

          {/* Show events at the correct time slot */}
          {groupedEvents[formatDate(selectedDay)] &&
            groupedEvents[formatDate(selectedDay)].map((event, index) => {
              const { topPosition, eventHeight } = getEventPosition(event); // Calculate event position and height
              return (
                <div
                  key={index}
                  className="absolute bg-red-500 text-white p-2 rounded"
                  style={{
                    top: `${topPosition}rem`, // Set top position based on time
                    height: `${eventHeight}rem`, // Set height based on duration
                    width: '100%',
                  }}
                >
                  <p className="font-semibold">{event.name}</p>
                  <p className="text-sm">
                    {event.startTime} - {event.endTime}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default CalendarDay;
