import { IsArray, IsDate, IsString, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class FilterVehicleTypeDTO {

    @IsString()
    @MaxLength(30)
    @ApiProperty({description: 'Vehicle type',default: 'سواری'})
    name: string

    @IsArray()
    @ApiProperty({description: 'Vehicle type',default: '[{name: "۱ تن", price: 12000000}]'})
    amounts: [
        {
            name: string,
            price: number
        }
    ]

}