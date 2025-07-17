import { useState } from 'react';
import { NavLink } from 'react-router';
import { FaBars, FaTimes } from 'react-icons/fa';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white  border-b">
      <div className="container mx-auto px-4 py-4 md:px-8 flex justify-between items-center">
        <NavLink to="/" className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <img className="h-8" src="./logo.png" alt="Butterfly Logo" />
          <span>Butterfly</span>
        </NavLink>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-600 hover:text-blue-600 focus:outline-none">
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
        <div className={`md:flex md:space-x-6 ${isOpen ? 'block' : 'hidden'} md:block absolute md:static top-16 left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none p-4 md:p-0`}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block md:inline-block py-2 md:py-0 text-gray-600 hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold underline underline-offset-4' : ''}`
            }
            onClick={() => setIsOpen(false)}
          >
            All Books
          </NavLink>
          <NavLink
            to="/add-book"
            className={({ isActive }) =>
              `block md:inline-block py-2 md:py-0 text-gray-600 hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold underline underline-offset-4' : ''}`
            }
            onClick={() => setIsOpen(false)}
          >
            Add Book
          </NavLink>
          <NavLink
            to="/borrow-summary"
            className={({ isActive }) =>
              `block md:inline-block py-2 md:py-0 text-gray-600 hover:text-blue-600 ${isActive ? 'text-blue-600 font-semibold underline underline-offset-4' : ''}`
            }
            onClick={() => setIsOpen(false)}
          >
            Borrow Summary
          </NavLink>
        </div>
      </div>
    </nav>
  );
}