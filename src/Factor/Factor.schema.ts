import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { autoIncrement } from 'mongoose-auto-increment'

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}})
export class Factor extends mongoose.Document{
    
    @Prop({required: true})
    factorId: string
    
    @Prop({ required: true})
    insuranceId: string
    
    @Prop({required: true})
    price: number

    @Prop({trim: true})
    logo: string
    
    @Prop({default: true})
    hasInsurance: boolean

    @Prop({default: true})
    isNewCar: boolean

    @Prop({default: true})
    hasDamageReceived: boolean

    @Prop({type: mongoose.Schema.Types.ObjectId, trim: true})
    carModel: string

    @Prop({trim: true})
    releaseDate: string

    @Prop({trim: true})
    builtYear: string

    @Prop({required: true})
    basePrice: number

    @Prop({required: true})
    damageDiscountPercentage: number
    
    @Prop({required: true})
    driverDiscountPercentage: number
     
    @Prop({required: true})
    previousInsuranceNumber: number
 
    @Prop({required: true})
    propertyDamageCount: number
    
    @Prop({required: true})
    casualtyDamageCount: number  

    @Prop({required: true})
    driverAccidentDamageCount: number
    
    @Prop({required: true})
    previousInsurer: string
    
    @Prop({required: true})
    previousInsuranceStartDate: string

    @Prop({required: true})
    previousInsuranceEndDate: string

}

export const FactorSchema = SchemaFactory.createForClass(Factor)

FactorSchema.plugin(autoIncrement.plugin, 'insuranceId')