import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { PassportStrategy } from "@nestjs/passport";
import { JwtPayload } from "./jwt-payload.interface";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { PeopleRepository } from "./user.repository";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(PeopleRepository)
        private peopleRepository: PeopleRepository
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret51'
        })
    }

    async validate(payload: JwtPayload): Promise<User> {
        const { username } = payload
        const user = await this.peopleRepository.findOne({ username })

        if(!user) {
            throw new UnauthorizedException('No user found.')
        }

        return user
    }
}