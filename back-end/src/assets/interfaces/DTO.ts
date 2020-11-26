import { MaritalStatus, Gender } from "./UserEntityInterface";
import { IsNotEmpty, IsNumber, IsString, MinLength, ValidateNested } from 'class-validator';
import { Type } from "class-transformer/decorators";


class UpdatedData {
    @IsNotEmpty()
    @IsString()
    target:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    value:string;
}

export class CreateGetUserDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    first_name:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    last_name:string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    job:string;

    @IsNotEmpty()
    marital_status:MaritalStatus;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    adress:string;

    @IsNotEmpty()
    gender:Gender;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    hobby:string;
}

export class PatchUserDto{
    @IsNumber()
    @IsNotEmpty()
    user_id:number;

    @ValidateNested()
    @Type(() => UpdatedData)
    updated_data:UpdatedData[];
}