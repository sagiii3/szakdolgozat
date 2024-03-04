import { Activity } from "./activity";
import { Hobby } from "./hobby";

export class OwnHobby extends Hobby{
    activities: Activity[];

    constructor(hobby: Hobby, activity?: Activity[]){
        super(hobby.name, hobby.description, hobby.imageUrl, hobby.id);
        this.activities = activity || [];
    }

    hobbyCopy(hobby: Hobby){
        this.name = hobby.name;
        this.description = hobby.description;
        this.imageUrl = hobby.imageUrl;
        this.id = hobby.id;
    }
}