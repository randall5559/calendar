import * as React from 'react';
import './calendar.css';

export const Calendar = (props: React.Props<any>) => (
    <div className="calendar">
      <div className="calendar__header">
        <div>mon</div>
        <div>tue</div>
        <div>wed</div>
        <div>thu</div>
        <div>fri</div>
        <div>sat</div>
        <div>sun</div>
      </div>
      { props.children }
    </div>
);
