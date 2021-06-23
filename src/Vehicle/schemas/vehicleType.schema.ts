import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
export type VehicleTypeDocument = VehicleType & mongoose.Document

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}})
export class VehicleType {
    
    @Prop({unique: true, required: true})
    name: string

}

export const VehicleTypeSchema = SchemaFactory.createForClass(VehicleType)