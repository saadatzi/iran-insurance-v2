import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { BlogService } from 'Others/services/Blog.service';
import { Blog } from 'Others/schema/blog.schema';
import { FilterBlogDTO, FilterGalleryCategoryDTO, FilterGalleryPostDTO } from 'Others/dto/filter-blogandgallery.dto';
import { Roles } from 'Auth/decorators/roles.decorator';
import { RolesGuard } from 'Auth/decorators/roles.guard';
import { GalleryPost } from 'Others/schema/Gallery/gallery-post.schema';
import { GalleryCategory } from 'Others/schema/Gallery/gallery-category.schema';
import { GalleryCategoryService, GalleryPostService } from 'Others/services/Gallery.service';



// @ApiHeader({`
//   name: 'Authorization',
//   description: 'Auth Token'
// })
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('vehicle')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly galleryPostService: GalleryPostService,
    private readonly galleryCategoryService: GalleryCategoryService,
  ) {}
  

  //// ========= Blog ========\\\\
  @Get('/model')
  @ApiBearerAuth()
  getBlogs(): Promise<Blog[]> {
    return this.blogService.getBlogs();
  }

  @Get('/model/:id')
  @ApiBearerAuth()
  getBlog(
    @Query('id', ParseIntPipe) id:string
  ): Promise<Blog> {
    return this.blogService.getBlog(id);
  }
  
  @Post('/model')
  @Roles('admin', 'superAdmin')
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  createBlog(
      @Body() filterBlogDTO: FilterBlogDTO,
      // @Req() req: any,
  ): Promise<Blog> {
    // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
    return this.blogService.createBlog(filterBlogDTO)
  }
  
  @Put('/model')
  @Roles('admin', 'superAdmin')
  @ApiBearerAuth()
  updateBlog(
    @Query('id', ParseIntPipe) id:string, 
      @Body() filterBlogDTO: FilterBlogDTO,
      ) : Promise<Blog> {
        return this.blogService.updateBlog(id, filterBlogDTO)
      }

  @Delete('/model')
  @ApiBearerAuth()
  deleteBlog(
    @Query('id', ParseIntPipe) id:string, 
    ) : Promise<Blog> {
      return this.blogService.deleteBlog(id)
    }
    
    //// ========= gallery.post ========\\\\

    @Get('/model')
    @ApiBearerAuth()
    getGalleryPosts(): Promise<GalleryPost[]> {
      return this.galleryPostService.getGalleryPosts();
    }
  
    @Get('/model/:id')
    @ApiBearerAuth()
    getGalleryPost(
      @Query('id', ParseIntPipe) id:string
    ): Promise<GalleryPost> {
      return this.galleryPostService.getGalleryPost(id);
    }
    
    @Post('/model')
    @Roles('admin', 'superAdmin')
    @ApiBearerAuth()
    @UsePipes(ValidationPipe)
    createGalleryPost(
        @Body() filterGalleryPostDTO: FilterGalleryPostDTO,
        // @Req() req: any,
    ): Promise<GalleryPost> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.galleryPostService.createGalleryPost(filterGalleryPostDTO)
    }
    
    @Put('/model')
    @Roles('admin', 'superAdmin')
    @ApiBearerAuth()
    updateGalleryPost(
      @Query('id', ParseIntPipe) id:string, 
        @Body() filterGalleryPostDTO: FilterGalleryPostDTO,
        ) : Promise<GalleryPost> {
          return this.galleryPostService.updateGalleryPost(id, filterGalleryPostDTO)
        }
  
    @Delete('/model')
    @ApiBearerAuth()
    deleteGalleryPost(
      @Query('id', ParseIntPipe) id:string, 
      ) : Promise<GalleryPost> {
        return this.galleryPostService.deleteGalleryPost(id)
      }
    //// ========= gallery.category ========\\\\

    @Get('/model')
    @ApiBearerAuth()
    getGalleryCategories(): Promise<GalleryCategory[]> {
      return this.galleryCategoryService.getGalleryCategories();
    }
  
    @Get('/model/:id')
    @ApiBearerAuth()
    getGalleryCategory(
      @Query('id', ParseIntPipe) id:string
    ): Promise<GalleryCategory> {
      return this.galleryCategoryService.getGalleryCategory(id);
    }
    
    @Post('/model')
    @Roles('admin', 'superAdmin')
    @ApiBearerAuth()
    @UsePipes(ValidationPipe)
    createGalleryCategory(
        @Body() filterGalleryCategoryDTO: FilterGalleryCategoryDTO,
        // @Req() req: any,
    ): Promise<GalleryCategory> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.galleryCategoryService.createGalleryCategory(filterGalleryCategoryDTO)
    }
    
    @Put('/model')
    @Roles('admin', 'superAdmin')
    @ApiBearerAuth()
    updateGalleryCategory(
      @Query('id', ParseIntPipe) id:string, 
        @Body() filterGalleryCategoryDTO: FilterGalleryCategoryDTO,
        ) : Promise<GalleryCategory> {
          return this.galleryCategoryService.updateGalleryCategory(id, filterGalleryCategoryDTO)
        }
  
    @Delete('/model')
    @ApiBearerAuth()
    deleteGalleryCategory(
      @Query('id', ParseIntPipe) id:string, 
      ) : Promise<GalleryCategory> {
        return this.galleryCategoryService.deleteGalleryCategory(id)
      }
}