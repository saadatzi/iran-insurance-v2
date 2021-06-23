import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
export type BodyDiscountDocument = BodyDiscount & mongoose.Document

@Schema({timestamps: true})
export class BodyDiscount {
    
    name: string
    percent: number

    @Prop({ default: false})
    isActive: boolean


}

export const BodyDiscountSchema = SchemaFactory.createForClass(BodyDiscount)
