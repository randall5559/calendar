import { CalendarReminder } from "./calendar-reminder.interface";

export interface CalendarCell {
    id?: string;
    className?: string;
    date?: Date;
    day: number
    monthIndex?: number
    year?: number
    reminders?: CalendarReminder[];
    setReminderState: Function;
}
