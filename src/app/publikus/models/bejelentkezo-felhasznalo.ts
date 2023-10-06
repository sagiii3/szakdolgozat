export class BejelentkezoFelhasznalo{
    email: string;
    jelszo: string;

    constructor(email?: string, jelszo?: string){
        this.email = email ? email : '';
        this.jelszo = jelszo ? jelszo : '';
    }
}