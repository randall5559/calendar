import { combineEpics } from 'redux-observable';
import { loadCalendarViewEpic } from '../calendar/epics';

loadCalendarViewEpic

const rootEpic = combineEpics(
    loadCalendarViewEpic
);

export default rootEpic;
