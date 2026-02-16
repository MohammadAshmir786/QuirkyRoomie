import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-linear-to-r from-indigo-700 via-indigo-800 to-indigo-900 shadow-lg-custom backdrop-blur-sm bg-opacity-95">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="text-2xl transform group-hover:scale-110 transition duration-300">🏠</div>
          <span className="text-2xl font-bold bg-linear-to-r from-yellow-300 to-red-200 bg-clip-text text-transparent group-hover:from-yellow-200 group-hover:to-red-100 transition">
            QuirkyRoomie
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 list-none items-center">
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/complaints" className="relative text-sm font-semibold text-white hover:text-yellow-300 transition duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:top-5 after:ms-6 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-[75%]">
                  📝 Complaints
                </Link>
              </li>
              <li>
                <Link to="/leaderboard" className="relative text-sm font-semibold text-white hover:text-yellow-300 transition duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:top-5 after:ms-6 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-[75%]">
                  🏆 Leaderboard
                </Link>
              </li>
              <li>
                <Link to="/stats" className="relative text-sm font-semibold text-white hover:text-yellow-300 transition duration-300 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:top-5 after:ms-6 after:bg-yellow-300 after:transition-all after:duration-300 hover:after:w-[75%]">
                  📊 Stats
                </Link>
              </li>
              <li className="border-l-2 border-indigo-400 pl-8 ml-4">
                <span className="text-sm font-semibold text-yellow-300 flex items-center gap-2">
                  👤 <span className="text-white">{user?.username}</span>
                </span>
              </li>
              <li>
                <button 
                  onClick={handleLogout}
                  className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition transform hover:scale-105 shadow-medium hover:shadow-lg-custom"
                >
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="text-sm font-semibold text-white hover:text-yellow-300 transition duration-300">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="px-5 py-2 bg-white text-indigo-700 rounded-lg font-semibold hover:bg-yellow-100 transition transform hover:scale-105 shadow-medium hover:shadow-lg-custom">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white text-2xl font-bold hover:text-yellow-300 transition"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-indigo-800 border-t border-indigo-700 animate-slideDown">
          <ul className="flex flex-col gap-4 px-6 py-4 list-none">
            {isAuthenticated ? (
              <>
                <li>
                  <Link to="/complaints" className="block text-sm font-semibold text-white hover:text-yellow-300 transition py-2">
                    📝 Complaints
                  </Link>
                </li>
                <li>
                  <Link to="/leaderboard" className="block text-sm font-semibold text-white hover:text-yellow-300 transition py-2">
                    🏆 Leaderboard
                  </Link>
                </li>
                <li>
                  <Link to="/stats" className="block text-sm font-semibold text-white hover:text-yellow-300 transition py-2">
                    📊 Stats
                  </Link>
                </li>
                <li>
                  <span className="block text-sm font-semibold text-yellow-300 py-2">👤 {user?.username}</span>
                </li>
                <li>
                  <button 
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" className="block text-sm font-semibold text-white hover:text-yellow-300 transition py-2">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="block px-4 py-2 bg-white text-indigo-700 rounded-lg font-semibold hover:bg-yellow-100 transition text-center">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
