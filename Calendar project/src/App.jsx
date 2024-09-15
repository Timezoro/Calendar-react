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
    <div className="max-h-full max-w-full">
      {/* Part 1: NavBar at the top */}
      <div className="w-full">
        <NavBar />
      </div>

      {/* Part 2: Main content area with grid layout */}
      <div className="grid grid-cols-12 gap-5 p-4">
        {/* Part 3: EventBar on the left */}
        <div className="col-span-3">
          <EventBar events={events} onAddEvent={addEvent} />
        </div>

        {/* Part 4: Calendar in the main section */}
        <div className="col-span-9">
          <Calendar events={events} />
        </div>
      </div>
    </div>
  );
}

export default App;
