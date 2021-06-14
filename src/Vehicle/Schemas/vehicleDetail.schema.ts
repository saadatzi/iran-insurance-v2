import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
export type VehicleModelDocument = VehicleModel & mongoose.Document

@Schema()
export class VehicleModel {
    
        name: string

        // تعهد راننده
        driverObligation: number
        // تعهد جانی
        casualtyObligation: number
        // خسارت راننده
        driverDamagePrice: number
        // خسارت روزانه
        dailyDamagePrice: number
        // درصد های بیمه نامه (کمتر از 12 ماه)
        validityDuration: [
            {
                month: number,
                percent: number
            }
        ]

        // تعهدات مالی
        financialOblications: [
            {
                amount: number,
                basePrice: number
            }
        ]
        // چک می کند که این نوع از ماشین داری واحد خاصی است مانند تناژ
        isAnotherType: Boolean

        // اگر نوع دیگر خاص از ماشین بود . رفرنس به واحد آن ماشین
        @Prop({type: mongoose.Schema.Types.ObjectId})
        anotherTypeUnit: string

        // آیا حمل کننده مواد خطرناک و مشتعل است؟
        dangerousMaterialCarrierPercent: number
        outOfTownTrafficPercent: number

}

export const VehicleModelSchema = SchemaFactory.createForClass(VehicleModel)
