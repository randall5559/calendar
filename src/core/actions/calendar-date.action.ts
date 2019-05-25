import { createAction } from 'redux-actions';

export const setToNextCalendarView = createAction<any>('SET_NEXT_CALENDAR_DATE_VIEW');
export const setToPreviousCalendarView = createAction<any>('SET_PREVIOUS_CALENDAR_DATE_VIEW');
