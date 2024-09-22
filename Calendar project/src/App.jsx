import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/Navbar-top';
import EventBar from './components/Eventbar-left';
import Calendar from './components/Calendar';
import CalendarWeek from './components/Calendar-week';
import './index.css'; // Import Tailwind CSS file

// Component to wrap the main content logic
function MainContent({ events, addEvent }) {
  const location = useLocation();

  // Check if the current route is "/Calendar-week"
  const isCalendarWeek = location.pathname === '/Calendar-week';

  return (
    <div>
      {/* Conditionally render Part 2 based on the route */}
      {!isCalendarWeek && (
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
      )}
      
      {/* Calendar-week content is shown through routing */}
      <Routes>
        <Route path="/Calendar-week" element={<CalendarWeek events={events} />} />
        <Route path="/about" element={<div>About Page</div>} />
        <Route path="/contact" element={<div>Contact Page</div>} />
      </Routes>
    </div>
  );
}

function App() {
  const [events, setEvents] = useState([]);

  const addEvent = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  return (
    <div className="h-screen w-screen">
      {/* Part 1: NavBar at the top */}
      <div className="w-full">
        <Router>
          <NavBar />
          {/* Main Content with conditional rendering */}
          <MainContent events={events} addEvent={addEvent} />
        </Router>
      </div>
    </div>
  );
}

export default App;
