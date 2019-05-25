import * as React from 'react';

import { Calendar } from './calendar.interface';

export namespace CalendarModel {
    export interface Props extends React.Props<any> {
        calendar: Calendar;
        calendarViewKey: string;
        setReminderState: Function;
    }

    export interface State {
        /* empty */
    }
}