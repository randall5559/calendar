import { Observable } from 'rxjs';
import JsonCalendar from '../../vendors/json-calendar';
import { CalendarDate } from '../../core/models/calendar-date.interface';

/**
 * Load tasks async and parse data
 *
 * @param action$
 */
export const loadCalendarViewEpic = action$ =>
  action$.ofType('LOAD_CALENDAR_VIEW')
  .mergeMap(action => {
    return loadView(action.payload)
      .map(payload => ({ type: 'LOAD_CALENDAR_VIEW_COMPLETED',  payload }));
  });

/**
 * Load a calendar view from vendor JsonCalendar
 *
 * @param {string} date
 * @returns
 */
const loadView = (date: CalendarDate) => {
    const time = date ? new Date(date.year, date.month, 0) : new Date();
    const timestamp = `${time.getUTCMonth() + 1}-${time.getFullYear()}`;
    const calendar = new JsonCalendar(
        date ? { today: time } : {}
    );

    return Observable.of({
        [timestamp]: calendar.weeks
    });
}
