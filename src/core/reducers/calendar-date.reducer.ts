import { CalendarDate } from '../models/calendar-date.interface';

const initialState: CalendarDate = {
    month: null,
    year: null
};

export const calendarDateReducer = (state: CalendarDate = initialState, action) => {
    switch (action.type) {
        case 'SET_NEXT_CALENDAR_DATE_VIEW':
            return Object.assign({}, state, action.payload);
        case 'SET_PREVIOUS_CALENDAR_DATE_VIEW':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};
