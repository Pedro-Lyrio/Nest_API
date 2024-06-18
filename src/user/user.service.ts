import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
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
            typeUser:1,
            password: passwordhashed,
        });

    }  

    async getUserByIdUsingRelations(userId: number): Promise<UserEntity>{
        return this.userRepository.findOne({
            where:{
                id:userId,
            },
            relations:{
                addresses:{
                    city:{
                        state:true,
                    },
                },
            },
        });
    }

    async getAllUser(): Promise<UserEntity[]>{
        return this.userRepository.find();
    }

    async findUserById(userId:number): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where:{
                id: userId,
            },
        });
        if(!user){
            throw new NotFoundException(`UserId: ${userId} Not found`);
        }
        
        return;
    }

    async findUserByEmail(email:string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where:{
               email,
            },
        });
        if(!user){
            throw new NotFoundException(`Email: ${email} Not found`);
        }
        
        return user;
    }
}