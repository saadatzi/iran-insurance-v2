import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
import { VehicleBrand } from "./vehicleBrand.schema";
import { VehicleType } from "./vehicleType.schema";
import { VehicleDetail} from "./vehicleDetail.schema";

@Schema()
export class VehicleModel {
    
    @Prop({unique: true, required: true})
    name: string
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'VehicleBrand'})
    brand: VehicleBrand
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'VehicleType'})
    type: VehicleType
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'VehicleDetail'})
    detail: VehicleDetail

}

export const VehicleModelSchema = SchemaFactory.createForClass(VehicleModel)
