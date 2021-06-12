import { IsString, Matches, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';


export class AuthCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty({
        description: 'username',
        default: 'saeed',
      })
    username: string
    
    
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, 
    { message: 'password is too weak.' })
    @ApiProperty({
        description: 'password',
        default: '1234Ert*&',
      })
    password: string
}