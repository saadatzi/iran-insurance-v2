import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { Province } from "Province/province.schema";

// export type CityDocument = City & mongoose.Document

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}})
export class City extends mongoose.Document{
    
    @Prop({required: true})
    name: string
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Province'})
    province: Province

    @Prop()
    areaCode: string

}

export const CitySchema = SchemaFactory.createForClass(City)
