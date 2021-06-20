import { IsArray, IsBoolean, IsNumber, IsString, MaxLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class FilterVehicleDetailDTO {
    @IsString()
    @MaxLength(20)
    @ApiProperty({ description: 'Detail name',default: 'DetailName1' })
    name: string

    // تعهد راننده
    @IsNumber()
    @ApiProperty({ description: 'driverObligation',default: 10000000 })
    driverObligation: number
    
    // تعهد جانی
    @IsNumber()
    @ApiProperty({ description: 'casualtyObligation',default: 16000000 })
    casualtyObligation: number
    
    // خسارت راننده
    @IsNumber()
    @ApiProperty({ description: 'driverDamagePrice',default: 32000000 })
    driverDamagePrice: number
    
    // خسارت روزانه
    @IsNumber()
    @ApiProperty({ description: 'dailyDamagePrice',default: 10000000 })
    dailyDamagePrice: number
    
    // درصد های بیمه نامه (کمتر از 12 ماه)
    @IsArray()
    @ApiProperty({ description: 'dailyDamagePrice',default: [{month: 6, percent: 30}] })
    validityDuration: [
        {
            month: number,
            percent: number
        }
    ]

    // تعهدات مالی
    @IsArray()
    @ApiProperty({ description: 'financialOblications',default: [{amount: 300000, basePrice: 16000000}] })
    financialOblications: [
        {
            amount: number,
            basePrice: number
        }
    ]
    
    // چک می کند که این نوع از ماشین داری واحد خاصی است مانند تناژ
    @IsBoolean()
    @ApiProperty({ description: 'isAnotherType',default: false })
    isAnotherType: Boolean

    // اگر نوع دیگر خاص از ماشین بود . رفرنس به واحد آن ماشین
    @IsString()
    @ApiProperty({ description: 'anotherTypeUnit Object Id',default: '60c5fcf47db03439e47fe76d' })
    anotherTypeUnit: string

    // آیا حمل کننده مواد خطرناک و مشتعل است؟
    @IsNumber()
    @ApiProperty({ description: 'dangerousMaterialCarrierPercent',default: 60 })
    dangerousMaterialCarrierPercent: number
    
    @IsNumber()
    @ApiProperty({ description: 'outOfTownTrafficPercent',default: 30 })
    outOfTownTrafficPercent: number

}