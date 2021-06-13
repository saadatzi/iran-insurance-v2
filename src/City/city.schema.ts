import { ApiProperty } from "@nestjs/swagger";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

// export type CityDocument = City & mongoose.Document

@Schema()
export class City extends mongoose.Document{
    
    @Prop({required: true})
    name: string
    
    @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'Province'})
    province: mongoose.Types.ObjectId

    @Prop()
    areaCode: string

}

export const CitySchema = SchemaFactory.createForClass(City)
