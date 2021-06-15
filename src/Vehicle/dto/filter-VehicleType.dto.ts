import { IsDate, IsString, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class FilterVehicleTypeDTO {

    @IsString()
    @MaxLength(30)
    @ApiProperty({description: 'Vehicle type',default: 'سواری'})
    name: string

}