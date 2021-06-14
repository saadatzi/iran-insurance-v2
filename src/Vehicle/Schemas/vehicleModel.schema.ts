import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
export type VehicleModelDocument = VehicleModel & mongoose.Document

@Schema()
export class VehicleModel {
    
    @Prop({unique: true, required: true})
    name: string
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'VehicleBrand'})
    brand: string
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'VehicleType'})
    type: string
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'VehicleDetail'})
    detail: string

}

export const VehicleModelSchema = SchemaFactory.createForClass(VehicleModel)
