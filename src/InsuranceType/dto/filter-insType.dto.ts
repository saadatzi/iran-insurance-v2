import { IsDate, IsObject, isString, IsString, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class FilterInsTypeDTO {

    @IsString()
    @ApiProperty({ description: 'name of the insurance type',default: 'Fire'})
    name: string
    
    @ApiProperty({ type: 'string', format: 'binary'})
    image_url: string

}