import { IsString, MaxLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class FilterVehicleModelDTO {
    @IsString()
    @MaxLength(20)
    @ApiProperty({
        description: 'vehicle name',
        default: 'L90',
    })
    name: string

    @ApiProperty({
        description: 'Vehicle brand Object Id',
        default: '60c5fcf47db03439e47fe76d',
    })
    brand: string

    @ApiProperty({
        description: 'Vehicle type Object Id',
        default: '60c5fcf47db03439e47fe76d',
    })
    type: string

    @ApiProperty({
        description: 'Vehicle detail Object Id',
        default: '60c5fcf47db03439e47fe76d',
    })
    detail: string

}