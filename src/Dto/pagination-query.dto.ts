import { IsDate, IsString, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class PaginationDTO {
    @ApiProperty({
        required: false
    })
    page: number

    @ApiProperty({
        required: false
    })
    search: string
}