export class Hobby{
    id: number;
    name: string;
    description: string;
    imageUrl: string;

    constructor(id?: number, name?: string, description?: string, imageUrl?: string){
        this.id = id ? id : 0;
        this.name = name ? name : '';
        this.description = description ? description : '';
        this.imageUrl = imageUrl ? imageUrl : '';
    }
}