import React from 'react';


const NavBar = () => {

  return (
    <nav className=" p-4">
      <div className="container mx-auto flex justify-between items-center overflow-hidden">
        {/* Brand Logo */}
        <div className=" text-2xl font-bold font-extrabold hover:text-red text-3xl">
          <a href="/">Calendar</a>
        </div>
        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <a href="/about" className="text-gray-400 hover:text-gray-200">
              Year
            </a>
          </li>
          <li>
            <a href="/services" className="text-gray-400 hover:text-gray-200 ">
              Week
            </a>
          </li>
          <li>
            <a href="/contact" className="text-gray-400 hover:text-gray-200">
              Day
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
