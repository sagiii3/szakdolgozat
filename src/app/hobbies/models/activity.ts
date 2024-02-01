import { Timestamp } from '@firebase/firestore-types';

export class Activity {
    id?: string;
    spentHours?: number;
    notes?: string;
    date?: Timestamp;

    constructor(spentHours?: number, date?: Timestamp, notes?: string,){
        this.spentHours = spentHours;
        this.notes = notes;
        this.date = date;
    }
}