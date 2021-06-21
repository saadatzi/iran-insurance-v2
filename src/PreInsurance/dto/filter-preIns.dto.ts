import { IsDate, IsObject, isString, IsString, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class FilterPreInsDTO {

    @IsString()
    @ApiProperty({ description: 'name of the insurance type',default: 'Fire'})
    name: string
    
    @IsString()
    @ApiProperty({ description: 'the avatar of insurance type',default: 'avatar.png'})
    logo: string
    
    @IsString()
    @ApiProperty({ description: 'The picture of the previouse third-party insurance',default: 'third-party.png'})
    thirdparty: string
    
    @IsString()
    @ApiProperty({ description: 'The picture of the previouse body insurance',default: 'body.png'})
    Body: string

}