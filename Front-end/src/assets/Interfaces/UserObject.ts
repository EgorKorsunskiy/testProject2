export const enum Marital_status {
    'Married'='Married',
    'Widowed'='Widowed',
    'Separated'='Separated',
    'Divorced'='Divorced',
    'Single'='Single'
}

export const enum Gender {
    'Male'='Male',
    'Female'='Female'
}

export interface IUpdatedData {
    target:string;
    value:string
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