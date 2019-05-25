import * as React from 'react';
import { CalendarCell as ICalendarCell } from '../../models/calendar-cell.interface';
import './calendar-cell.css';

export const CalendarCell = (props: ICalendarCell) => (
    <div onClick={ (e) => {
        if (props.className.match('month-day')) {
            props.setReminderState({
                date: props.date,
                modalOpen: true,
                monthIndex: props.monthIndex,
                day: props.day,
                status: null
            });
        }
    }}
        className={props.className.match('month-day') ? 'calendar__day day' : 'calendar__day day non-month-day'}
    >
        <div
            className={props.className.match('month-day') ? 'date' : ''}
        >
            {props.day}
        </div>
        { props.reminders ? props.reminders.map((reminder, ix) => {
                return(
                    <div
                        className={reminder && reminder.color ? `reminder-block ${reminder.color}`: 'reminder-block'}
                        key={ix}
                        onClick={(e) => {
                            e.stopPropagation();
                            props.setReminderState({
                                date: props.date,
                                modalOpen: true,
                                monthIndex: props.monthIndex,
                                day: props.day,
                                time: reminder.time,
                                id: reminder.id,
                                label: reminder.label,
                                color: reminder.color,
                                status: 'edit'
                            });
                        }}
                        >
                            {reminder.time}: {reminder.label}
                        </div>
                )
            }) :
            <div></div>
        }
    </div>
);
