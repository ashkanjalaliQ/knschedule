const scheduleData = {
  timeLabels: ['۱۷:۳۰', '۱۵:۰۰', '۱۲:۳۰', '۱۰:۰۰', '۷:۳۰'].reverse(),

  scheduleTypes: [
    { id: 'girls', label: 'دختران', icon: 'fas fa-female' },
    { id: 'boys', label: 'پسران', icon: 'fas fa-male' }
  ],

  classColors: [
    '#4F46E5', // indigo-600
    '#7C3AED', // purple-600
    '#2563EB', // blue-600
    '#0891B2', // cyan-600
    '#059669' // emerald-600
  ],

  schedule: {
    girls: [
      {
        name: 'شنبه',
        classes: [
          {
            title: 'اخلاق و تربیت اسلامی',
            startTime: '10:30',
            endTime: '12:00',
            location: 'دانشکده برق و کامپیوتر، ساختمان صنایع',
            room: 'کلاس د'
          },
          {
            title: 'جبرانی ریاضی عمومی ۱',
            startTime: '14:30',
            endTime: '17:30',
            location: 'دانشکده برق',
            room: 'سالن رضایی نژاد'
          }
        ]
      },
      {
        name: 'یک‌شنبه',
        classes: [
          {
            title: 'ریاضی عمومی ۱',
            startTime: '09:00',
            endTime: '10:30',
            location: 'دانشکده برق و کامپیوتر، ساختمان صنایع',
            room: 'کلاس ج'
          },
          {
            title: 'فیزیک ۱',
            startTime: '10:30',
            endTime: '12:00',
            location: 'دانشکده برق و کامپیوتر، ساختمان صنایع',
            room: 'کلاس ج'
          },
          {
            title: 'زبان فارسی ۱',
            startTime: '13:30',
            endTime: '15:00',
            location: 'دانشکده برق و کامپیوتر، ساختمان صنایع',
            room: 'کلاس ج'
          }
        ]
      },
      {
        name: 'دوشنبه',
        classes: []
      },
      {
        name: 'سه‌شنبه',
        classes: [
          {
            title: 'ریاضی عمومی ۱',
            startTime: '09:00',
            endTime: '10:30',
            location: 'دانشکده برق و کامپیوتر، ساختمان صنایع',
            room: 'کلاس ج'
          },
          {
            title: 'فیزیک ۱',
            startTime: '10:30',
            endTime: '12:00',
            location: 'دانشکده برق و کامپیوتر، ساختمان صنایع',
            room: 'کلاس ج'
          },
          {
            title: 'زبان فارسی ۱',
            startTime: '13:30',
            endTime: '15:00',
            location: 'دانشکده برق و کامپیوتر، ساختمان صنایع',
            room: 'کلاس ج'
          }
        ]
      },
      {
        name: 'چهار‌شنبه',
        classes: [
          {
            title: 'اقتصاد عمومی ۱',
            startTime: '09:00',
            endTime: '10:30',
            location: 'دانشکده صنایع و مکانیک',
            room: 'کلاس ۲۰۸'
          },
          {
            title: 'نقشه کشی صنعتی',
            startTime: '10:30',
            endTime: '12:00',
            location: 'دانشکده صنایع و مکانیک',
            room: 'کلاس ۱۱۴'
          },
          {
            title: 'حل تمرین فیزیک 1',
            startTime: '12:30',
            endTime: '13:30',
            location: 'دانشکده صنایع و مکانیک',
            room: 'کلاس ۲۰۵'
          },
          {
            title: 'جبرانی فیزیک ۱',
            startTime: '13:30',
            endTime: '16:30',
            location: 'دانشکده صنایع و مکانیک',
            room: 'کلاس ۳۰۵'
          }
        ]
      },
      {
        name: 'پنجشنبه',
        classes: []
      },
      {
        name: 'جمعه',
        classes: []
      }
    ],
    boys: [
      {
        name: 'شنبه',
        classes: [
          {
            title: 'اخلاق و تربیت اسلامی',
            startTime: '09:00',
            endTime: '10:30',
            location: 'دانشکده برق و کامپیوتر، ساختمان صنایع',
            room: 'کلاس د'
          },
          {
            title: 'جبرانی ریاضی عمومی ۱',
            startTime: '14:30',
            endTime: '17:30',
            location: 'دانشکده برق',
            room: 'سالن رضایی نژاد'
          }
        ]
      },
      {
        name: 'یک‌شنبه',
        classes: [
          {
            title: 'ریاضی عمومی ۱',
            startTime: '07:30',
            endTime: '09:00',
            location: 'دانشکده برق و کامپیوتر، ساختمان صنایع',
            room: 'کلاس د'
          },
          {
            title: 'فیزیک ۱',
            startTime: '09:00',
            endTime: '10:30',
            location: 'دانشکده برق و کامپیوتر، ساختمان صنایع',
            room: 'کلاس د'
          },
          {
            title: 'زبان فارسی ۱',
            startTime: '12:00',
            endTime: '13:30',
            location: 'دانشکده برق',
            room: 'کلاس ۲۰۸'
          }
        ]
      },
      {
        name: 'دوشنبه',
        classes: []
      },
      {
        name: 'سه‌شنبه',
        classes: [
          {
            title: 'ریاضی عمومی ۱',
            startTime: '07:30',
            endTime: '09:00',
            location: 'دانشکده برق و کامپیوتر، ساختمان صنایع',
            room: 'کلاس د'
          },
          {
            title: 'فیزیک ۱',
            startTime: '09:00',
            endTime: '10:30',
            location: 'دانشکده برق و کامپیوتر، ساختمان صنایع',
            room: 'کلاس د'
          },
          {
            title: 'زبان فارسی ۱',
            startTime: '12:00',
            endTime: '13:30',
            location: 'دانشکده برق',
            room: 'کلاس ۲۰۸'
          }
        ]
      },
      {
        name: 'چهار‌شنبه',
        classes: [
          {
            title: 'اقتصاد عمومی ۱',
            startTime: '07:30',
            endTime: '09:00',
            location: 'دانشکده صنایع و مکانیک',
            room: 'کلاس ۲۰۸'
          },
          {
            title: 'نقشه کشی صنعتی',
            startTime: '09:00',
            endTime: '10:30',
            location: 'دانشکده صنایع و مکانیک',
            room: 'کلاس ۱۱۴'
          },
          {
            title: 'حل تمرین فیزیک 1',
            startTime: '12:30',
            endTime: '13:30',
            location: 'دانشکده صنایع و مکانیک',
            room: 'کلاس ۲۰۵'
          },
          {
            title: 'جبرانی فیزیک ۱',
            startTime: '13:30',
            endTime: '16:30',
            location: 'دانشکده صنایع و مکانیک',
            room: 'کلاس ۳۰۵'
          }
        ]
      },
      {
        name: 'پنجشنبه',
        classes: []
      },
      {
        name: 'جمعه',
        classes: []
      }
    ]
  }
};

export default scheduleData;
