import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FilterBlogDTO } from '../dto/filter-blogandgallery.dto';
import { unlinkSync } from 'fs'
import { Blog } from "../schema/blog.schema";
import * as ConstValue from 'CustomMsg/ConstValue.json'


@Injectable()
export class BlogService {

    constructor(
        @InjectModel(Blog.name)
        private Blog: Model<Blog>,
    ){}

    async getBlogs(page: number, search: string): Promise<Blog[]> {
        const regex = search? {'name': {"$regex": new RegExp(search, 'i')}}: {}
        page = page? page : 1
        return this.Blog
        .find(regex)
        .limit(ConstValue.Limit)
        .skip(ConstValue.Limit * (Number(page)-1))
        .exec()
    }

    async getBlog(id: string): Promise<Blog> {
            return await this.Blog.findById(id)
    }

    async createBlog(filterBlogDTO: FilterBlogDTO): Promise<Blog>{
        const Blog = new this.Blog(filterBlogDTO)

        try {
            return await Blog.save()
        }catch(err) {
            console.log(err)
        }
    }

    async updateBlog(id: string, filterBlogDTO: FilterBlogDTO): Promise<Blog>{
        const Blog = await this.Blog.findById(id)
        unlinkSync(`./files/${Blog.image}`)
        Object.assign(Blog, filterBlogDTO)
        try {
            return await Blog.save()
        }catch(err) {
            console.log(err)
        }
    }

    async deleteBlog(id: string): Promise<Blog>{
        try {
            const Blog = await this.Blog.findByIdAndDelete(id)
            unlinkSync(`./files/${Blog.image}`)
            return Blog
        }catch(err) {
            console.log(err)
        }
    }

}