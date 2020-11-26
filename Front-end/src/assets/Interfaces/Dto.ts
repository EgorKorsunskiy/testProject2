import { IUpdatedData } from './UserObject';

export interface PatchDto{
    user_id?:number;
    updated_data?:IUpdatedData[];
}