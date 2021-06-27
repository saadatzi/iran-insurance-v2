import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
export type BodyDiscountDocument = BodyDiscount & mongoose.Document

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}})
export class BodyDiscount {
    
    name: string
    percent: number

    @Prop({ default: false})
    isActive: boolean


}

export const BodyDiscountSchema = SchemaFactory.createForClass(BodyDiscount)
