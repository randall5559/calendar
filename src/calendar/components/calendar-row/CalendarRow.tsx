import * as React from 'react';

export const CalendarRow = (props: React.Props<any>) => (
    <div className="calendar__week">
        { props.children }
    </div>
);
