import { ApiProperty } from "@nestjs/swagger";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
export type ProvinceDocument = Province & mongoose.Document

@Schema()
export class Province {
    
    @Prop({unique: true, required: true})
    name: string

}

export const ProvinceSchema = SchemaFactory.createForClass(Province)
