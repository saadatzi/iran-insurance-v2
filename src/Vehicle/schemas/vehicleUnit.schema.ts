import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
export type VehicleUnitDocument = VehicleUnit & mongoose.Document

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}})
export class VehicleUnit {
    
    @Prop({unique: true, required: true})
    name: string
    
    amounts: [
        {
            name: string,
            price: number
        }
    ]

}

export const VehicleUnitSchema = SchemaFactory.createForClass(VehicleUnit)