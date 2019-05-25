import * as React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { AppModel } from './models/app.model';
import { Header } from './components';
import { Reminder } from './components/reminder/Reminder';
import { CalendarContainer } from '../calendar/containers';
import { loadCalendarView, updateReminder, addReminder, deleteReminder } from '../calendar/actions/';
import { setToNextCalendarView, setToPreviousCalendarView } from './actions/calendar-date.action';
import { setReminderState } from './actions/reminder-modal.action';
import { CalendarDate } from './models/calendar-date.interface';
import { CalendarCell } from '../calendar/models/calendar-cell.interface';

@reduxify(
  (state) => ({
    calendar: state.calendarReducer,
    date: state.calendarDateReducer,
    reminder: state.reminderReducer
  }),
  (dispatch) => ({
    loadCalendarView: bindActionCreators(loadCalendarView, dispatch),
    setToNextCalendarView: bindActionCreators(setToNextCalendarView, dispatch),
    setToPreviousCalendarView: bindActionCreators(setToPreviousCalendarView, dispatch),
    setReminderState: bindActionCreators(setReminderState, dispatch),
    addReminder: bindActionCreators(addReminder, dispatch),
    updateReminder: bindActionCreators(updateReminder, dispatch),
    deleteReminder: bindActionCreators(deleteReminder, dispatch)
  })
)
class App extends React.Component<AppModel.Props, AppModel.State> {

  constructor(props: any) {
    super(props);
  }

  /**
   * LifeCycle Hook: trigger onload
   *
   * @memberof App
   */
  public componentDidMount() {
    // load a default or persisted calendar view
    this.props.loadCalendarView();
  }

  /**
   * LifeCycle Hook: trigger on an update
   *
   * @param {*} nextProps
   * @returns
   * @memberof App
   */
  public shouldComponentUpdate(nextProps) {
    const { date: nextDate, reminder } = nextProps;
    const { date, calendar } = this.props;

    if (nextDate && nextDate.month !== date.month) {
      const [ calendarDate, calendarViewKey ] = this.getCalendarDateAndKey(nextDate);

      if (!calendar.hasOwnProperty(calendarViewKey)) {
        this.props.loadCalendarView({ month: (nextDate.month + 1), year: nextDate.year });
        return false;
      }

      return true;
    } else if (reminder.status && reminder.status !== 'edit') {
      const [ calendarDate, calendarViewKey ] = this.getCalendarDateAndKey(date);
      const reminderObj = {
        calKey: calendarViewKey,
        color: reminder.color,
        label: reminder.label,
        date: reminder.date,
        day: reminder.day,
        time: reminder.time,
        monthIndex: reminder.monthIndex
      };

      if (reminder.status === 'save') {
        this.props.addReminder(reminderObj);
      } else if (reminder.status === 'update') {
        this.props.updateReminder(Object.assign({}, reminderObj, { id: reminder.id }));
      } else if (reminder.status === 'delete') {
        this.props.deleteReminder(Object.assign({}, reminderObj, { id: reminder.id, status: reminder.status }));
      }

      this.props.setReminderState({ status: null });
      return false;
    }

    return true;
  }

  /**
   * Get proper formatted calendar date and key for Cal Remind view name and calendar grid
   *
   * @private
   * @param {CalendarDate} date
   * @returns
   * @memberof App
   */
  private getCalendarDateAndKey(date: CalendarDate) {
    const monthName = (ix) => [
      "January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"
    ][ix];

    const dd = new Date();

    return (date.month && date.year) ?
       [`${monthName(date.month)} ${date.year}`, `${date.month+1}-${date.year}` ] :
       [`${monthName(dd.getMonth())} ${dd.getFullYear()}`, `${dd.getMonth()+1}-${dd.getFullYear()}`];
  }

  render() {
    const {
      reminder,
      calendar,
      date,
      setToNextCalendarView,
      setToPreviousCalendarView,
      setReminderState
    } = this.props;
    const [ calendarDate, calendarViewKey ] = this.getCalendarDateAndKey(date);
    const [ month, year ] = calendarViewKey.split('-').map(d => parseInt(d, 10));
    let days = [];
    if (calendar.hasOwnProperty(calendarViewKey)) {
      days = calendar[calendarViewKey].reduce((acc, week) => {
        week.forEach((day: CalendarCell) => {
          if (day.className.match('month-day')) {
            acc.push(day.day);
          }
        });

        return acc;
      }, days);
    }

    return (
      <div className="wrapper">
        <main>
          <Header
            date={calendarDate}
            month={(month - 1)}
            year={year}
            setToNextCalendarView={setToNextCalendarView}
            setToPreviousCalendarView={setToPreviousCalendarView}
          />
          <CalendarContainer
            calendar={calendar}
            calendarViewKey={calendarViewKey}
            setReminderState={setReminderState}
          />
          <Reminder
            reminder={reminder}
            days={days}
            setReminderState={setReminderState}
          />
        </main>
      </div>
    );
  }
}

export default App;

function reduxify(mapStateToProps, mapDispatchToProps?, mergeProps?, options?) {
  return target => (connect(mapStateToProps, mapDispatchToProps, mergeProps, options)(target) as any);
}
