import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategory {
  @ApiProperty()
  @IsString()
  name: string;
}