import { IsDate, IsDateString, IsEmail, IsEmpty, IsIn, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';
import { isValidObjectId } from "mongoose";


export class AuthCredentialDto {
    @IsString()
    @MinLength(2)
    @MaxLength(25)
    @ApiProperty({
        description: 'firstName',
        default: 'saeed',
      })
    firstName: string

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @ApiProperty({
        description: 'lastName',
        default: 'Deljoo',
      })
    lastName: string

    @IsString()
    @MinLength(4)
    @MaxLength(30)
    @IsNotEmpty()
    @ApiProperty({
        description: 'username',
        default: 'saeed123',
      })
    username: string

    @IsString()
    @MinLength(10)
    @MaxLength(14)
    @IsNotEmpty()
    @ApiProperty({
        description: 'mobile',
        default: '09121234567',
      })
    mobile: string

    @IsString()
    @MinLength(10)
    @MaxLength(40)
    @ApiProperty({
        description: 'address',
        default: 'Vanak Sqr, Blk.6',
      })
    address: string

    @IsString()
    @ApiProperty({
        description: 'avatar',
        default: 'avatar.png',
      })
    avatar: string

    @IsDateString()
    @ApiProperty({
        description: 'avatar',
        default: '2021-02-21',
      })
    birthday: Date

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description: 'avatar',
        default: 'saeed@gmail.com',
      })
    email: string

    @ApiProperty({
        description: 'Isfahan',
        default: '60c5fcf47db03439e47fe76d',
      })
    city: string
    
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

    @IsIn(["male", "female"])
    @ApiProperty({
        description: 'gender',
        default: 'male',
      })
    sex: string

}