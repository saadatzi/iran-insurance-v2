import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
export type VehiclePriceDocument = VehiclePrice & mongoose.Document

@Schema()
export class VehiclePrice {
    
    min: number
    max: number
    x: number
    y: number

}

export const VehiclePriceSchema = SchemaFactory.createForClass(VehiclePrice)