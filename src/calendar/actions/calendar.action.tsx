import { createAction } from 'redux-actions';

export const loadCalendarView = createAction<any>('LOAD_CALENDAR_VIEW');
export const addReminder = createAction<any>('ADD_REMINDER_ON_CALENDAR_VIEW');
export const updateReminder = createAction<any>('UPDATE_REMINDER_ON_CALENDAR_VIEW');
export const deleteReminder = createAction<any>('DELETE_REMINDER_ON_CALENDAR_VIEW');

