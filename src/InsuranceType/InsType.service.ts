import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FilterInsTypeDTO } from "./dto/filter-insType.dto";
import { InsType } from "./InsType.schema";
import { unlinkSync } from 'fs'


@Injectable()
export class InsTypeService {

    constructor(
        @InjectModel(InsType.name)
        private InsType: Model<InsType>,
    ){}

    async getInsTypes(): Promise<InsType[]> {
        return await this.InsType.find()
    }

    async getInsType(id: string): Promise<InsType> {
            return await this.InsType.findById(id)
    }

    async createInsType(filterInsTypeDTO: FilterInsTypeDTO): Promise<InsType>{
        const InsType = new this.InsType(filterInsTypeDTO)

        try {
            return await InsType.save()
        }catch(err) {
            console.log(err)
        }
    }

    async updateInsType(id: string, filterInsTypeDTO: FilterInsTypeDTO): Promise<InsType>{
        const InsType = await this.InsType.findById(id)
        unlinkSync(`./files/${InsType.image_url}`)
        Object.assign(InsType, filterInsTypeDTO)
        try {
            return await InsType.save()
        }catch(err) {
            console.log(err)
        }
    }

    async deleteInsType(id: string): Promise<InsType>{
        try {
            const InsType = await this.InsType.findByIdAndDelete(id)
            unlinkSync(`./files/${InsType.image_url}`)
            return InsType
        }catch(err) {
            console.log(err)
        }
    }

}