import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { get } from 'http';
import { json } from 'stream/consumers';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createrUser.dto';
import { UserEntity } from './entities/user.entity';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UserId } from 'src/decorators/user-id.decorator';
import { UpdatePasswordDTO } from './dtos/update-password.dto';


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

        @Patch()
        @UsePipes(ValidationPipe)
        async updatePasswordUser(
          @Body() updatePasswordDTO: UpdatePasswordDTO,
          @UserId() userId: number,
        ): Promise<UserEntity> {
          return this.userService.updatePasswordUser(updatePasswordDTO, userId);
        }
}
