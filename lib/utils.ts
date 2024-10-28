import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import scheduleData from '@/lib/data';
import { ClassItem, Day } from './types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const convertTimeToMinutes = (time: string) => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

export const calculateTotalClassDuration = (gender: 'boys' | 'girls') => {
  const classes = scheduleData.schedule[gender];

  let totalDuration = 0;

  classes.forEach((day) => {
    day.classes.forEach((classItem) => {
      const startMinutes = convertTimeToMinutes(classItem.startTime);
      const endMinutes = convertTimeToMinutes(classItem.endTime);
      totalDuration += endMinutes - startMinutes;
    });
  });

  return totalDuration;
};

export const getTotalClassDurationInHours = (gender: 'boys' | 'girls') => {
  const totalMinutes = calculateTotalClassDuration(gender);
  const totalHours = Math.round(totalMinutes / 60);
  return `${totalHours} ساعت`;
};

export const countClassesForToday = (gender: 'boys' | 'girls') => {
  const classesForGender = scheduleData.schedule[gender];
  const todayIndex = new Date().getDay();
  const todayClasses = classesForGender[todayIndex + 1].classes || [];
  return `${todayClasses.length} کلاس`;
};

export const timeLabels = scheduleData.timeLabels;

export const getTodayIndex = (): number => {
  const today = new Date().getDay();
  return today === 6 ? 0 : today + 1;
};

export const getOrderedSchedule = (schedule: Day[]): Day[] => {
  const todayIndex = getTodayIndex();
  return [...schedule.slice(todayIndex), ...schedule.slice(0, todayIndex)];
};

export const isToday = (index: number): boolean => index === 0;

export const getTimeBlockStyle = (
  classItem: ClassItem,
  index: number
): React.CSSProperties => {
  const start = parseTimeToPosition(classItem.startTime);
  const end = parseTimeToPosition(classItem.endTime);
  return {
    right: `${start}%`,
    left: `${100 - end}%`,
    backgroundColor: getClassColor(index)
  };
};

const parseTimeToPosition = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes;
  const startOfDay = 7 * 60;
  const endOfDay = 18 * 60;
  return ((totalMinutes - startOfDay) / (endOfDay - startOfDay)) * 100;
};

export const getClassColor = (index: number): string => {
  return scheduleData.classColors[index % scheduleData.classColors.length];
};

export const isCurrentClass = (classItem: ClassItem): boolean => {
  const now = new Date();
  const currentTime = `${now.getHours()}:${now.getMinutes()}`;
  return currentTime >= classItem.startTime && currentTime < classItem.endTime;
};

export const formatTimeRange = (start: string, end: string): string => {
  return `${start} - ${end}`;
};

export const createGoogleCalendarLink = (classItem: ClassItem): string => {
  const { title, startTime, endTime, location, room } = classItem;

  const today = new Date();

  const formatDate = (date: Date, time: string) => {
    const [hours, minutes] = time.split(':');
    date.setHours(Number(hours), Number(minutes), 0);
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const startDateTime = formatDate(new Date(today), startTime);
  const endDateTime = formatDate(new Date(today), endTime);

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDateTime}/${endDateTime}&location=${encodeURIComponent(location + '، ' + room)}&sf=true&output=xml`;
};

const dayMapping = [
  'شنبه',
  'یک‌شنبه',
  'دوشنبه',
  'سه‌شنبه',
  'چهار‌شنبه',
  'پنج‌شنبه',
  'جمعه'
];

export const getNextClass = (gender: 'boys' | 'girls'): ClassItem | null => {
  const todayIndex = new Date().getDay();
  const todayName = dayMapping[todayIndex + 1];
  const classesForGender = scheduleData.schedule[gender];

  const todayClasses =
    classesForGender.find((day) => day.name === todayName)?.classes || [];

  const now = new Date();
  const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

  const nextClass = todayClasses
    .map((classItem) => {
      const classStartTimeInMinutes = convertTimeToMinutes(classItem.startTime);
      return {
        ...classItem,
        startTimeInMinutes: classStartTimeInMinutes
      };
    })
    .filter((classItem) => classItem.startTimeInMinutes > currentTimeInMinutes)
    .sort((a, b) => a.startTimeInMinutes - b.startTimeInMinutes)[0];

  return nextClass || null;
};
