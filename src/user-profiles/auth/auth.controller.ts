import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from "./auth.service";
import {RegisterUserDTO} from "./dto/RegisterUserDTO";

@Controller('users')
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post()
    registerUser(@Body('user') registerUserDto: RegisterUserDTO): any {
        return this.authService.registerNewUser(registerUserDto);
    }
}
