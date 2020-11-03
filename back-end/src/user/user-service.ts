import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async findOne(id): Promise<User> {
    return await this.usersRepository.findOne(id)
  }

  createUser(data){
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

  delete(id){
    this.usersRepository.delete(id);
  }

  patch(data:JSON){
    data['updated_data'].forEach(el => {
      if(el['name'] == 'First_name'){
        this.usersRepository.update(data['user_id'], {
          first_name:el['value']
        })
      }
      else if(el['name'] == 'Last_name'){
        this.usersRepository.update(data['user_id'], {
          last_name:el['value']
        })
      }
      else if(el['name'] == 'Job'){
        this.usersRepository.update(data['user_id'], {
          job:el['value']
        })
      }
      else if(el['name'] == 'Marital status'){
        this.usersRepository.update(data['user_id'], {
          marital_status:el['value']
        })
      }
      else if(el['name'] == 'Adress'){
        this.usersRepository.update(data['user_id'], {
          adress:el['value']
        })
      }
      else if(el['name'] == 'Gender'){
        this.usersRepository.update(data['user_id'], {
          gender:el['value']
        })
      }
      else if(el['name'] == 'Hobby'){
        this.usersRepository.update(data['user_id'], {
          hobby:el['value']
        })
      }
    });
  }
}