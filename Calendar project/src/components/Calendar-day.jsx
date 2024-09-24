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
          <span>0{i}:00</span>
          <br />
          <br />
          <br />
          <span>0{i}:30</span>
        </>
      ) : (
        <>
          <span>{i}:00</span>
          <br />
          <br />
          <br />
          <span>{i}:30</span>
          {i===23 && <span> <br /> <br /> <br /> 00:00</span> }
        </>
      );
      slots.push(timeLabel);
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  function getEventPosition(event) {
    const startHour = new Date(event.startTime).getHours(); // ดึงค่า start hour
    const endHour = new Date(event.endTime).getHours(); // ดึงค่า end hour
    const duration = endHour - startHour; // คำนวณระยะเวลา

    return { startHour, duration };
  }

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
        <span className="text-2xl font-bold px-4 py-2 w-56">
          {selectedDay.toLocaleString('default', { weekday: 'long' })}, 
          {selectedDay.getDate()} {selectedDay.toLocaleString('default', 
          { month: 'long' })} {selectedDay.getFullYear()}
        </span>
        <button onClick={handleNextDay} className="hover:text-red-500">Next</button>
      </div>


      <div className="grid grid-cols-12 gap-5 ">
        
        <div className="col-span-12 relative w-full ">
          {/* Hour separator lines */}
          <div className="space-y-10 pl-2 pt-1 ">
            {timeSlots.map((slot, index) => (
              <div key={index} className="relative w-full">
                <div className="text-sm text-gray-500 h-30">{slot}</div>
              </div>
              
            ))}
          </div>
          {timeSlots.map((_, index) => (
            <div
              key={index}
              className="border-t border-gray-300 absolute left-0 w-full"
              style={{ top: `${index * 3}rem`, height: '1px'  }} // ปรับความสูงของเส้น
            ></div>
          ))}

          {/* Show events at the correct time slot */}
          {groupedEvents[formatDate(selectedDay)] &&
            groupedEvents[formatDate(selectedDay)].map((event, index) => {
              const { startHour, duration } = getEventPosition(event); // คำนวณตำแหน่ง event
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
