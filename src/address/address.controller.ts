import { Body, Controller, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/createAddress.dto';
import { AddressEntity } from './entities/address.entity';
import { Roles } from 'src/decorators/roles.decorator';
import { UserType } from 'src/user/enum/user-type.enum';


@Controller('address')
export class AddressController {

    constructor( private readonly adressService: AddressService){}

    @Roles(UserType.User)
    @Post('/:userId')
    @UsePipes(ValidationPipe)
    async createAddress(
        @Body()createAddressDto: CreateAddressDto,
        @Param('userId') userId: number,
    ): Promise<AddressEntity>{
        return this.adressService.createAddress(createAddressDto, userId);
    }
}
