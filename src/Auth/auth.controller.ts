import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { SignInCredDto } from './dto/signIn-credential.dto';
import { User } from './user.schema';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @ApiTags('sign Up')
    @ApiOperation({ summary: 'Remember to use capital and lower letter and sign' })
    @Post('/signup')
    signUp(
        @Body(ValidationPipe) authCredentialDto: AuthCredentialDto,
    ): Promise<User> {
        return this.authService.signUp(authCredentialDto)
    }
    
    @ApiTags('sign In')
    @Post('/signin')
    signIn(@Body(ValidationPipe) signInCredDto: SignInCredDto ): Promise<Object> {
        return this.authService.signIn(signInCredDto)
    }

}
