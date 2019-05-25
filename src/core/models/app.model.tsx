import { RouteComponentProps } from 'react-router';
import { Calendar } from '../../calendar/models';
import { CalendarDate } from './calendar-date.interface';
import { ReminderModal } from './reminder-modal.interface';

export namespace AppModel {
    export interface Props extends RouteComponentProps<void> {
      calendar: Calendar;
      date: CalendarDate;
      reminder: ReminderModal;
      setToNextCalendarView: Function;
      setToPreviousCalendarView: Function;
      loadCalendarView: Function;
      setReminderState: Function;
      addReminder: Function;
      updateReminder: Function;
      deleteReminder: Function;
    }


    export interface State {
      /* empty */
    }
}