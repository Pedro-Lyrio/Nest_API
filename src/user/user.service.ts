import { BadGatewayException,BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dtos/createrUser.dto';
import { createPasswordHashed, validatePassword } from '../utils/password';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';
import { UpdatePasswordDTO } from './dtos/update-password.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}

    async createUser(creatUserDto:CreateUserDto):Promise<UserEntity> {
        
        const user = await this.findUserByEmail(creatUserDto.email).catch(
            () => undefined,
          );
      
          if (user) {
            throw new BadGatewayException('email já existente');
          }
      
          const passwordHashed = await createPasswordHashed(creatUserDto.password);

        return this.userRepository.save({
            ...creatUserDto,
            typeUser:UserType.User,
            password: passwordHashed,
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
        
        return user;
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

    async updatePasswordUser(
        updatePasswordDTO: UpdatePasswordDTO,
        userId: number,
      ): Promise<UserEntity> {
        const user = await this.findUserById(userId);
    
        const passwordHashed = await createPasswordHashed(
          updatePasswordDTO.newPassword,
        );
    
        const isMatch = await validatePassword(
          updatePasswordDTO.lastPassword,
          user.password || '',
        );
    
        if (!isMatch) {
          throw new BadRequestException('Last password invalid');
        }
    
        return this.userRepository.save({
          ...user,
          password: passwordHashed,
        });
      }
}
