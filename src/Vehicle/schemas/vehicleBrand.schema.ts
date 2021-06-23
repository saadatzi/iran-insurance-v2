import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
export type VehicleBrandDocument = VehicleBrand & mongoose.Document

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}})
export class VehicleBrand {
    
    @Prop({unique: true, required: true})
    name: string

}

export const VehicleBrandSchema = SchemaFactory.createForClass(VehicleBrand)
