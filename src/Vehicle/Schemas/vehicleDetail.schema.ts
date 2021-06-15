import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
export type VehicleDetailDocument = VehicleDetail & mongoose.Document

@Schema()
export class VehicleDetail {
    
        @Prop({unique: true, required: true})
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
        @Prop({type: mongoose.Schema.Types.ObjectId, ref: "vehicleUnit", default: null})
        isAnotherType: Boolean
        
        anotherTypeUnit: string

        // آیا حمل کننده مواد خطرناک و مشتعل است؟
        dangerousMaterialCarrierPercent: number
        outOfTownTrafficPercent: number

}

export const VehicleDetailSchema = SchemaFactory.createForClass(VehicleDetail)
