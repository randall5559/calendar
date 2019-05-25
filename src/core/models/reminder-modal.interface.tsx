export interface ReminderModal {
    id?: string;
    label: string;
    day: string;
    time: string;
    monthIndex: number;
    date: Date;
    color: string;
    modalOpen: boolean;
    status: string;
}