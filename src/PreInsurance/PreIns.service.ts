import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FilterPreInsDTO } from "./dto/filter-preIns.dto";
import { PreInsurance } from "./PreIns.schema";

@Injectable()
export class PreInsService {

    constructor(
        @InjectModel(PreInsurance.name)
        private PreIns: Model<PreInsurance>,
    ){}

    async getPreInss(): Promise<PreInsurance[]> {
        return await this.PreIns.find()
    }

    async getPreIns(id: string): Promise<PreInsurance> {
            return await this.PreIns.findById(id)
    }

    async createPreIns(filterPreInsDTO: FilterPreInsDTO): Promise<PreInsurance>{
        const PreIns = new this.PreIns(filterPreInsDTO)

        try {
            return await PreIns.save()
        }catch(err) {
            console.log(err)
        }
    }

    async updatePreIns(id: string, filterPreInsDTO: FilterPreInsDTO, user:object): Promise<PreInsurance>{
        const PreIns = await this.PreIns.findById(id)
        Object.assign(PreIns, filterPreInsDTO)
        try {
            return await PreIns.save()
        }catch(err) {
            console.log(err)
        }
    }

    async deletePreIns(id: string, user:object): Promise<PreInsurance>{
        try {
            return await this.PreIns.findByIdAndDelete(id)
        }catch(err) {
            console.log(err)
        }
    }

}