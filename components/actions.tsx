import { Dispatch, SetStateAction } from 'react';
import { saveGenderToLocalStorage } from '../lib/storage';
import { FaFemale, FaMale } from 'react-icons/fa';

interface ActionsProps {
  gender: 'boys' | 'girls';
  setGender: Dispatch<SetStateAction<'boys' | 'girls'>>;
}

const Actions: React.FC<ActionsProps> = ({ gender, setGender }) => {
  const handleGenderChange = (gender: 'boys' | 'girls') => {
    saveGenderToLocalStorage(gender);
    setGender(gender);
  };

  return (
    <div className="flex justify-center space-x-4 rtl:space-x-reverse mb-8 fade-in">
      <button
        className={`px-6 py-3 rounded-full flex transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 soft-shadow  shadow-lg scale-105 ${
          gender === 'girls'
            ? 'gradient-indigo text-white shadow-lg scale-105'
            : 'glass-effect text-gray-600 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-700/80'
        }`}
        onClick={() => handleGenderChange('girls')}
      >
        <FaFemale className="ml-2 my-auto font-semibold" />
        <span>دختران</span>
      </button>
      <button
        className={`px-6 py-3 rounded-full flex transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 soft-shadow shadow-lg scale-105 ${
          gender === 'boys'
            ? 'gradient-indigo text-white shadow-lg scale-105'
            : 'glass-effect text-gray-600 dark:text-gray-300 hover:bg-white/80 dark:hover:bg-gray-700/80'
        }`}
        onClick={() => handleGenderChange('boys')}
      >
        <FaMale className="ml-2 my-auto font-semibold" />
        <span>پسران</span>
      </button>
    </div>
  );
};

export default Actions;
