import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const MyCalendar = () => {
    const localizer = momentLocalizer(moment);

    const events = [
        {
            title: 'Event 1',
            start: new Date(2024, 3, 10),
            end: new Date(2024, 3, 12),
        },
        {
            title: 'Event 2',
            start: new Date(2024, 3, 15),
            end: new Date(2024, 3, 17),
        },
        // Add more events as needed
    ];

    return (
        <div style={{ height: '500px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ margin: '50px' }}
            />
        </div>
    );
};

export default MyCalendar;