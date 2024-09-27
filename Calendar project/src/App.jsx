import React, { useState, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import NavBar from './components/Navbar-top';
import EventBar from './components/Eventbar-left';
import Calendar from './components/Calendar';
import CalendarWeek from './components/Calendar-week';
import CalendarDay from './components/Calendar-day';
import useAppointments from './hooks/useAppointments';


// Component to wrap the main content logic
function MainContent({ events, addEvent }) {
  return (
    <div>
      {/* Grid layout for pages that aren't Calendar-week */}
      <Routes>
        <Route 
          path="/" 
          element={
            <div className="grid grid-cols-12 gap-5 p-4 ">
              <div className="col-span-3">
                <EventBar events={events} onAddEvent={addEvent} />
              </div>
              <div className="col-span-9">
                <Calendar events={events} />
              </div>
            </div>
          } 
        />
        {/* Calendar-week and other pages */}
        <Route path="/Calendar-week" element={<CalendarWeek events= {events}/>}/>
        <Route path = "/Calendar" element = {<Calendar events = {events}/>} />
        <Route path="/Calendar-day" element={<CalendarDay events = {events}/>}/>
      </Routes>
    </div>
  );
}


function App() {
  const [events, setEvents] = useState([]);

  const {getAppointments, addAppointment, deleteAppointment} = useAppointments();

  useEffect(() => {
    getAppointments()
    .then((data) => {
      setEvents(data)
    })
    
  }, [deleteAppointment, addAppointment]);



  const addEvent = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);

    addAppointment(event)

  };

  const handleDateClick = (date) => {
    console.log(date);
  }


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
