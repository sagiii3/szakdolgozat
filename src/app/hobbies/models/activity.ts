export class Activity {
    id?: string;
    spentHours?: number;
    notes?: string;

    constructor(spentHours?: number, notes?: string){
        this.spentHours = spentHours;
        this.notes = notes;
    }
}