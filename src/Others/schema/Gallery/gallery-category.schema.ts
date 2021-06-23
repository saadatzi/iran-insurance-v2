import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Binary } from "mongodb";
import * as mongoose from "mongoose";

// export type CityDocument = City & mongoose.Document

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}})
export class GalleryCategory extends mongoose.Document{
    
    @Prop({required: true})
    title: String
    
    @Prop({default: 'logo.png'})
    description: String

    @Prop({ type: Binary, default: 'galleryCategoryPostImage.png' })
    image: string

}

export const GalleryCategorySchema = SchemaFactory.createForClass(GalleryCategory)

