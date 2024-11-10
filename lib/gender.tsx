'use client'

import React, { createContext, useContext, useState, useEffect } from 'react';

type Gender = 'boys' | 'girls';

interface GenderContextType {
  gender: Gender;
  setGender: (gender: Gender) => void;
}

const GenderContext = createContext<GenderContextType | undefined>(undefined);

export const GenderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gender, setGender] = useState<Gender>('boys'); 

  useEffect(() => {
    const savedGender = localStorage.getItem('gender') as Gender;
    if (savedGender) {
      setGender(savedGender);
    }
  }, []);

  const updateGender = (newGender: Gender) => {
    setGender(newGender);
    localStorage.setItem('gender', newGender);
  };

  return (
    <GenderContext.Provider value={{ gender, setGender: updateGender }}>
      {children}
    </GenderContext.Provider>
  );
};

export const useGender = (): GenderContextType => {
  const context = useContext(GenderContext);
  if (context === undefined) {
    throw new Error('useGender must be used within a GenderProvider');
  }
  return context;
};
