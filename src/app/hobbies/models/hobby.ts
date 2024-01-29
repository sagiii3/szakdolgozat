import { BilingualString } from "src/app/shared/models/billingual-string";

export class Hobby{
    id: string;
    name: BilingualString;
    description?: BilingualString;
    imageUrl: string;

    constructor(id: string, name: BilingualString, description?: BilingualString, imageUrl?: string){
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl ? imageUrl : '';
    }
}