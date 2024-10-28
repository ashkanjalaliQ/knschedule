import React from 'react';
import { ClassItem } from '@/lib/types';
import {
  createGoogleCalendarLink,
  getClassColor,
  isCurrentClass
} from '@/lib/utils';
import {
  FaCalendarPlus,
  FaClock,
  FaDoorOpen,
  FaMapMarkedAlt,
  FaMapMarker,
  FaMapMarkerAlt
} from 'react-icons/fa';
import { FaLocationPin } from 'react-icons/fa6';
import { BiLocationPlus } from 'react-icons/bi';
import { Clock } from 'lucide-react';

interface ClassCardProps {
  classItem: ClassItem;
  index: number;
}

const ClassCard: React.FC<ClassCardProps> = ({ classItem, index }) => {
  const handleAddToGoogleCalendar = () => {
    const link = createGoogleCalendarLink(classItem);
    window.open(link, '_blank'); // Open in a new tab
  };
  return (
    <div
      className={`bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-300 ${isCurrentClass(classItem) ? 'ring-2 ring-indigo-500' : ''}`}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center">
          <div
            className="w-3 h-3 rounded-full ml-2"
            style={{ backgroundColor: getClassColor(index) }}
          ></div>
          <h4 className="font-semibold text-gray-800">{classItem.title}</h4>
        </div>
        <span className="text-sm text-gray-600 flex flex-row">
          <Clock className="text-xs w-4 h-4 ml-1" />
          {classItem.startTime} - {classItem.endTime}
        </span>
      </div>
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center">
          <FaMapMarkerAlt className="w-5 ml-1 text-indigo-500" />
          <span>{classItem.location}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className='flex flex-row'>
            <FaDoorOpen className="w-5 ml-1 text-indigo-500" />
            <span>{classItem.room}</span>
          </div>

          <button
            className="px-3 py-1 text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-full transition-colors duration-300 flex items-center group"
            onClick={handleAddToGoogleCalendar}
          >
            <FaCalendarPlus className="ml-1 group-hover:scale-110 transition-transform duration-300" />
            افزودن به گوگل کلندر
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassCard;
