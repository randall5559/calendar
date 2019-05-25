import { ReminderModal } from '../models';

const initialState: ReminderModal = {
    date: null,
    day: null,
    time: null,
    monthIndex: null,
    label: null,
    color: null,
    modalOpen: false,
    status: null
};

export const reminderReducer = (state: ReminderModal = initialState, action) => {
    switch (action.type) {
        case 'REMINDER_STATE':
            return Object.assign({}, state, action.payload);
        default:
            return state;
    }
};
