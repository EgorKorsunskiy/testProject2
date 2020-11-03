export const enum Marital_status {
    'Married',
    'Widowed',
    'Separated',
    'Divorced',
    'Single'
}

export const enum Gender {
    'Male',
    'Female'
}

export interface IUser {
    id?:number;
    first_name:string;
    last_name:string;
    job:string;
    marital_status:Marital_status;
    adress:string;
    gender:Gender;
    hobby:string;
}