import { useEffect, useState } from 'react';

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
      {/* <button
        onClick={toggleDarkMode}
        className="mt-4 p-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 transition"
      >
        {isDarkMode ? "🌙" : "☀️"}
      </button> */}
    </header>
  );
};

export default Header;
