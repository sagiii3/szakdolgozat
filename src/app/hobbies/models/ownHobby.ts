export class OwnHobby{
    id?: string;
    spentHours?: number;
    constructor(id?: string, spentHours?: number){
        this.id = id;
        this.spentHours = spentHours || 0;
    }
}