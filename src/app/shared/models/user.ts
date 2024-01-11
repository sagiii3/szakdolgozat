import { OwnHobby } from "src/app/hobbies/models/ownHobby";

export class User {
    id?: string;
    username?: string;
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    photoURL?: string;

    ownHobbies?: OwnHobby[];

    constructor(id?: string, username?: string, fullName?: string, email?: string, password?: string,
         confirmPassword?: string, photoURL?: string, ownHobbies?: OwnHobby[]) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.photoURL = photoURL;
        this.ownHobbies = ownHobbies;
    }  
}
