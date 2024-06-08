import { Injectable } from '@nestjs/common';
import { User } from './interface/user.interface';
import { CreateUserDto } from './dtos/createrUser.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
    private users: User[] = [];

    async createUser(creatUserDto:CreateUserDto):Promise<User> {
        const saltOrRounds = 10;

        const passwordhashed = await hash(creatUserDto.password, saltOrRounds);

        const user: User ={
            ...creatUserDto,
            id: this.users.length + 1,
            password: passwordhashed,
        }

        this.users.push(user);
        return user;
    }  

    async getAllUser(): Promise<User[]>{
        return this.users;
    }
}
