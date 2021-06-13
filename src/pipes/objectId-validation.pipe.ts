import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { Types } from "mongoose";

export class ObjectIdValidationPipe implements PipeTransform {
    transform(value: any, 
        // metadata: ArgumentMetadata
    ) {

        if(!this.IsObjectIdValid(value)) {
            throw new BadRequestException(` ${value} is not an valid object id. `)
        }
        
        return value
    }
    

    private IsObjectIdValid(ObjId: string){

        return Types.ObjectId.isValid(ObjId)
        
    }
}