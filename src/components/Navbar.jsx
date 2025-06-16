import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left side - Logo and main links */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/events" 
              className="flex items-center space-x-2 text-xl font-bold"
            >
              <span className="text-2xl"></span>
              <span>EventHub</span>
            </Link>
            
            <div className="hidden md:flex items-center space-x-4 ml-6">
              <Link 
                to="/events" 
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Events
              </Link>
              {user && (
                <Link 
                  to="/create" 
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Create Event
                </Link>
              )}
            </div>
          </div>

          {/* Right side - Auth links */}
          <div className="flex items-center">
            {user ? (
              <div className="relative ml-3">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 max-w-xs rounded-full focus:outline-none"
                  id="user-menu"
                  aria-expanded="false"
                  aria-haspopup="true"
                >
                  <span className="sr-only">Open user menu</span>
                  <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                    {user?.name?.charAt(0)}
                  </div>
                  <span className="hidden md:inline-block">{user.name}</span>
                </button>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div 
                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu"
                  >
                    <button
                      onClick={() => {
                        logout();
                        setIsDropdownOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                    >
                      Sign out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2 rounded-md text-sm font-medium bg-blue-500 hover:bg-blue-700 transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu (hidden on larger screens) */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            to="/events"
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
          >
            Events
          </Link>
          {user && (
            <Link
              to="/create"
              className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-700"
            >
              Create Event
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;