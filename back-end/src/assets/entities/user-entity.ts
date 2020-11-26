import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Gender, MaritalStatus } from '../interfaces/UserEntityInterface';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    first_name:string;

    @Column()
    last_name:string;

    @Column()
    job:string;

    @Column()
    marital_status:MaritalStatus;

    @Column()
    adress: string;

    @Column()
    gender:Gender;

    @Column()
    hobby:string;

}
