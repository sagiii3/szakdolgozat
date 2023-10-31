export class Felhasznalo{
    felhasznaloNev?: string;
    teljesNev?: string;
    email?: string;
    jelszo?: string;
    jelszoIsmet?: string;

    constructor(felhasznaloNev?: string, teljesNev?: string, email?: string, jelszo?: string, jelszoIsmet?: string){
        this.felhasznaloNev = felhasznaloNev;
        this.teljesNev = teljesNev;
        this.email = email;
        this.jelszo = jelszo;
        this.jelszoIsmet = jelszoIsmet;
    }  
}