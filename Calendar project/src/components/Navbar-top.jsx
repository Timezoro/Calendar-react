import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


const NavBar = () => {

  return (
    <nav className=" p-4 ">
      <div className="relative mx-auto flex justify-between items-center overflow-hidden">
        {/* Brand Logo */}
        <div className=" text-2xl font-bold font-extrabold hover:text-red-500 text-4xl transition-all duration-200 ease-in-out relative left-20 ">
          <a href="/">Calendar</a>
        </div>        
        {/* Navigation Links */}
        <ul className="flex space-x-6">

          <li>
            <Link to="/" className="text-gray-400 hover:text-gray-200">
              Month
            </Link>
          </li>
          <li>
            <Link to="/Calendar-week" className="text-gray-400 hover:text-gray-200">
              Week
            </Link>
          </li>
          <li>
            <Link to="/Calendar-day" className="text-gray-400 hover:text-gray-200">
              Day
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
