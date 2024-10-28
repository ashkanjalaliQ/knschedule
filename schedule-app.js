function scheduleApp() {
    return {
        // Initial states
        currentSchedule: localStorage.getItem('selectedSchedule') || 'boys',
        schedule: scheduleData.schedule,
        timeLabels: scheduleData.timeLabels,
        scheduleTypes: scheduleData.scheduleTypes,
        currentTime: null,
        isLoading: true,
        isDark: localStorage.theme === 'dark',

        // Time management
        updateCurrentTime() {
            const now = new Date();
            this.currentTime = {
                hours: now.getHours(),
                minutes: now.getMinutes(),
                totalMinutes: now.getHours() * 60 + now.getMinutes(),
                day: now.getDay()
            };
        },

        toggleDarkMode() {
            this.isDark = !this.isDark;
            if (this.isDark) {
                document.documentElement.classList.add('dark');
                localStorage.theme = 'dark';
            } else {
                document.documentElement.classList.remove('dark');
                localStorage.theme = 'light';
            }
        },


        // Schedule ordering with today first
        getOrderedSchedule() {
            const weekdays = ['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهار‌شنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'];
            const schedule = this.schedule[this.currentSchedule];

            if (!this.currentTime) {
                this.updateCurrentTime();
            }

            const todayName = weekdays[this.currentTime.day];
            const todayIndex = schedule.findIndex(day => day.name === todayName);

            if (todayIndex === -1) return schedule;

            return [
                ...schedule.slice(todayIndex),
                ...schedule.slice(0, todayIndex)
            ];
        },

        // Statistics section data
        get stats() {
            return [
                { id: 'hours', value: this.getTotalHours(), label: 'ساعات کلاسی هفته' },
                { id: 'today', value: this.getTodayClasses(), label: 'کلاس‌های امروز' },
                { id: 'next', value: this.getNextClass(), label: 'کلاس بعدی' }
            ];
        },

        // Time utilities
        getMinutesFromTime(time) {
            const [hours, minutes] = time.split(':').map(Number);
            return hours * 60 + minutes;
        },

        convertToPercentage(minutes, startOfDay = 7.5 * 60, duration = 10.5 * 60) {
            return ((minutes - startOfDay) / duration) * 100;
        },

        // Timeline rendering
        getTimeBlockStyle(classItem, classIndex) {
            const startMinutes = this.getMinutesFromTime(classItem.startTime);
            const endMinutes = this.getMinutesFromTime(classItem.endTime);
            const startOfDay = 7.5 * 60;
            const duration = 10.5 * 60;

            return {
                right: this.convertToPercentage(startMinutes) + '%',
                width: ((endMinutes - startMinutes) / duration) * 100 + '%',
                backgroundColor: this.getClassColor(classIndex)
            };
        },

        getClassColor(index) {
            return scheduleData.classColors[index % scheduleData.classColors.length];
        },

        // Statistics calculations
        getTotalHours() {
            const totalMinutes = Object.values(this.schedule[this.currentSchedule])
                .flatMap(day => day.classes)
                .reduce((total, classItem) => {
                    const startMinutes = this.getMinutesFromTime(classItem.startTime);
                    const endMinutes = this.getMinutesFromTime(classItem.endTime);
                    return total + (endMinutes - startMinutes);
                }, 0);

            return Math.round(totalMinutes / 60) + ' ساعت';
        },

        getTodayClasses() {
            const todaySchedule = this.getTodaySchedule();
            return todaySchedule ? todaySchedule.classes.length + ' کلاس' : '۰ کلاس';
        },

        getNextClass() {
            const todaySchedule = this.getTodaySchedule();
            if (!todaySchedule) return 'کلاس های امروز تموم شدند';

            const nextClass = todaySchedule.classes.find(classItem =>
                this.getMinutesFromTime(classItem.startTime) > this.currentTime.totalMinutes
            );

            return nextClass ? nextClass.title : 'کلاس های امروز تموم شدند';
        },

        // Schedule helpers
        getTodaySchedule() {
            return this.getOrderedSchedule()[0];
        },

        isToday(dayIndex) {
            return dayIndex === 0;
        },

        isCurrentClass(classItem, day) {
            // First check if it's from current schedule
            const scheduleDay = this.schedule[this.currentSchedule].find(d => d.name === day.name);
            if (!scheduleDay) return false;

            // Then check if it's today
            if (!this.isToday(this.getOrderedSchedule().indexOf(day))) return false;

            // Check if class exists in current schedule's day
            const classExists = scheduleDay.classes.some(c =>
                c.title === classItem.title &&
                c.startTime === classItem.startTime &&
                c.endTime === classItem.endTime
            );
            if (!classExists) return false;

            // Finally check the time
            const startMinutes = this.getMinutesFromTime(classItem.startTime);
            const endMinutes = this.getMinutesFromTime(classItem.endTime);

            return this.currentTime.totalMinutes >= startMinutes &&
                this.currentTime.totalMinutes < endMinutes;
        },

        getRemainingTime(classItem) {
            const endMinutes = this.getMinutesFromTime(classItem.endTime);
            const remainingMinutes = endMinutes - this.currentTime.totalMinutes;

            const hours = Math.floor(remainingMinutes / 60);
            const minutes = remainingMinutes % 60;

            return hours > 0 ? `${hours} ساعت و ${minutes} دقیقه` : `${minutes} دقیقه`;
        },

        // Google Calendar Integration
        findAllClassOccurrences(classTitle) {
            const occurrences = [];

            this.schedule[this.currentSchedule].forEach(day => {
                day.classes.forEach(classItem => {
                    if (classItem.title === classTitle) {
                        occurrences.push({
                            dayName: day.name,
                            ...classItem
                        });
                    }
                });
            });

            return occurrences;
        },

        createMultiDayGoogleCalendarLink(classOccurrences) {
            // Persian weekdays to Google Calendar format mapping
            const weekDays = {
                'شنبه': 'SA',
                'یک‌شنبه': 'SU',
                'دوشنبه': 'MO',
                'سه‌شنبه': 'TU',
                'چهار‌شنبه': 'WE',
                'پنج‌شنبه': 'TH',
                'جمعه': 'FR'
            };

            // Find the nearest starting date
            const today = new Date();
            let startDate = new Date();

            const daysCodes = classOccurrences.map(occ => weekDays[occ.dayName]);
            while (!daysCodes.includes(weekDays[['یک‌شنبه', 'دوشنبه', 'سه‌شنبه', 'چهار‌شنبه', 'پنج‌شنبه', 'جمعه', 'شنبه'][startDate.getDay()]])) {
                startDate.setDate(startDate.getDate() + 1);
            }

            // Set time for the first occurrence
            const firstOccurrence = classOccurrences[0];
            const [startHour, startMinute] = firstOccurrence.startTime.split(':');
            startDate.setHours(parseInt(startHour), parseInt(startMinute), 0);

            // Set end date
            const endDate = new Date(startDate);
            endDate.setMonth(endDate.getMonth() + 1);

            // Format dates for Google Calendar
            const formatDate = (date) => {
                return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
            };

            const [endHour, endMinute] = firstOccurrence.endTime.split(':');
            const eventEndDate = new Date(startDate);
            eventEndDate.setHours(parseInt(endHour), parseInt(endMinute), 0);

            // Create recurrence rule for all days
            const bydayRule = classOccurrences
                .map(occ => weekDays[occ.dayName])
                .join(',');

            // Create event parameters
            const event = {
                text: firstOccurrence.title,
                dates: `${formatDate(startDate)}/${formatDate(eventEndDate)}`,
                location: `${firstOccurrence.location} - ${firstOccurrence.room}`,
                details: `کلاس ${firstOccurrence.title}\n\n` +
                    `روزهای برگزاری:\n${classOccurrences.map(occ => occ.dayName).join(' و ')}\n\n` +
                    `محل برگزاری: ${firstOccurrence.location}\n` +
                    `کلاس: ${firstOccurrence.room}\n` +
                    (firstOccurrence.professor ? `استاد: ${firstOccurrence.professor}` : ''),
                recurrence: `RRULE:FREQ=WEEKLY;UNTIL=${formatDate(endDate)};BYDAY=${bydayRule}`
            };

            // Create Google Calendar URL
            const baseUrl = 'https://www.google.com/calendar/render?action=TEMPLATE';
            const params = new URLSearchParams({
                text: event.text,
                dates: event.dates,
                location: event.location,
                details: event.details,
                recur: event.recurrence
            });

            return `${baseUrl}&${params.toString()}`;
        },

        addToGoogleCalendar(classItem) {
            const allOccurrences = this.findAllClassOccurrences(classItem.title);
            const calendarUrl = this.createMultiDayGoogleCalendarLink(allOccurrences);
            window.open(calendarUrl, '_blank');
        },

        // Lifecycle and state management
        async init() {
            if (!('theme' in localStorage)) {
                this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                localStorage.theme = this.isDark ? 'dark' : 'light';
            }

            this.isLoading = true;
            await this.delay(1000);

            this.updateCurrentTime();
            this.initLocalStorage();
            this.initAutoUpdate();

            this.isLoading = false;
        },

        initLocalStorage() {
            this.$watch('currentSchedule', value => {
                localStorage.setItem('selectedSchedule', value);
            });
        },

        initAutoUpdate() {
            setInterval(() => {
                this.updateCurrentTime();
                this.updateClassStatus();
            }, 60000);
        },

        updateClassStatus() {
            // Force update all class statuses
            this.getOrderedSchedule().forEach(day => {
                day.classes.forEach(classItem => {
                    // Trigger a reactivity update
                    classItem.isActive = this.isCurrentClass(classItem, day);
                });
            });

            // Legacy DOM update (if needed)
            if (this.$refs.scheduleGrid) {
                this.$refs.scheduleGrid.querySelectorAll('[x-data]').forEach(el => {
                    if (el._x_dataStack) {
                        el._x_dataStack[0].isCurrentClass = this.isCurrentClass.bind(this);
                    }
                });
            }
        },


        delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        },

        async handleScheduleClick(newSchedule) {
            if (this.currentSchedule !== newSchedule) {
                this.isLoading = true;
                this.updateCurrentTime();
                this.currentSchedule = newSchedule;

                // Give DOM time to update
                await this.$nextTick();
                this.updateClassStatus();

                this.isLoading = false;
            }
        },
    };
}

// Time utilities
const timeUtils = {
    convertToMinutes: time => {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    },

    minutesToTime: minutes => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    },

    persianDigits: ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'],
    toPersianNumbers: str => str.replace(/\d/g, d => timeUtils.persianDigits[d])
};

window.scheduleApp = scheduleApp;
window.timeUtils = timeUtils;