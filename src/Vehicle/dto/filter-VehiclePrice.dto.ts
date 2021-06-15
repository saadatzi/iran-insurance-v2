import { IsDate, IsNumber, IsString, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class FilterVehiclePriceDTO {

    @IsString()
    @MaxLength(30)
    @ApiProperty({description: 'Vehicle brand',default: 'MVM'})
    name: string
    
    @IsNumber()
    @ApiProperty({description: 'Vehicle Minimum Price',default: '300000000'})
    min: number


    @IsNumber()
    @ApiProperty({description: 'Vehicle Maximum Price',default: '400000000'})
    max: number


    @IsNumber()
    @ApiProperty({description: 'should be cleared out',default: 30})
    x: number


    @IsNumber()
    @ApiProperty({description: 'should be cleared out',default: 10})
    y: number
}