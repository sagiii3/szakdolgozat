import { BilingualString } from "src/app/shared/models/billingual-string";

export class Hobby{
    id?: string;
    name: BilingualString;
    description: BilingualString;
    imageUrl?: string;

    constructor(name: BilingualString, description: BilingualString, imageUrl?: string, id?: string){
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}