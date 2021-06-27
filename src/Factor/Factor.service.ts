import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FilterFactorDTO } from "./dto/filter-factor.dto";
import { Factor } from "./Factor.schema";
import * as ConstValue from 'CustomMsg/ConstValue.json'

@Injectable()
export class FactorService {

    constructor(
        @InjectModel(Factor.name)
        private Factor: Model<Factor>,
    ){}

    async getFactors(page: number, search: string): Promise<Factor[]> {
        const regex = search? {'name': {"$regex": new RegExp(search, 'i')}}: {}
        page = page? page : 1
        return await this.Factor
        .find(regex)
        .limit(ConstValue.Limit)
        .skip(ConstValue.Limit * (Number(page)-1))
        .exec()
    }

    async getFactor(id: string): Promise<Factor> {
            return await this.Factor.findById(id)
    }

    async createFactor(filterFactorDTO: FilterFactorDTO): Promise<Factor>{
        const Factor = new this.Factor(filterFactorDTO)

        try {
            return await Factor.save()
        }catch(err) {
            console.log(err)
        }
    }

    async updateFactor(id: string, filterFactorDTO: FilterFactorDTO, user:object): Promise<Factor>{
        const Factor = await this.Factor.findById(id)
        Object.assign(Factor, filterFactorDTO)
        try {
            return await Factor.save()
        }catch(err) {
            console.log(err)
        }
    }

    async deleteFactor(id: string, user:object): Promise<Factor>{
        try {
            return await this.Factor.findByIdAndDelete(id)
        }catch(err) {
            console.log(err)
        }
    }

}