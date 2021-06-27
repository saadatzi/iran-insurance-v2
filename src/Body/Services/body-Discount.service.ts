import { Injectable } from "@nestjs/common";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { FilterBodyDiscountDTO } from "../dto/filter-BodyDiscount.dto"
import { BodyDiscount } from "Body/Schemas/bodyDiscount.schema";
import * as ConstValue from 'CustomMsg/ConstValue.json'


@Injectable()
export class BodyDiscountService {
    constructor(
        @InjectModel(BodyDiscount.name) 
        private BodyDiscount: Model<BodyDiscount>
    ){}

    async getBodiesDiscount(page: number, search: string): Promise<BodyDiscount[]> {
        const regex = search? {'name': {"$regex": new RegExp(search, 'i')}}: {}
        page = page? page : 1
        return this.BodyDiscount
        .find(regex)
        .limit(ConstValue.Limit)
        .skip(ConstValue.Limit * (Number(page)-1))
        .exec()
    }

    async getBodyDiscount(id: string): Promise<BodyDiscount> {
            return await this.BodyDiscount.findById(id)
    }

    async createBodyDiscount(filterBodyDiscountDTO: FilterBodyDiscountDTO): Promise<BodyDiscount>{
        // const {name, province, areaCode} = filterProvinceDTO
        const bodyDiscount = new this.BodyDiscount(filterBodyDiscountDTO)

        try {
            return await bodyDiscount.save()
        }catch(err) {
            console.log(err)
        }
    }

    async updateBodyDiscount(id: string, filterBodyDiscountDTO: FilterBodyDiscountDTO, user:object): Promise<BodyDiscount>{
        const bodyDiscount = await this.BodyDiscount.findById(id)
        Object.assign(BodyDiscount, filterBodyDiscountDTO)
        try {
            return await bodyDiscount.save()
        }catch(err) {
            console.log(err)
        }
    }

    async deleteBodyDiscount(id: string, user:object): Promise<BodyDiscount>{
        try {
            return await this.BodyDiscount.findByIdAndDelete(id)
        }catch(err) {
            console.log(err)
        }
    }

}