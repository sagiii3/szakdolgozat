export class User {
    id?: string;
    username?: string;
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    photoURL?: string;

    constructor(id?: string, username?: string, fullName?: string, email?: string, password?: string, confirmPassword?: string, photoURL?: string) {
        this.id = id;
        this.username = username;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
        this.photoURL = photoURL;
    }  
}
