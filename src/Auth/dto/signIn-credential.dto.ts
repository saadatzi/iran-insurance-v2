import { IsDate, IsDateString, IsEmail, IsEmpty, IsIn, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';
import { isValidObjectId } from "mongoose";


export class SignInCredDto {
    
    @IsString()
    @MinLength(4)
    @MaxLength(30)
    @ApiProperty({
        description: 'username, email, mobile',
        default: 'saeed123',
      })
    validationInput: string

    @IsString()
    @IsNotEmpty()
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