import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { FilterBodyClauseDTO } from "../dto/filter-BodyClause.dto"
import { BodyClause } from "Body/Schemas/bodyClause.schema";

@Injectable()
export class BodyClauseService {
    constructor(
        @InjectModel(BodyClause.name) 
        private BodyClause: Model<BodyClause>
    ){}

    async getBodiesClause(): Promise<BodyClause[]> {
            return await this.BodyClause.find()
    }

    async getBodyClause(id: string): Promise<BodyClause> {
            return await this.BodyClause.findById(id)
    }

    async createBodyClause(filterBodyClauseDTO: FilterBodyClauseDTO): Promise<BodyClause>{
        // const {name, province, areaCode} = filterProvinceDTO
        const bodyClause = new this.BodyClause(filterBodyClauseDTO)

        try {
            return await bodyClause.save()
        }catch(err) {
            console.log(err)
        }
    }

    async updateBodyClause(id: string, filterBodyClauseDTO: FilterBodyClauseDTO, user:object): Promise<BodyClause>{
        const bodyClause = await this.BodyClause.findById(id)
        Object.assign(BodyClause, filterBodyClauseDTO)
        try {
            return await bodyClause.save()
        }catch(err) {
            console.log(err)
        }
    }

    async deleteBodyClause(id: string, user:object): Promise<BodyClause>{
        try {
            return await this.BodyClause.findByIdAndDelete(id)
        }catch(err) {
            console.log(err)
        }
    }

}