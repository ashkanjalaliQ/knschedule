'use client';
import Actions from '@/components/actions';
import Header from '@/components/header';
import Schedule from '@/components/schedule';
import Stats from '@/components/stats';
import scheduleData from '@/lib/data';
import { getGenderFromLocalStorage } from '@/lib/storage';
import { useState, useEffect } from 'react';

export default function Home() {
  const [gender, setGender] = useState<'boys' | 'girls'>('boys');

  useEffect(() => {
    const storedGender = getGenderFromLocalStorage();
    if (storedGender) setGender(storedGender);
  }, []);

  useEffect(() => {
    const storedGender = localStorage.getItem('gender') as
      | 'boys'
      | 'girls'
      | null;
    if (storedGender) {
      setGender(storedGender);
    }
  }, []);
  return (
    <div className="container mx-auto p-4">
      <Header />
      <Stats gender={gender} />
      <Actions gender={gender} setGender={setGender} />
      <Schedule gender={gender} scheduleData={scheduleData}/>.
    </div>
  );
}
