import { Module } from '@nestjs/common';
import { AuthModule } from '../Auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { GalleryCategory, GalleryCategorySchema } from './schema/Gallery/gallery-category.schema';
import { GalleryPost, GalleryPostSchema } from './schema/Gallery/gallery-post.schema';
import { Blog, BlogSchema } from './schema/blog.schema';
import { BlogService } from './services/Blog.service';
import { GalleryCategoryService, GalleryPostService } from './services/Gallery.service';
import { BlogController } from './controller/blog-gallery.controller';

@Module({
    imports: [
        MongooseModule.forFeature( [
            { 
                name: GalleryCategory.name, schema: GalleryCategorySchema
            },
            {
                name: GalleryPost.name, schema: GalleryPostSchema,
            },
            {
                name: Blog.name, schema: BlogSchema,
            }
        ]),
        AuthModule
    ],
    providers: [BlogService, GalleryCategoryService, GalleryPostService],
    controllers : [BlogController]
})
export class OtherModule {}
