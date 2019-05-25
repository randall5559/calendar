import * as React from 'react';

import {
    Calendar,
    CalendarRow,
    CalendarCell
} from '../components';
import {
    CalendarModel,
    CalendarCell as ICalendarCell
} from '../models';

/**
 * Wrapper for all task components
 *
 * @export
 * @class TaskContainer
 * @extends {React.Component<TaskModel.Props, TaskModel.State>}
 */
export class CalendarContainer extends React.Component<CalendarModel.Props, CalendarModel.State> {
  constructor(props?: CalendarModel.Props, context?: any) {
    super(props, context);
  }

  render() {
    const {
     calendar,
     calendarViewKey,
     setReminderState
    } = this.props;

    if (Object.keys(calendar).length) {
        return (
            <Calendar>
                {
                    calendar[calendarViewKey].map((calRows: ICalendarCell[], index: number) => {
                    {
                        return(
                            <CalendarRow key={index} >
                                {
                                    calRows.map((calCell: ICalendarCell, _index: number) =>
                                        (
                                            <CalendarCell
                                                key={_index}
                                                className={calCell.className}
                                                day={calCell.day}
                                                monthIndex={calCell.monthIndex}
                                                date={calCell.date}
                                                reminders={calCell.reminders}
                                                setReminderState={setReminderState}
                                            />
                                        )
                                    )
                                }
                            </CalendarRow>
                        )
                    }
                    })
                }
            </Calendar>
        );
    } else {
        return (
            <div>Calendar could not be displayed!</div>
        );
    }

  }
}

