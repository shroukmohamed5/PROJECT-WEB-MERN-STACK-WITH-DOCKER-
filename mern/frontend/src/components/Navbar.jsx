import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-4 bg-white shadow-sm">
      <nav className="flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img
            alt="MongoDB logo"
            className="h-10 inline"
            src="https://raw.githubusercontent.com/mongodb-developer/mern-stack-example/603144e25ba5549159d1962601337652a7bfa253/mern/client/src/assets/mongodb.svg"
          />
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden sm:flex gap-3">
          <NavLink
            to="/create"
            className="inline-flex items-center justify-center text-md font-medium border border-gray-300 dark:border-gray-700 rounded-md px-3 h-9 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            Create Employee
          </NavLink>
          <NavLink
            to="/employees"
            className="inline-flex items-center justify-center text-md font-medium border border-gray-300 dark:border-gray-700 rounded-md px-3 h-9 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            View All Employees
          </NavLink>
        </div>

        {/* Mobile Hamburger */}
        <div className="sm:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-gray-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="sm:hidden mt-3 flex flex-col gap-2">
          <NavLink
            to="/create"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            Create Employee
          </NavLink>
          <NavLink
            to="/employees"
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors shadow-sm"
          >
            View All Employees
          </NavLink>
        </div>
      )}
    </div>
  );
}
