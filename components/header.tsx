import { useEffect, useState } from 'react';
import { FaMoon, FaSun } from 'react-icons/fa';

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
    <header className="text-center mb-8 fade-in">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 dark:from-indigo-400 dark:to-indigo-500 bg-clip-text text-transparent mb-2">
        برنامه هفتگی صنایع
      </h1>
      <p className="text-gray-600 dark:text-gray-200">ترم اول ۱۴۰۴-۱۴۰۳</p>
      <button
        onClick={toggleDarkMode}
        aria-label='Toggle Dark Mode'
        className="absolute top-0 left-0 m-6 p-2 z-50 bg-gray-100 dark:bg-gray-900 rounded-full shadow-lg hover:bg-gray-300 dark:hover:bg-gray-700 transition duration-100 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        {isDarkMode ? <FaMoon/> : <FaSun/>}
      </button>
    </header>
  );
};

export default Header;
