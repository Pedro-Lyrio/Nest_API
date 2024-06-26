import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';
import { Roles } from '../decorators/roles.decorator';
import { UserType } from '../user/enum/user-type.enum';
import { UserId } from '../decorators/user-id.decorator';
import { ReturnAddressDto } from './dtos/returnAddress.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Roles(UserType.User, UserType.Admin)
@Controller('address')
export class AddressController {

    constructor( private readonly adressService: AddressService){}
    
    @Post()
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body()createAddressDto: CreateAddressDto,
        @UserId() userId: number,
    ): Promise<AddressEntity>{
        return this.adressService.createAddress(createAddressDto, userId);
    }

    @Get()
    async findAddressByUserId(
      @UserId() userId: number,
    ): Promise<ReturnAddressDto[]> {
      return (await this.adressService.findAddressByUserId(userId)).map(
        (address) => new ReturnAddressDto(address),
      );
    }
}
