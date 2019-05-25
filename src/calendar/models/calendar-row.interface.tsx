import { CalendarCell } from './calendar-cell.interface';

export interface CalendarRow {
    [key: number]: CalendarCell[];
}
