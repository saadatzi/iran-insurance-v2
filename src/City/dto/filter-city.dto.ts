import { IsDate, IsString, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class FilterCityDTO {
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @ApiProperty({
        description: 'Lesson title',
        default: 'Physics',
    })
    name: string

    @IsDate()
    @ApiProperty({
        description: 'start of lesson',
        default: '2021/12/01',
    })
    startDate: string

    @IsDate()
    @ApiProperty({
        description: 'end of lesson',
        default: '2021/12/01',
    })
    endDate: string
}