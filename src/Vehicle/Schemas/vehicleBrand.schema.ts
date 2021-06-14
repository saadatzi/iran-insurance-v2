import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
export type VehicleBrandDocument = VehicleBrand & mongoose.Document

@Schema()
export class VehicleBrand {
    
    @Prop({unique: true, required: true})
    name: string

}

export const VehicleBrandSchema = SchemaFactory.createForClass(VehicleBrand)
