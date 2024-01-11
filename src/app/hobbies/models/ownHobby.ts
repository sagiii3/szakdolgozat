import { Hobby } from "./hobby";

export class OwnHobby extends Hobby{
    spentHours?: number;
    constructor(hobby: Hobby, spentHours?: number){
        super(hobby.id, hobby.name, hobby.description, hobby.imageUrl);
        this.spentHours = spentHours || 0;
    }
}