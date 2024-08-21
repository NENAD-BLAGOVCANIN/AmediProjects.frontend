import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useTranslation } from 'react-i18next';
import { getTasks } from '../../api/tasks'; // Adjust the import path as necessary

const localizer = momentLocalizer(moment);

const CustomAgenda = ({ events, date }) => {
    const eventsForDate = events.filter(event => moment(event.start).isSame(date, 'day'));
    return (
        <div>
            {eventsForDate.length > 0 ? (
                eventsForDate.map((event, idx) => (
                    <div key={idx} className="agenda-event">
                        <span>{event.title}</span>
                    </div>
                ))
            ) : (
                <div>No tasks for this day</div>
            )}
        </div>
    );
};

const MyCalendar = () => {
    const { t } = useTranslation();
    const [events, setEvents] = useState([]);

    const fetchTasks = async () => {
        try {
            const fetchedTasks = await getTasks();
            const formattedTasks = fetchedTasks.map(task => ({
                title: task.subject,
                start: new Date(task.due_date),
                end: new Date(task.due_date),
            }));
            setEvents(formattedTasks);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div style={{ height: '500px' }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={{ month: true, agenda: CustomAgenda }}
                defaultView={Views.AGENDA}
                style={{ margin: '50px' }}
                messages={{
                    agenda: t('agenda'), // Assuming you have translation for agenda view
                }}
                components={{
                    agenda: {
                        event: CustomAgenda,
                    },
                }}
            />
        </div>
    );
};

export default MyCalendar;
