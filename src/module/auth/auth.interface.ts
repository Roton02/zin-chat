export interface IUser {
    name : string;
    email : string;
    password : string;
    isActive : boolean;
}

export interface ILogin {
    email : string;
    password : string;
}