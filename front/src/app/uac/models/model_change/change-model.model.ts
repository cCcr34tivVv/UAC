export class ChangeModel {
    password : string;
    repassword : string;

    constructor (password : string, repassword : string) {
        this.password = password;
        this.repassword = repassword;
    }
}