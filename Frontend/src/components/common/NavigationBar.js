import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-500 p-4">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="text-white font-bold text-lg">
            HandWrite2Type
          </div>
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
                )}
              </svg>
            </button>
          </div>
          <div className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} md:h-auto md:overflow-y-auto md:w-auto`}>
            <div className="md:flex md:items-center">
              <Link to="/" className="text-white mr-4" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/text-conversion" className="text-white mr-4" onClick={() => setIsMenuOpen(false)}>Document Conversion</Link>
              <Link to="/font-generator" className="text-white mr-4" onClick={() => setIsMenuOpen(false)}>Font Generator</Link>
              <Link to="/dashboard" className="text-white" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavigationBar;
