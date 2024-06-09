import { Injectable } from '@nestjs/common';
import { UserEntity } from './interface/user.entity';
import { CreateUserDto } from './dtos/createrUser.dto';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}

    async createUser(creatUserDto:CreateUserDto):Promise<UserEntity> {
        const saltOrRounds = 10;

        const passwordhashed = await hash(creatUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...creatUserDto,
            password: passwordhashed,
        });

    }  

    async getAllUser(): Promise<UserEntity[]>{
        return this.userRepository.find();
    }
}
