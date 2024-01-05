export class User {
    id?: string;
    username?: string;
    fullName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;

    constructor(username?: string, fullName?: string, email?: string, password?: string, confirmPassword?: string) {
        this.username = username;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }  
}
