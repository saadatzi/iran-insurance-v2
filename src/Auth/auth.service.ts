import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthCredentialDto } from './dto/auth-credentials.dto';
import { SignInCredDto } from './dto/signIn-credential.dto';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt'
import { LoggerService } from '@shared/logger.service';


@Injectable()
export class AuthService {
    private readonly logger = new LoggerService('AuthService')
    constructor(
        @InjectModel(User.name)
        private readonly userModel: Model<User>,
        private readonly jwtService: JwtService
    ) {}

    async signUp(authCredentialDto: AuthCredentialDto) : Promise<User> {
        const salt = await bcrypt.genSalt() 
        authCredentialDto.password = await this.hashPassword(authCredentialDto.password, salt) 
        authCredentialDto['salt'] = salt
        const createdUser = new this.userModel(authCredentialDto)
        return await createdUser.save()
    }

    private async hashPassword(password: string, salt: string) : Promise<string> {
        return bcrypt.hash(password, salt)
    }

    async signIn(signInCredDto: SignInCredDto) : Promise<Object> {
        const user = await this.validateUserPassword(signInCredDto)
        
        if(!user.username) throw new UnauthorizedException('Invalid credentials')

        const username = user.username

        const payload :JwtPayload = {username}
        const accessToken = this.jwtService.sign(payload)

        this.logger.log(`Generated JWT Token with payload  ${JSON.stringify(payload)}`)

        const response = {
            success: true,
            msg: 'LOGGED_IN_SUCCESS',
            token: accessToken,
            user: user,
          };
        return response
    
    }

    private async validateUserPassword(signInCredDto: SignInCredDto) {
        const {validationInput, password} = signInCredDto

        const srchVal = this.mobileOEmailOUsername(validationInput)
        const user = await this.userModel.findOne({[srchVal]: validationInput})

        if(user && await this.validatePassword(user, password)) {
            return user
        }else {
            return null
        }
    }

    private async validatePassword(user: User, password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, user.salt)
        return hash === user.password
    }

    private mobileOEmailOUsername(validationInput: string): string {
        if(validationInput.match(/[+0]{1}[\d]{10,12}/)) return 'mobile'
        if(validationInput.match(/[\d\w]+\@[\d\w]+\.[\w]{2,5}/)) return 'email'
        if(validationInput.match(/[\d\w]+/)) return 'username'

        return null
    }

}
