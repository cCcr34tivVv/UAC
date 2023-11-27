export class RegisterModel {
    username : string
    email  : string 
    password : string
    repassword : string

    constructor(username : string, email : string, password : string, repassword : string)
    {
        this.username = username;
        this.email = email;
        this.password = password;
        this.repassword = repassword;
    }
}
