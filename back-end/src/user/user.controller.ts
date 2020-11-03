import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { User } from 'src/assets/entities/user-entity';
import { UserService } from './user-service';

@Controller('users')
export class UserController {
    constructor(private userService:UserService){}

    @Get('getAll')
    findAll(): Promise<User[]>{
        return this.userService.findAll();
    }

    @Get('getAll/:count')
    find(@Param('count') count): Promise<User[]>{
        return this.userService.findAll(count);
    }

    @Get('getOne/:id')
    findOne(@Param('id') id):Promise<User>{
        return this.userService.findOne(id);
    }

    @Post('create')
    createUser(@Body() Body:JSON){
        this.userService.createUser(Body)
    }

    @Delete('delete/:id')
    deleteData(@Param('id') id){
        this.userService.delete(id);
    }
    
    @Patch('patch')
    putUpdatedData(@Body() Body:JSON){
        this.userService.patch(Body);
    }
}
