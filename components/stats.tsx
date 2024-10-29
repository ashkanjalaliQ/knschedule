import {
  countClassesForToday,
  getTotalClassDurationInHours,
  getNextClass,
  getCurrentClass,
  getRemainingTimeForClass,
  getTimeUntilNextClass
} from '@/lib/utils';
import { useState, useEffect } from 'react';
import StatsItem from './stats-item';
import { ClassItem } from '@/lib/types';

interface StatsProps {
  gender: 'boys' | 'girls';
}

const Stats: React.FC<StatsProps> = ({ gender }) => {
  const [totalClassDuration, setTotalClassDuration] = useState<string | null>(
    null
  );
  const [todayClassCount, setTodayClassCount] = useState<string>('0 کلاس');
  const [nextClass, setNextClass] = useState<string | null>(null);
  const [currentClass, setCurrentClass] = useState<ClassItem | null>(null);
  const [remainingTime, setRemainingTime] = useState<string>('');
  const [timeUntilNextClass, setTimeUntilNextClass] = useState<string>('');

  useEffect(() => {
    const currentClass = getCurrentClass(gender);
    setCurrentClass(currentClass);
    setRemainingTime(
      currentClass ? getRemainingTimeForClass(currentClass) : '0 دقیقه'
    );
    setTotalClassDuration(getTotalClassDurationInHours(gender));
    setTodayClassCount(countClassesForToday(gender));
    const upcomingClass = getNextClass(gender);
    setTimeUntilNextClass(getTimeUntilNextClass(gender) || '');
    if (upcomingClass) {
      setNextClass(`${upcomingClass.title} (${upcomingClass.startTime})`);
    } else {
      setNextClass(
        parseInt(countClassesForToday(gender).slice(0, 1)) > 0
          ? 'کلاس های امروز تمام شدند'
          : 'امروز هیچ کلاسی ندارید'
      );
      console.log(parseInt(countClassesForToday(gender).slice(0, 1)))
    }
  }, [gender]);

  return (
    <div className="glass-effect rounded-2xl soft-shadow p-6 mb-8 fade-in hover:shadow-lg transition-all duration-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsItem
          label="ساعات کلاسی هفته"
          value={totalClassDuration || undefined}
        />
        <StatsItem label="کلاس‌های امروز" value={todayClassCount} />
        {currentClass ? (
          <StatsItem
            label={remainingTime + ' باقیمانده' || undefined}
            value={currentClass?.title || undefined}
          />
        ) : (
          <StatsItem
            label={timeUntilNextClass}
            value={nextClass || undefined}
          />
        )}
      </div>
    </div>
  );
};

export default Stats;
