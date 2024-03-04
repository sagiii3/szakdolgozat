import { BilingualString } from "src/app/shared/models/billingual-string";

export class Category{
    name: BilingualString;
    id?: string;

    constructor(name: BilingualString, id?: string){
        this.name = name;
        this.id = id;
    }
}