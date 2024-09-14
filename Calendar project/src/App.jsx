import React, { useState } from 'react';
import NavBar from './components/Navbar-top';
import EventBar from './components/Eventbar-left';
import Calendar from './components/Calendar';
import './index.css'; // Import Tailwind CSS file

function App() {
  const [events, setEvents] = useState([]);

  const addEvent = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  return (
    <div className="max-h-full">
      {/* NavBar at the top */}
      <NavBar />
      {/* Main content area with grid layout */}
      <div className="grid grid-cols-12 gap-4 p-4">
        {/* EventBar on the left (col-span-3) */}
        <div className="col-span-3">
          <EventBar events={events} onAddEvent={addEvent} />
        </div>

        {/* Calendar in the main section (col-span-9) */}
        <div className="col-span-9">
          <Calendar events={events} />
        </div>
      </div>
    </div>
  );
}

export default App;
