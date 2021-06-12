import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @ApiTags('sign Up')
    @ApiOperation({ summary: 'Remember to use capital and lower letter and sign' })
    @Post('/signup')
    signUp(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto ): Promise<User> {
        return this.authService.signUp(authCredentialDto)
    }
    
    @ApiTags('sign In')
    // @ApiBody({"username": "saeed", "password": "asldfjwe"})
    @Post('/signin')
    signIn(@Body(ValidationPipe) authCredentialDto: AuthCredentialDto ): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialDto)
    }

}
