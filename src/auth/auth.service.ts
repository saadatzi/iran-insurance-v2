import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';
import { PeopleRepository } from './user.repository';

@Injectable()
export class AuthService {
    private logger = new Logger('AuthService')
    constructor(
        @InjectRepository(PeopleRepository)
        private peopleRepository: PeopleRepository,
        private jwtService: JwtService
    ) {}

    async signUp(authCredentialDto: AuthCredentialDto) : Promise<User> {
        return this.peopleRepository.signUp(authCredentialDto)
    }

    async signIn(authCredentialDto: AuthCredentialDto) : Promise<{accessToken: string}> {
        const username = await this.peopleRepository.validateUserPassword(authCredentialDto)
        
        if(!username) throw new UnauthorizedException('Invalid credentials')

        const payload :JwtPayload = {username}
        const accessToken = this.jwtService.sign(payload)

        this.logger.debug(`Generated JWT Token with payload  ${JSON.stringify(payload)}`)
    
        return { accessToken }
    }
}
