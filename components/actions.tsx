'use client'

import React, { useState, useEffect, useRef } from 'react';
import { FaFemale, FaMale } from 'react-icons/fa';
import { Pencil } from 'lucide-react';
import { useGender } from '@/lib/gender';

const Actions = () => {
  const { gender, setGender } = useGender();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleGenderChange = (newGender: 'boys' | 'girls') => {
    setGender(newGender);
    setIsOpen(false);
  };

  const getGenderIcon = (type: 'boys' | 'girls', isButton = false) => {
    if (type === 'girls') {
      return (
        <FaFemale
          className={`${isButton ? 'text-xl' : 'text-base'} ${
            gender === 'girls' ? 'text-white' : 'text-pink-400'
          }`}
        />
      );
    }
    return (
      <FaMale
        className={`${isButton ? 'text-xl' : 'text-base'} ${
          gender === 'boys' ? 'text-white' : 'text-blue-400'
        }`}
      />
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center justify-center">
        <div
          className="flex items-center space-x-2 rtl:space-x-reverse bg-white/10 backdrop-blur-sm 
                      px-4 py-2 rounded-full shadow-sm transition-all duration-300
                      hover:bg-white/15 group"
        >
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            {getGenderIcon(gender)}
            <span className="text-white font-medium">
              {gender === 'girls' ? 'دختران' : 'پسران'}
            </span>
          </div>
          <button
            className="p-1.5 hover:bg-white/10 rounded-full transition-all duration-200
                     group-hover:rotate-12"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="ویرایش جنسیت"
          >
            <Pencil className="w-4 h-4 text-white/80" />
          </button>
        </div>
      </div>

      {/* Dropdown Menu */}
      <div
        className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 
                    transition-all duration-300 ease-in-out z-50
                    ${
                      isOpen
                        ? 'opacity-100 translate-y-0'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
      >
        <div
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-3 min-w-[160px]
                      border border-gray-100 dark:border-gray-700"
        >
          <div className="flex flex-col space-y-2">
            <button
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200
                group ${
                  gender === 'girls'
                    ? 'bg-pink-500 text-white shadow-lg'
                    : 'hover:bg-pink-50 dark:hover:bg-pink-500/10'
                }`}
              onClick={() => handleGenderChange('girls')}
            >
              <span
                className={`font-medium ${
                  gender === 'girls'
                    ? 'text-white'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                دختران
              </span>
              {getGenderIcon('girls', true)}
            </button>

            {/* Boys Option */}
            <button
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-all duration-200
                group ${
                  gender === 'boys'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'hover:bg-blue-50 dark:hover:bg-blue-500/10'
                }`}
              onClick={() => handleGenderChange('boys')}
            >
              <span
                className={`font-medium ${
                  gender === 'boys'
                    ? 'text-white'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                پسران
              </span>
              {getGenderIcon('boys', true)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actions;
