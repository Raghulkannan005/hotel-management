import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { isAuthenticated, logoutUser, getCurrentUser } from '../services/authService';

const Nav = ({ isDashboard = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  
  // Check if current page is landing page
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // Only apply scroll-based background on landing page
      if (isLandingPage) {
        setIsScrolled(window.scrollY > 10);
      } else {
        // Always show background on other pages
        setIsScrolled(true);
      }
    };
    
    const checkAuthStatus = () => {
      const authStatus = isAuthenticated();
      setIsLoggedIn(authStatus);
      if (authStatus) {
        setUser(getCurrentUser());
      }
    };
    
    // Set initial scroll state
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    
    // Check auth status on mount and whenever localStorage changes
    checkAuthStatus();
    window.addEventListener('storage', checkAuthStatus);
    
    // Close mobile menu when route changes
    setIsMobileMenuOpen(false);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', checkAuthStatus);
    };
  }, [location.pathname, isLandingPage]);
  
  const handleLogout = () => {
    logoutUser();
    setIsLoggedIn(false);
    setUser(null);
    setIsMobileMenuOpen(false);
    window.location.href = '/';
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-gradient-to-r from-purple-900 to-indigo-800 shadow-lg py-2' : 'bg-transparent py-4'}`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className={`font-serif text-2xl font-bold text-white ${isScrolled ? '' : 'drop-shadow-md'}`}>
            Zorp <span className="text-amber-400">Hotel</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className={`text-white hover:text-amber-300 font-medium transition-colors text-sm uppercase tracking-wider`}>Home</Link>
          <Link to="/about" className={`text-white hover:text-amber-300 font-medium transition-colors text-sm uppercase tracking-wider`}>About</Link>
          <Link to="/contact" className={`text-white hover:text-amber-300 font-medium transition-colors text-sm uppercase tracking-wider`}>Contact</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className={`text-white hover:text-amber-300 font-medium transition-colors text-sm uppercase tracking-wider`}>Dashboard</Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className={`text-white hover:text-amber-300 font-medium transition-colors text-sm uppercase tracking-wider`}>Admin Panel</Link>
              )}
              <button
                onClick={handleLogout}
                className="bg-amber-500 text-indigo-900 px-5 py-2 rounded-md hover:bg-amber-400 transition-colors font-medium text-sm uppercase tracking-wider shadow-md hover:shadow-lg"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={`text-white hover:text-amber-300 font-medium transition-colors text-sm uppercase tracking-wider`}>Login</Link>
              <Link to="/booking" className="bg-amber-500 text-indigo-900 px-5 py-2 rounded-md hover:bg-amber-400 transition-colors font-medium text-sm uppercase tracking-wider shadow-md hover:shadow-lg">Book Now</Link>
            </>
          )}
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu with improved animation */}
      <div 
        className={`md:hidden fixed top-[60px] left-0 right-0 bg-gradient-to-r from-purple-900 to-indigo-800 shadow-lg transition-all duration-300 overflow-hidden z-40 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="px-4 py-2 space-y-3">
          <Link to="/" className="block text-white hover:text-amber-300 font-medium py-2 text-sm uppercase tracking-wider" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link to="/about" className="block text-white hover:text-amber-300 font-medium py-2 text-sm uppercase tracking-wider" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
          <Link to="/contact" className="block text-white hover:text-amber-300 font-medium py-2 text-sm uppercase tracking-wider" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="block text-white hover:text-amber-300 font-medium py-2 text-sm uppercase tracking-wider" onClick={() => setIsMobileMenuOpen(false)}>Dashboard</Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="block text-white hover:text-amber-300 font-medium py-2 text-sm uppercase tracking-wider" onClick={() => setIsMobileMenuOpen(false)}>Admin Panel</Link>
              )}
              <button
                onClick={handleLogout}
                className="block w-full text-left text-white hover:text-amber-300 font-medium py-2 text-sm uppercase tracking-wider"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block text-white hover:text-amber-300 font-medium py-2 text-sm uppercase tracking-wider" onClick={() => setIsMobileMenuOpen(false)}>Login</Link>
              <Link to="/booking" className="block bg-amber-500 text-indigo-900 px-4 py-2 rounded-md hover:bg-amber-400 text-center font-medium my-2 text-sm uppercase tracking-wider shadow-md" onClick={() => setIsMobileMenuOpen(false)}>Book Now</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;