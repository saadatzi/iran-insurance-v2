import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository, ReturningStatementNotSupportedError } from "typeorm";
import { AuthCredentialDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt'

@EntityRepository(User)
export class PeopleRepository extends Repository<User> {
    async signUp(authCredentialDto: AuthCredentialDto): Promise<User>{
        const { username, password } = authCredentialDto
        
        const user = new User()
        user.username = username
        user.salt = await bcrypt.genSalt()
        user.password = await this.hashPassword(password, user.salt)

        try {
            await user.save()
            return user
        } catch (error) {
            if(error.code === '23505') { //duplicate username
                throw new ConflictException('Username already exists.')
            }else{
                throw new InternalServerErrorException()
            }
        }
        
    }

    async validateUserPassword(authCredentialDto: AuthCredentialDto): Promise<string> {
        const {username, password} = authCredentialDto
        const user = await this.findOne({username})

        if(user && await user.validatePassword(password)) {
            return user.username
        }else {
            return null
        }
    }

    private async hashPassword(password: string, salt: string) : Promise<string> {
        return bcrypt.hash(password, salt)
    }
}