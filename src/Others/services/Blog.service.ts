import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { FilterBlogDTO } from '../dto/filter-blogandgallery.dto';
import { unlinkSync } from 'fs'
import { Blog } from "../schema/blog.schema";


@Injectable()
export class BlogService {

    constructor(
        @InjectModel(Blog.name)
        private Blog: Model<Blog>,
    ){}

    async getBlogs(): Promise<Blog[]> {
        return await this.Blog.find()
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