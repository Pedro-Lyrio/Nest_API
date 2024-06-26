import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { ReturnUserDto } from '../user/dtos/returnUser.dto';
import { AuthService } from './auth.service';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @ApiBearerAuth()
    @UsePipes(ValidationPipe)
    @Post()
    async login(@Body() loginDto: LoginDto): Promise<ReturnLogin> {
        return this.authService.login(loginDto);

    }
}
