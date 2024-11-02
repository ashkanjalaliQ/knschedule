import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import scheduleData from '@/lib/data';
import { ClassItem, Day } from './types';

/**
 * Merges and combines class names.
 * @param {ClassValue[]} inputs - The class values to merge.
 * @returns {string} - The merged class names.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Converts a time string (HH:mm) to total minutes from midnight.
 * @param {string} time - The time in HH:mm format.
 * @returns {number} - Total minutes from midnight.
 */
const convertTimeToMinutes = (time: string): number => {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
};

/**
 * Calculates the total duration of classes in minutes for a specific gender.
 * @param {'boys' | 'girls'} gender - The gender-specific schedule.
 * @returns {number} - Total class duration in minutes.
 */
export const calculateTotalClassDuration = (gender: 'boys' | 'girls'): number => {
  return scheduleData.schedule[gender].reduce((totalDuration, day) => {
    return totalDuration + day.classes.reduce((dayTotal, classItem) => {
      return dayTotal + convertTimeToMinutes(classItem.endTime) - convertTimeToMinutes(classItem.startTime);
    }, 0);
  }, 0);
};

/**
 * Converts total class duration to hours with a localized label.
 * @param {'boys' | 'girls'} gender - The gender-specific schedule.
 * @returns {string} - Total class duration in hours.
 */
export const getTotalClassDurationInHours = (gender: 'boys' | 'girls'): string => {
  const totalMinutes = calculateTotalClassDuration(gender);
  return `${Math.round(totalMinutes / 60)} ساعت`;
};

/**
 * Counts today's classes for a specific gender.
 * @param {'boys' | 'girls'} gender - The gender-specific schedule.
 * @returns {string} - Number of classes for today with a localized label.
 */
export const countClassesForToday = (gender: 'boys' | 'girls'): string => {
  const todayClasses = scheduleData.schedule[gender][getTodayIndex()]?.classes || [];
  return `${todayClasses.length} کلاس`;
};

export const timeLabels = scheduleData.timeLabels;

const dayMapping = ['شنبه', 'یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهار‌شنبه', 'پنج‌شنبه', 'جمعه'];

/**
 * Gets today's index adjusted for the start of the week (Saturday).
 * @returns {number} - Adjusted index for today.
 */
export const getTodayIndex = (): number => {
  const today = new Date().getDay();
  return today === 6 ? 0 : today + 1; // Adjust if the week starts on Saturday
};

/**
 * Orders the schedule starting from today.
 * @param {Day[]} schedule - Weekly schedule array.
 * @returns {Day[]} - Ordered schedule starting from today.
 */
export const getOrderedSchedule = (schedule: Day[]): Day[] => {
  const todayIndex = getTodayIndex();
  return [...schedule.slice(todayIndex), ...schedule.slice(0, todayIndex)];
};

/**
 * Checks if an index represents today.
 * @param {number} index - Day index.
 * @returns {boolean} - True if the index is today.
 */
export const isToday = (index: number): boolean => index === 0;

/**
 * Parses a time string (HH:mm) to a percentage position in the schedule day.
 * @param {string} time - The time in HH:mm format.
 * @returns {number} - Position in the schedule as a percentage.
 */
const parseTimeToPosition = (time: string): number => {
  const totalMinutes = convertTimeToMinutes(time);
  const startOfDay = 7 * 60 + 30;
  const endOfDay = 18 * 60;
  return ((totalMinutes - startOfDay) / (endOfDay - startOfDay)) * 100;
};

/**
 * Returns the color for a class based on index.
 * @param {number} index - Index of the class.
 * @returns {string} - Corresponding color.
 */
export const getClassColor = (index: number): string => 
  scheduleData.classColors[index % scheduleData.classColors.length];

/**
 * Retrieves the list of classes scheduled for today based on gender.
 * @param {('boys' | 'girls')} gender - The gender schedule to check.
 * @returns {ClassItem[]} - Array of classes scheduled for today.
 */
const getTodayClasses = (gender: 'boys' | 'girls'): ClassItem[] => {
  const todayIndex = getTodayIndex();
  return scheduleData.schedule[gender][todayIndex]?.classes || [];
};


/**
 * Gets the class currently in session based on gender.
 * @param {('boys' | 'girls')} gender - The gender schedule to check.
 * @returns {ClassItem | null} - The current class or null if none.
 */
export const getCurrentClass = (gender: 'boys' | 'girls'): ClassItem | null => {
  const todayClasses = getTodayClasses(gender);  // Centralized retrieval of today's classes
  const now = new Date();

  return todayClasses.find((classItem: ClassItem) => {
    const start = parseTime(classItem.startTime);
    const end = parseTime(classItem.endTime);
    return now >= start && now < end;
  }) || null;
};

/**
 * Determines if a class is currently active.
 * @param {ClassItem} classItem - Class information.
 * @returns {boolean} - True if the class is currently happening.
 */
export const isCurrentClass = (classItem: ClassItem): boolean => {
  const nowMinutes = convertTimeToMinutes(new Date().toTimeString().slice(0, 5));
  const startMinutes = convertTimeToMinutes(classItem.startTime);
  const endMinutes = convertTimeToMinutes(classItem.endTime);
  return nowMinutes >= startMinutes && nowMinutes < endMinutes;
};

/**
 * Formats a time range string.
 * @param {string} start - Start time in HH:mm format.
 * @param {string} end - End time in HH:mm format.
 * @returns {string} - Formatted time range.
 */
