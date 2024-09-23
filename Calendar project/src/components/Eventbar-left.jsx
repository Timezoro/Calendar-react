import React, { useState } from 'react';
import Button from '@mui/material/Button';
const EventBar = ({ events, onAddEvent }) => {
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTimeStart, setEventTimeStart] = useState('');
  const [eventTimeEnd, setEventTimeEnd] = useState('');
  const [eventDesciption,setEventDesciption] = useState('');
  const handleAddEvent = () => {
    if (eventName && eventDate && eventTimeStart && eventTimeEnd) {
      onAddEvent({ name: eventName, date: eventDate, time_start: eventTimeStart, time_end: eventTimeEnd,desc: eventDesciption });
      setEventName('');
      setEventDate('');
      setEventTimeStart('');
      setEventTimeEnd('');
      setEventDesciption('')
      setShowAddEventForm(false);  // Hide the form after adding an event
    }
  };

  return (
    <div className="p-5 bg-gray-200 rounded-lg shadow-md h-50 ">
      <h2 className="text-xl font-bold mb-2">Scheduled Events</h2>
      {/* Show Add Event Form or List of Events */}
      {showAddEventForm ? (
        <div>
          <strong>Name</strong>
          <input
            type="text"
            placeholder="Event Name"
            className="p-2 border rounded mb-2 w-full"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <strong>Date</strong>
          <input
            type="date"
            className="p-2 border rounded mb-2 w-full"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
          <strong>Start</strong>
          <input
            type="time"
            className="p-2 border rounded mb-2 w-full"
            value={eventTimeStart}
            onChange={(e) => setEventTimeStart(e.target.value)}
            />
          <strong>End</strong>
          <input
            type="time"
            className="p-2 border rounded mb-2 w-full"
            value={eventTimeEnd}
            onChange={(e) => setEventTimeEnd(e.target.value)}
          />
          <strong>Note</strong>
          <input
              type="text"
              placeholder="Description"
              className="p-2 border rounded mb-2 w-full"
              value={eventDesciption}
              onChange={(e) => setEventDesciption(e.target.value)}  // Corrected "onChange"
          />
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mt-2 w-full hover:bg-slate-600"
            onClick={handleAddEvent}
          >
            Add Event
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded mt-2 w-full"
            onClick={() => setShowAddEventForm(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          {events.length === 0 ? (
            <p className="text-gray-500">No events scheduled.</p>
          ) : (
            <ul className="mt-4 ">
              {events.map((event, index) => (
                <li key={index} className="border-b border-gray-300 py-2 h-full hover:shadow-md cursor-pointer">
                  <strong class= "">{event.name}</strong>  <span className = "font-semibold">{event.date} </span> <br /> <span>at {event.time_start} until {event.time_end}</span>
                </li>
              ))}
            </ul>
          )}
          <button
            className="bg-red-600 text-white px-4 py-2 rounded mt-4 w-full hover:bg-neutral-600 "
            onClick={() => setShowAddEventForm(true)}
          >
            Add Event
          </button>
        </div>
      )}
    </div>
  );
};

export default EventBar;
