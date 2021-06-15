import { IsDate, IsNumber, IsString, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class FilterVehicleDetailDTO {
    @IsString()
    @MaxLength(20)
    @ApiProperty({ description: 'Detail name',default: 'DetailName1' })
    name: string

    // تعهد راننده
    @IsNumber()
    @ApiProperty({ description: 'driverObligation',default: 'driverObligation1' })
    driverObligation: number
    
    // تعهد جانی
    @IsNumber()
    @ApiProperty({ description: 'casualtyObligation',default: 'casualtyObligation1' })
    casualtyObligation: number
    
    // خسارت راننده
    @IsNumber()
    @ApiProperty({ description: 'driverDamagePrice',default: 'driverDamagePrice1' })
    driverDamagePrice: number
    
    // خسارت روزانه
    @IsNumber()
    @ApiProperty({ description: 'dailyDamagePrice',default: 'dailyDamagePrice1' })
    dailyDamagePrice: number
    
    // درصد های بیمه نامه (کمتر از 12 ماه)
    @IsNumber()
    @ApiProperty({ description: 'dailyDamagePrice',default: '[{month: 6, percent: 30}]' })
    validityDuration: [
        {
            month: number,
            percent: number
        }
    ]

    // تعهدات مالی
    @IsNumber()
    @ApiProperty({ description: 'financialOblications',default: '[{amount: 300000, basePrice: 16000000}]' })
    financialOblications: [
        {
            amount: number,
            basePrice: number
        }
    ]
    
    // چک می کند که این نوع از ماشین داری واحد خاصی است مانند تناژ
    @IsNumber()
    @ApiProperty({ description: 'isAnotherType',default: false })
    isAnotherType: Boolean

    // اگر نوع دیگر خاص از ماشین بود . رفرنس به واحد آن ماشین
    @IsNumber()
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