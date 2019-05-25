import Drawer from 'react-drag-drawer'
import * as React from 'react';
import './reminder.css'

export const Reminder = (props) => (
  <Drawer
    open={props.reminder.modalOpen}
  >
    <div className="modal-container">
      {
        (props.reminder.status === 'edit') ?
          (
            <h3>Edit Reminder {props.reminder.label}</h3>
          ) :
          (
            <h3>Set a Reminder for {props.reminder.date ? props.reminder.date.toDateString() : ''}</h3>
          )
      }
      <input
        className="modal-input"
        type="text"
        value={ props.reminder.label ? props.reminder.label : '' }
        onChange={ (event) => {
          if (event.target.value.length <= 30) {
            props.setReminderState({ label: event.target.value });
          }
        }}
        placeholder="Reminder Label"
      />
      <div className="date-time">
        <p>Choose a day and time:</p>
        <select
          value={props.reminder.day}
          onChange={ (e) => {
            props.setReminderState({ day: e.currentTarget.value });
          }}
        >
          {
            props.days.map((day, ix) => <option key={ix} value={day}>{day}</option>)
          }
        </select>
        <select
          value={props.reminder.time ? props.reminder.time: ''}
          onChange={ (e) => {
            props.setReminderState({ time: e.currentTarget.value });
          }}
        >
          {
            ['times'].reduce((acc: any, opt: string) => {
              var quarterHours = ["00", "15", "30", "45"];

              // generate option selection
              for(var i = 0; i <= 24; i++){
                for(var j = 0; j < 4; j++){
                  // Using slice() with negative index => You get always (the last) two digit numbers.
                  acc.push( ('0' + i).slice(-2) + ":" + quarterHours[j] );
                }
              }

              return acc;
            } , [])
            .filter((t, ix) => ix > 3 && ix < 97)
            .map((time, ix) => <option key={ix} value={time}>{time}</option>)
          }
        </select>
      </div>
      <div className="color-box-wrapper">
        {
          ['green', 'red', 'blue', 'orange', 'purple', 'gray']
            .map((color, index) => {
              return (
                <span
                  key={index}
                  id={color}
                  className={color === props.reminder.color ? `color-box color-active ${color}` : `color-box ${color}`}
                  onClick={() => {
                    props.setReminderState({ color: color });
                  }}
                ></span>
              )
            })
        }
      </div>
      <div className="btn-wrapper">
        <button
          className="btn-close"
          onClick={ () => props.setReminderState({ modalOpen: false }) }
        >
          Cancel
        </button>
        <button
          className={(props.reminder.status === 'edit') ? 'btn-close btn-delete' : 'btn-close btn-delete hide'}
          onClick={ () => props.setReminderState({
            modalOpen: false,
            status: 'delete'
          }) }
        >
          Delete Reminder
        </button>
        <button
          className="btn-close btn-save"
          onClick={ () => props.setReminderState({
            time: props.reminder.time ? props.reminder.time : '01:00',
            modalOpen: false,
            status: (props.reminder.status === 'edit') ? 'update' : 'save'
          }) }
        >
          { (props.reminder.status === 'edit') ? 'Update Reminder' : 'Save Reminder' }
        </button>
      </div>
    </div>
  </Drawer>
);
