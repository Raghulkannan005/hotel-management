import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuthenticated, logoutUser } from '../services/authService';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    const checkAuthStatus = () => {
      setIsLoggedIn(isAuthenticated());
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Check auth status on mount and whenever localStorage changes
    checkAuthStatus();
    window.addEventListener('storage', checkAuthStatus);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, []);
  
  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setIsMobileMenuOpen(false);
    window.location.href = '/';
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className={`font-serif text-2xl font-bold ${isScrolled ? 'text-indigo-800' : 'text-white'}`}>
            Zorp Hotel
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-indigo-600 font-medium transition-colors`}>Home</Link>
          <Link to="/about" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-indigo-600 font-medium transition-colors`}>About</Link>
          <Link to="/contact" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-indigo-600 font-medium transition-colors`}>Contact</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-indigo-600 font-medium transition-colors`}>Dashboard</Link>
              <button
                onClick={handleLogout}
                className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition-colors font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-indigo-600 font-medium transition-colors`}>Login</Link>
              <Link to="/booking" className="bg-indigo-600 text-white px-5 py-2 rounded-md hover:bg-indigo-700 transition-colors font-medium">Book Now</Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg className={`w-6 h-6 ${isScrolled ? 'text-gray-800' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-4 py-2 space-y-3">
            <Link to="/" className="block text-gray-800 hover:text-indigo-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link to="/about" className="block text-gray-800 hover:text-indigo-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link to="/contact" className="block text-gray-800 hover:text-indigo-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            
            {isLoggedIn ? (
              <>
                <Link to="/dashboard" className="block text-gray-800 hover:text-indigo-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left text-gray-800 hover:text-indigo-600 font-medium"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block text-gray-800 hover:text-indigo-600 font-medium" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
                <Link to="/booking" className="block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center font-medium" onClick={() => setIsMobileMenuOpen(false)}>Book Now</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;