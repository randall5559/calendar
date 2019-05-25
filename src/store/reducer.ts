import { combineReducers } from 'redux';
import { calendarReducer } from '../calendar/reducers/calendar.reducer';
import { calendarDateReducer } from '../core/reducers/calendar-date.reducer';
import { reminderReducer } from '../core/reducers/reminder.reducer';

const rootReducer = combineReducers({
  reminderReducer,
  calendarDateReducer,
  calendarReducer
});

export default rootReducer;
