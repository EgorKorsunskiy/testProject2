import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGetUserDto, PatchUserDto } from 'src/assets/interfaces/DTO';
import { Repository } from 'typeorm';
import { User } from '../assets/entities/user-entity';

@Injectable()
export class UserService {

  constructor(@InjectRepository(User)
  private usersRepository: Repository<User>){}

  async findAll(count=0): Promise<User[]> {
    if(count){
      return await (await this.usersRepository.find()).slice(0, count);
    }
    return await this.usersRepository.find();
  }

  async findOne(id:number): Promise<User> {
    return await this.usersRepository.findOne(id)
  }

  createUser(data:CreateGetUserDto){
    let user = new User();

    user.first_name = data['first_name'];
    user.last_name = data['last_name'];
    user.job = data['job'];
    user.marital_status = data['marital_status'];
    user.adress = data['adress'];
    user.gender = data['gender'];
    user.hobby = data['hobby'];
    this.usersRepository.save(user);
  }

  delete(id:number){
    this.usersRepository.delete(id);
  }

  patch(data:PatchUserDto){
    let updatedData = {};

    data['updated_data'].forEach(el => {
      updatedData[el["target"]] = el["value"];
    })
    this.usersRepository.update(data['user_id'], updatedData);
  }
}