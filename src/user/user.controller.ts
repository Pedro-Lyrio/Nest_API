import { Body, Controller, Get, Post } from '@nestjs/common';
import { get } from 'http';
import { json } from 'stream/consumers';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createrUser.dto';
import { UserEntity } from './interface/user.entity';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Post()
        async createUser(@Body()createUser: CreateUserDto):Promise<UserEntity>{
            return this.userService.createUser(createUser)
        }


        @Get()
        async getAllUsers(): Promise<UserEntity[]> {
            return this.userService.getAllUser();
        }
}