export const formatTimeRange = (start: string, end: string): string => `${start} - ${end}`;

/**
 * Creates a Google Calendar link for a class.
 * @param {ClassItem} classItem - Class details.
 * @param {string} dayName - Day name.
 * @returns {string} - Google Calendar event link.
 */
export const createGoogleCalendarLink = (classItem: ClassItem, dayName: string): string => {
  const { title, startTime, endTime, location, room } = classItem;
  const targetDate = getNextDateForDay(dayName);

  if (!targetDate) throw new Error("Invalid day name");

  const formatDate = (date: Date, time: string): string => {
    const [hours, minutes] = time.split(':').map(Number);
    date.setHours(hours, minutes, 0, 0);
    const utcDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return utcDate.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  const startDateTime = formatDate(targetDate, startTime);
  const endDateTime = formatDate(targetDate, endTime);

  return `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDateTime}/${endDateTime}&location=${encodeURIComponent(location + '، ' + room)}&sf=true&output=xml`;
};

/**
 * Gets the next class for today.
 * @param {'boys' | 'girls'} gender - Gender-specific schedule.
 * @returns {ClassItem | null} - The next class or null if none.
 */
export const getNextClass = (gender: 'boys' | 'girls'): ClassItem | null => {
  const todayClasses = scheduleData.schedule[gender][getTodayIndex()]?.classes || [];
  const nowMinutes = convertTimeToMinutes(new Date().toTimeString().slice(0, 5));

  return todayClasses
    .filter((classItem) => convertTimeToMinutes(classItem.startTime) > nowMinutes)
    .sort((a, b) => convertTimeToMinutes(a.startTime) - convertTimeToMinutes(b.startTime))[0] || null;
};

/**
 * Gets the remaining time for a current class.
 * @param {ClassItem} classItem - Class details.
 * @returns {string} - Time remaining for the class in minutes.
 */
export const getRemainingTimeForClass = (classItem: ClassItem): string => {
  const endTime = parseTime(classItem.endTime);
  const now = new Date();
  const remainingMinutes = Math.max(0, Math.round((endTime.getTime() - now.getTime()) / (1000 * 60)));
  return `${remainingMinutes} دقیقه`;
};

/**
 * Returns time until the next class starts.
 * @param {'boys' | 'girls'} gender - Gender-specific schedule.
 * @returns {string | null} - Time until the next class starts.
 */
export const getTimeUntilNextClass = (gender: 'boys' | 'girls'): string | null => {
  const todayClasses = scheduleData.schedule[gender][getTodayIndex()]?.classes || [];
  const now = new Date();

  for (const classItem of todayClasses) {
    const startTime = parseTime(classItem.startTime);
    if (now < startTime) {
      const remainingMinutes = Math.round((startTime.getTime() - now.getTime()) / (1000 * 60));
      return `تا ${remainingMinutes} دقیقه دیگر شروع میشود`;
    }
  }
  return todayClasses.length > 1 ? "خسته نباشی:)" : "تا فردا";
};

/**
 * Helper to parse a time string to a Date object with today's date.
 * @param {string} time - Time in HH:mm format.
 * @returns {Date} - Date object with the given time.
 */
export const parseTime = (time: string): Date => {
  const [hours, minutes] = time.split(":").map(Number);
  const now = new Date();
  now.setHours(hours, minutes, 0, 0);
  return now;
};

/**
 * Gets the next date for a specific day name.
 * @param {string} dayName - Target day name.
 * @returns {Date | null} - Next date matching the day name.
 */
function getNextDateForDay(dayName: string): Date | null {
  const targetDayIndex = dayMapping.indexOf(dayName);
  if (targetDayIndex === -1) return null;

  const today = new Date();
  const todayIndex = today.getDay();
  const daysUntilTarget = (targetDayIndex - todayIndex + 7) % 7;
  today.setDate(today.getDate() + daysUntilTarget);

  return today;
}

/**
 * Calculates the CSS style for a time block based on start and end times.
 * @param {ClassItem} classItem - The class item to style.
 * @param {number} index - The index for color assignment.
 * @returns {React.CSSProperties} - The style object for the time block.
 */
export const getTimeBlockStyle = (
  classItem: ClassItem,
  index: number
): React.CSSProperties => {
  const startPercent = timeToPositionPercent(classItem.startTime);
  const endPercent = timeToPositionPercent(classItem.endTime);
  return {
    right: `${startPercent}%`,
    left: `${100 - endPercent}%`,
    backgroundColor: getClassColorByIndex(index)
  };
};

/**
 * Converts a time string (e.g., "08:30") to its percentage position in the schedule.
 * @param {string} time - The time string to convert.
 * @returns {number} - The position in percentage for the time block.
 */
const timeToPositionPercent = (time: string): number => {
  const totalMinutes = convertTimeToMinutes(time);
  const startOfDay = 7 * 60 + 30; // 7:30 AM in minutes
  const endOfDay = 18 * 60;       // 6:00 PM in minutes
  return ((totalMinutes - startOfDay) / (endOfDay - startOfDay)) * 100;
};

/**
 * Retrieves the color associated with a class based on its index.
 * @param {number} index - The index of the class in the schedule.
 * @returns {string} - The color assigned to the class.
 */
const getClassColorByIndex = (index: number): string => {
  return scheduleData.classColors[index % scheduleData.classColors.length];
};