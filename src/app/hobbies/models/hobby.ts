import { BilingualString } from "src/app/shared/models/billingual-string";

export class Hobby{
    id: number;
    name?: BilingualString;
    description?: BilingualString;
    imageUrl: string;

    constructor(id?: number, name?: BilingualString, description?: BilingualString, imageUrl?: string){
        this.id = id ? id : 0;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl ? imageUrl : '';
    }
}