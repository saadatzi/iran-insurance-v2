import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
import { VehicleUnit } from "./vehicleUnit.schema";
export type VehicleDetailDocument = VehicleDetail & mongoose.Document

@Schema()
export class VehicleDetail {
    
        @Prop({unique: true, required: true})
        name: string
        
        // تعهد راننده
        @Prop({ required: true })
        driverObligation: number
        // تعهد جانی
        @Prop({ required: true })
        casualtyObligation: number
        // خسارت راننده
        @Prop({ required: true })
        driverDamagePrice: number
        // خسارت روزانه
        @Prop({ required: true })
        dailyDamagePrice: number
        // درصد های بیمه نامه (کمتر از 12 ماه)
        @Prop({ required: true })
        validityDuration: [
            {
                month: number,
                percent: number
            }
        ]
        
        // تعهدات مالی
        @Prop({ required: true })
        financialOblications: [
            {
                amount: number,
                basePrice: number
            }
        ]
        
        // چک می کند که این نوع از ماشین داری واحد خاصی است مانند تناژ
        @Prop({ default: false})
        isAnotherType: Boolean
        
        @Prop({type: mongoose.Schema.Types.ObjectId, ref: "vehicleUnit", default: null})
        anotherTypeUnit: VehicleUnit
        
        // آیا حمل کننده مواد خطرناک و مشتعل است؟
        @Prop({ required: true })
        dangerousMaterialCarrierPercent: number
        
        @Prop({ required: true })
        outOfTownTrafficPercent: number

}

export const VehicleDetailSchema = SchemaFactory.createForClass(VehicleDetail)
