export class Activity {
    id?: string;
    spentHours?: number;
    activityNotes?: string;

    constructor(spentHours?: number, activityNotes?: string){
        this.spentHours = spentHours;
        this.activityNotes = activityNotes;
    }
}