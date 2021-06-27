import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import * as mongoose from "mongoose"
export type BodyClauseDocument = BodyClause & mongoose.Document

@Schema({ timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}})
export class BodyClause {
    
    name: string
    percent: number

    @Prop({type: "string", default: 'avatar.png'})
    avatar: string

}

export const BodyClauseSchema = SchemaFactory.createForClass(BodyClause)