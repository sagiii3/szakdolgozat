import { BilingualString } from "src/app/shared/models/billingual-string";
import { Category } from "./category";

export class Hobby{
    id?: string;
    name: BilingualString;
    description: BilingualString;
    imageUrl?: string;
    categories: Category[] = [];
    categoryIds: string[] = [];

    constructor(name: BilingualString, description: BilingualString, imageUrl?: string, id?: string, categories?: Category[], categoryIds?: string[]){
        this.id = id;
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.categories = categories ? categories : [];
        this.categoryIds = categoryIds ? categoryIds : [];
    }
}