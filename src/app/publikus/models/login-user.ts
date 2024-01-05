export class LoginUser{
    email: string;
    password: string;

    constructor(email?: string, password?: string){
        this.email = email ? email : '';
        this.password = password ? password : '';
    }
}