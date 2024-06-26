import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { Roles } from '../decorators/roles.decorator';
import { UserId } from '../decorators/user-id.decorator';
import { CreateUserDto } from './dtos/createrUser.dto';
import { ReturnUserDto } from './dtos/returnUser.dto';
import { UpdatePasswordDTO } from './dtos/update-password.dto';
import { UserEntity } from './entities/user.entity';
import { UserType } from './enum/user-type.enum';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @UsePipes(ValidationPipe)
    @Post()
    @ApiBody({type : CreateUserDto})
        async createUser(@Body()createUser: CreateUserDto):Promise<UserEntity>{
            return this.userService.createUser(createUser)
        }

        @Roles(UserType.Admin)
        @Get()
        async getAllUsers(): Promise<ReturnUserDto[]> {
            return (await this.userService.getAllUser()).map(
                (UserEntity) => new ReturnUserDto(UserEntity),
            );
        }

        @Roles(UserType.Admin)
        @Get('/:userId')
        async getUserById(@Param('userId') userId: number): Promise<ReturnUserDto>{
            return new ReturnUserDto(
            await this.userService.getUserByIdUsingRelations(userId),
        );
        }

        @Roles(UserType.Admin, UserType.User)
        @Patch()
        @UsePipes(ValidationPipe)
        async updatePasswordUser(
          @Body() updatePasswordDTO: UpdatePasswordDTO,
          @UserId() userId: number,
        ): Promise<UserEntity> {
          return this.userService.updatePasswordUser(updatePasswordDTO, userId);
        }
}
