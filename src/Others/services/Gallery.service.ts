import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { unlinkSync } from 'fs'
import { GalleryCategory } from "Others/schema/Gallery/gallery-category.schema";
import { FilterGalleryCategoryDTO, FilterGalleryPostDTO } from "Others/dto/filter-blogandgallery.dto";
import { GalleryPost } from "Others/schema/Gallery/gallery-post.schema";
import * as ConstValue from 'CustomMsg/ConstValue.json'


@Injectable()
export class GalleryCategoryService {

    constructor(
        @InjectModel(GalleryCategory.name)
        private GalleryCategory: Model<GalleryCategory>,
    ){}

    async getGalleryCategories(page: number, search: string): Promise<GalleryCategory[]> {
        const regex = search? {'name': {"$regex": new RegExp(search, 'i')}}: {}
        page = page? page : 1
        return this.GalleryCategory
        .find(regex)
        .limit(ConstValue.Limit)
        .skip(ConstValue.Limit * (Number(page)-1))
        .exec()
    }

    async getGalleryCategory(id: string): Promise<GalleryCategory> {
            return await this.GalleryCategory.findById(id)
    }

    async createGalleryCategory(filterGalleryCategoryDTO: FilterGalleryCategoryDTO): Promise<GalleryCategory>{
        const GalleryCategory = new this.GalleryCategory(filterGalleryCategoryDTO)

        try {
            return await GalleryCategory.save()
        }catch(err) {
            console.log(err)
        }
    }

    async updateGalleryCategory(id: string, filterGalleryCategoryDTO: FilterGalleryCategoryDTO): Promise<GalleryCategory>{
        const GalleryCategory = await this.GalleryCategory.findById(id)
        unlinkSync(`./files/${GalleryCategory.image}`)
        Object.assign(GalleryCategory, filterGalleryCategoryDTO)
        try {
            return await GalleryCategory.save()
        }catch(err) {
            console.log(err)
        }
    }

    async deleteGalleryCategory(id: string): Promise<GalleryCategory>{
        try {
            const GalleryCategory = await this.GalleryCategory.findByIdAndDelete(id)
            unlinkSync(`./files/${GalleryCategory.image}`)
            return GalleryCategory
        }catch(err) {
            console.log(err)
        }
    }

}

//// =================== Gallery.Post ====================== \\\\

@Injectable()
export class GalleryPostService {

    constructor(
        @InjectModel(GalleryPost.name)
        private GalleryPost: Model<GalleryPost>,
    ){}

    async getGalleryPosts(page: number, search: string): Promise<GalleryPost[]> {
        const regex = search? {'name': {"$regex": new RegExp(search, 'i')}}: {}
        page = page? page : 1
        return this.GalleryPost
        .find(regex)
        .limit(ConstValue.Limit)
        .skip(ConstValue.Limit * (Number(page)-1))
        .exec()
    }

    async getGalleryPost(id: string): Promise<GalleryPost> {
            return await this.GalleryPost.findById(id)
    }

    async createGalleryPost(filterGalleryPostDTO: FilterGalleryPostDTO): Promise<GalleryPost>{
        const GalleryPost = new this.GalleryPost(filterGalleryPostDTO)

        try {
            return await GalleryPost.save()
        }catch(err) {
            console.log(err)
        }
    }

    async updateGalleryPost(id: string, filterGalleryPostDTO: FilterGalleryPostDTO): Promise<GalleryPost>{
        const GalleryPost = await this.GalleryPost.findById(id)
        Object.assign(GalleryPost, filterGalleryPostDTO)
        try {
            return await GalleryPost.save()
        }catch(err) {
            console.log(err)
        }
    }

    async deleteGalleryPost(id: string): Promise<GalleryPost>{
        try {
            const GalleryPost = await this.GalleryPost.findByIdAndDelete(id)
            return GalleryPost
        }catch(err) {
            console.log(err)
        }
    }

}