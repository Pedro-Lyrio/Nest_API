import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateAddressDto{

    @ApiProperty({required:true, default:`bloco 2 apt 301`})
    @IsString()
    @IsOptional()
    complement: string;

    @IsInt()
    numberAddress: number;

    @IsString()
    cep: string;

    @IsInt()
    cityId:number;

}
