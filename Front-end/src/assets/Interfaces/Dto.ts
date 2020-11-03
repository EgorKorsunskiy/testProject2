interface updated_data {
    name:string;
    value:string;
}

export interface PutDto{
    user_id?:number;
    updated_data?:updated_data[];
}