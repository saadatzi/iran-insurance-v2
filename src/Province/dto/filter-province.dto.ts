import { IsDate, IsString, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class FilterProvinceDTO {
    @IsString()
    @MaxLength(20)
    @ApiProperty({
        description: 'Lesson title',
        default: 'Physics',
    })
    name: string
}