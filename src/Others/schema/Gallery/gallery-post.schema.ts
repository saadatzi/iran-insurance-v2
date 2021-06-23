import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose";
import { GalleryCategory } from "./gallery-category.schema";

// export type CityDocument = City & mongoose.Document

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}})
export class GalleryPost extends mongoose.Document{
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category'})
    category: GalleryCategory

    @Prop({required: true})
    views: number
    
    @Prop({required: true})
    links: number
}

export const GalleryPostSchema = SchemaFactory.createForClass(GalleryPost)
