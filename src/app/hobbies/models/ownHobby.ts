import { Activity } from "./activity";
import { Hobby } from "./hobby";

export class OwnHobby extends Hobby{
    activity: Activity[];

    constructor(hobby: Hobby, activity?: Activity[]){
        super(hobby.id, hobby.name, hobby.description, hobby.imageUrl);
        this.activity = activity || [];
    }
}