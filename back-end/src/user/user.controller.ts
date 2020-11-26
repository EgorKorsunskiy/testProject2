import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { User } from 'src/assets/entities/user-entity';
import { CreateGetUserDto, PatchUserDto } from 'src/assets/interfaces/DTO';
import { UserService } from './user-service';

@Controller('users')
export class UserController {
    constructor(private userService:UserService){}

    @Get('getAll')
    findAll(): Promise<User[]>{
        const users = this.userService.findAll();

        if(!users){
            throw new NotFoundException()
        }
        return users;
    }

    @Get('getAll/:count')
    find(@Param('count') count): Promise<User[]>{
        const users = this.userService.findAll(count);

        if(!users){
            throw new NotFoundException()
        }
        return users;
    }

    @Get('getOne/:id')
    findOne(@Param('id') id):Promise<User>{
        const users = this.userService.findOne(id);

        if(!users){
            throw new NotFoundException()
        }
        return users;
    }

    @Post('create')
    createUser(@Body() Body:CreateGetUserDto){
        this.userService.createUser(Body)
    }

    @Delete('delete/:id')
    deleteData(@Param('id') id){
        this.userService.delete(id);
    }
    
    @Patch('patch')
    putUpdatedData(@Body() Body:PatchUserDto){
        this.userService.patch(Body);
    }
}
