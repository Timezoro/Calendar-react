import React from 'react';


const NavBar = () => {



  return (
    <nav className=" p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <div className="text-white text-2xl font-bold font-extrabold">
          <a href="/" className ="hover:text-gray">Calendar</a>
        </div>
        {/* Navigation Links */}
        <ul className="flex space-x-6">
          <li>
            <a href="/about" className="text-gray-300 hover:text-white">
              About
            </a>
          </li>
          <li>
            <a href="/services" className="text-gray-300 hover:text-white">
              Services
            </a>
          </li>
          <li>
            <a href="/contact" className="text-gray-300 hover:text-white">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
