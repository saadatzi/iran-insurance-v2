import { IsNumber, IsString, MaxLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class FilterBodyDiscountDTO {
    @IsString()
    @MaxLength(20)
    @ApiProperty({ description: 'Detail name',default: 'DetailName1' })
    name: string

    @IsNumber()
    @ApiProperty({ description: 'percent of Body Discount',default: 10 })
    percent: number
    
    // تعهد جانی
    @ApiProperty({ description: 'active/deactive',default: false })
    isActive: boolean

}