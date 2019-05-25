import * as React from 'react';
import './header.css';

export const Header = (props) => (
  <header>
    <div className="logo">
      <img src={'../assets/clipboard.svg'} />
      <h1 >Cal</h1>
    </div>
    <div className="toolbar">
      <h2 className="current-month">{props.date}</h2>
    </div>
    <div className="date-change">
      <span>
        <button onClick={() => {
          if (props.month !== 0) {
            props.setToPreviousCalendarView({ month: props.month - 1, year: props.year });
          } else if (props.month === 0) {
            props.setToPreviousCalendarView({ month: 11, year: props.year - 1 })
          }

        }}>
          <img src={'../assets/chevron-sign-to-left.svg'} />
        </button>
      </span>
      <span>
        <button onClick={() => {
          if (props.month !== 11) {
            props.setToNextCalendarView({ month: props.month + 1, year: props.year })
          } else if (props.month === 11) {
            props.setToNextCalendarView({ month: 0, year: props.year + 1 })
          }
        }}>
          <img src={'../assets/chevron-sign-to-right.svg'} />
        </button>
      </span>
    </div>
  </header>
);
