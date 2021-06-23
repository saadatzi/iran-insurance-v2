import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";

// export type CityDocument = City & mongoose.Document

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}})
export class PreInsurance extends mongoose.Document{
    
    @Prop({required: true})
    name: string
    
    @Prop({default: 'logo.png'})
    logo: string

    @Prop({ description: "The picture of the previouse third-party insurance" ,default: 'third-party.png'})
    thirdparty: string

    @Prop({ description: "The picture of the previouse body insurance" ,default: 'body.png'})
    Body: string

}

export const PreInsuranceSchema = SchemaFactory.createForClass(PreInsurance)
