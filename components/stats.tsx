import {
  countClassesForToday,
  getTotalClassDurationInHours,
  getNextClass
} from '@/lib/utils';
import { useState, useEffect } from 'react';
import StatsItem from './stats-item';

interface StatsProps {
  gender: 'boys' | 'girls';
}

const Stats: React.FC<StatsProps> = ({ gender }) => {
  const [totalClassDuration, setTotalClassDuration] = useState<string | null>(
    null
  );
  const [todayClassCount, setTodayClassCount] = useState<string>('0 کلاس');
  const [nextClass, setNextClass] = useState<string | null>(null);

  useEffect(() => {
    setTotalClassDuration(getTotalClassDurationInHours(gender));
    setTodayClassCount(countClassesForToday(gender));

    const upcomingClass = getNextClass(gender);
    if (upcomingClass) {
      setNextClass(`${upcomingClass.title} (${upcomingClass.startTime})`);
    } else {
      setNextClass('کلاس های امروز تموم شدند');
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
        <StatsItem label="کلاس بعدی" value={nextClass || undefined} />{' '}
      </div>
    </div>
  );
};

export default Stats;
