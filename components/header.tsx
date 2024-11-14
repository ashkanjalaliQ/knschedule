import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';
import Actions from './actions';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const darkModePreference = localStorage.getItem('darkMode');
    if (darkModePreference === 'true') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkModeValue = !isDarkMode;
    setIsDarkMode(newDarkModeValue);
    localStorage.setItem('darkMode', String(newDarkModeValue));

    if (newDarkModeValue) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div className="w-full py-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        {/* Top Bar with Actions and Dark Mode Toggle */}
        <div className="w-full bg-gradient-to-r from-indigo-600 to-indigo-700 backdrop-blur-sm">
          <div className="flex items-center justify-between h-16 px-6">
            <Actions/>
            <button
              onClick={toggleDarkMode}
              aria-label="Toggle Dark Mode"
              className="group p-2.5 rounded-full bg-white/10 hover:bg-white/20
                       transition-all duration-300 ease-in-out focus:outline-none flex items-center justify-center"
            >
              {isDarkMode ? (
                <FaMoon className="text-white text-lg transform transition-transform duration-300 group-hover:rotate-12" />
              ) : (
                <FaSun className="text-white text-lg transform transition-transform duration-300 group-hover:rotate-90" />
              )}
            </button>
          </div>
        </div>

        {/* Title Section */}
        <div className="w-full bg-white dark:bg-gray-900 py-8 px-6 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            برنامه هفتگی صنایع
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            ترم اول ۱۴۰۴-۱۴۰۳
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;