import { Calendar, CalendarRow, CalendarCell } from '../models';
import { stringGen } from '../../vendors/random-number/index';

const initialState: Calendar = {};

/**
 * Add/update reminder state
 *
 * @param {*} state
 * @param {*} action
 * @param {*} id
 * @returns
 */
const onReminder = (state, action, id = null, status = null) => {
    let reminderUpdate = null;

    const newState = <CalendarRow[]>state[action.payload.calKey].slice(0);
        return Object.assign({}, state, {
            [action.payload.calKey]: newState.map((row): CalendarCell[] => {
                const cells = <CalendarCell[]><any>row;

                return cells
                    // Purposely do a side effect for remind update with variable [reminderUpdate]
                    // if an update status remove reminder from calendar object grid first
                    .map((cell: CalendarCell) => {
                        if (cell.hasOwnProperty('reminders') && cell.reminders.length && status !== 'delete') {
                            return Object.assign({}, cell,
                                {
                                    reminders : cell.reminders.filter(_reminder_ => {
                                        if (_reminder_.id !== id) {
                                            return true;
                                        }
                                        reminderUpdate = Object.assign({}, _reminder_, {
                                            label: action.payload.label,
                                            time: action.payload.time,
                                            color: action.payload.color
                                        });
                                        return false;
                                    })
                                }
                            );
                        }
                        return cell;
                    })
                    // delete, add new or add an updated reminder
                    .map((cell: CalendarCell) => {
                        if (cell.day === parseInt(action.payload.day, 10) && cell.monthIndex === action.payload.monthIndex) {
                            let reminders = [];

                            if (id) {
                                if (status === 'delete') {
                                    reminders = cell.reminders.filter(_reminder_ => (_reminder_.id !== id));
                                } else {
                                    reminders = cell.hasOwnProperty('reminders') ?
                                        cell.reminders.concat([reminderUpdate]) :
                                        [reminderUpdate];
                                }
                            } else {
                                const reminder = {
                                    id: stringGen(10),
                                    label: action.payload.label,
                                    time: action.payload ? action.payload.time : '',
                                    color: action.payload.color
                                };

                                reminders = cell.hasOwnProperty('reminders') ? cell.reminders.concat([reminder]) : [reminder];
                            }
                            return Object.assign({}, cell, {
                                reminders: reminders.sort((a, b) => parseInt(a.time, 10) - parseInt(b.time, 10))
                            });
                        }
                        return cell;
                    });
            })
        });
}

export const calendarReducer = (state: Calendar = initialState, action) => {
    switch (action.type) {
        case 'ADD_REMINDER_ON_CALENDAR_VIEW':
            return onReminder(state, action);
        case 'UPDATE_REMINDER_ON_CALENDAR_VIEW':
            return onReminder(state, action, action.payload.id, 'update');
        case 'DELETE_REMINDER_ON_CALENDAR_VIEW':
            return onReminder(state, action, action.payload.id, 'delete');
        case 'LOAD_CALENDAR_VIEW_COMPLETED':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};
