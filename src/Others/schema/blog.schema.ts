import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { User } from "Auth/user.schema";
import { Binary } from "mongodb";
import * as mongoose from "mongoose";

// export type CityDocument = City & mongoose.Document

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}})
export class Blog extends mongoose.Document{
    
    @Prop({required: true})
    title: String
    
    @Prop({default: 'logo.png'})
    description: String

    @Prop({ type: Binary, default: 'blogPostImage.png' })
    image: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User'})
    author: User


}

export const BlogSchema = SchemaFactory.createForClass(Blog)
