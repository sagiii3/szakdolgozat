import { Activity } from "./activity";
import { Hobby } from "./hobby";

export class OwnHobby extends Hobby{
    activities: Activity[];

    constructor(hobby: Hobby, activity?: Activity[]){
        super(hobby.name, hobby.description, hobby.imageUrl, hobby.id);
        this.activities = activity || [];
    }
}