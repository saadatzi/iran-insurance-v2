import { IsDate, IsString, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class FilterBodyClauseDTO {

    @IsString()
    @MaxLength(30)
    @ApiProperty({description: 'Vehicle brand',default: 'MVM'})
    name: string

}