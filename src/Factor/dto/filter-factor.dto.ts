import { IsDate, IsObject, isString, IsString, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class FilterFactorDTO {

    @ApiProperty({ description: 'price of insurance',default: 54000000})
    price: number

    @IsString()
    @ApiProperty({ description: 'the avatar of insurance type',default: 'avatar.png'})
    logo: string
    
    @ApiProperty({ description: 'has Insu or not',default: true})
    hasInsurance: boolean

    @ApiProperty({ description: 'new car or not',default: true})
    isNewCar: boolean

    @ApiProperty({ description: 'new car or not',default: false})
    hasDamageReceived: boolean

    @ApiProperty({ description: 'Car Model Object Id',default: '60ceeced4411031bd18c15ff'})
    carModel: string

    @ApiProperty({ description: 'date',default: '2021-02-20'})
    releaseDate: string

    @ApiProperty({ description: 'year',default: '2001'})
    builtYear: string

    @ApiProperty({ description: 'base Price',default: 1000000 })
    basePrice: number

    @ApiProperty({ description: 'dam percentage',default: 10 })
    damageDiscountPercentage: number
    
    @ApiProperty({ description: 'driver percentage',default: 10 })
    driverDiscountPercentage: number
     
    @ApiProperty({ description: 'previousInsuranceNumber',default: 10 })
    previousInsuranceNumber: number
 
    @ApiProperty({ description: 'propertyDamageCount',default: 2 })
    propertyDamageCount: number
    
    @ApiProperty({ description: 'casualtyDamageCount',default: 2 })
    casualtyDamageCount: number  

    @ApiProperty({ description: 'driverAccidentDamageCount',default: 2 })
    driverAccidentDamageCount: number
    
    @ApiProperty({ description: 'previousInsurer',default: 'Dana' })
    previousInsurer: string
    
    @ApiProperty({ description: 'previousInsuranceStartDate',default: '2021-02-20' })
    previousInsuranceStartDate: string

    @ApiProperty({ description: 'previousInsuranceEndDate',default: '2021-02-20' })
    previousInsuranceEndDate: string

}