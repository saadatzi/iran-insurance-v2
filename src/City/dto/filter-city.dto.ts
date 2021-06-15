import { IsDate, IsString, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class FilterCityDTO {
    @IsString()
    @MaxLength(40)
    @ApiProperty({
        description: 'Lesson title',
        default: 'Physics',
    })
    name: string

    @ApiProperty({
        description: 'Province Object Id',
        default: '12345etfdhds',
    })
    province: string

    @ApiProperty({
        description: 'City area code',
        default: '0312',
    })
    areaCode: string

}