import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { get } from 'http';
import { json } from 'stream/consumers';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createrUser.dto';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';


@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @UsePipes(ValidationPipe)
    @Post()
        async createUser(@Body()createUser: CreateUserDto):Promise<UserEntity>{
            return this.userService.createUser(createUser)
        }


        @Get()
        async getAllUsers(): Promise<ReturnUserDto[]> {
            return (await this.userService.getAllUser()).map(
                (UserEntity) => new ReturnUserDto(UserEntity),
            );
        }

        @Get('/:userId')
        async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto>{
            return new ReturnUserDto(
            await this.userService.getUserByIdUsingRelations(userId),
        );
        }
}
