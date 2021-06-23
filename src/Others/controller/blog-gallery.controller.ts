import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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
import { PaginationDTO } from 'Dto/pagination-query.dto';



// @ApiHeader({`
//   name: 'Authorization',
//   description: 'Auth Token'
// })
// 
@ApiBearerAuth()
@Controller('blogGallery')
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly galleryPostService: GalleryPostService,
    private readonly galleryCategoryService: GalleryCategoryService,
  ) {}
  

  //// ========= Blog ========\\\\
  @Get('/blog')
  getBlogs(
    @Query() pagQDto:PaginationDTO ,
  ): Promise<Blog[]> {
    return this.blogService.getBlogs(pagQDto.page, pagQDto.search);
  }

  @Get('/blog/:id')
  getBlog(
    @Query('id') id:string
  ): Promise<Blog> {
    return this.blogService.getBlog(id);
  }
  
  @Post('/blog')
  @Roles('admin', 'superAdmin', 'customer')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(ValidationPipe)
  createBlog(
      @Body() filterBlogDTO: FilterBlogDTO,
      // @Req() req: any,
  ): Promise<Blog> {
    // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
    return this.blogService.createBlog(filterBlogDTO)
  }
  
  @Put('/blog')
  @Roles('admin', 'superAdmin', 'customer')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  updateBlog(
    @Query('id') id:string, 
      @Body() filterBlogDTO: FilterBlogDTO,
      ) : Promise<Blog> {
        return this.blogService.updateBlog(id, filterBlogDTO)
      }

  @Delete('/blog')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  deleteBlog(
    @Query('id') id:string, 
    ) : Promise<Blog> {
      return this.blogService.deleteBlog(id)
    }
    
    //// ========= gallery.post ========\\\\

    @Get('/galPost')
    getGalleryPosts(
      @Query() pagQDto:PaginationDTO ,
    ): Promise<GalleryPost[]> {
      return this.galleryPostService.getGalleryPosts(pagQDto.page, pagQDto.search);
    }
  
    @Get('/galPost/:id')
    getGalleryPost(
      @Query('id') id:string
    ): Promise<GalleryPost> {
      return this.galleryPostService.getGalleryPost(id);
    }
    
    @Post('/galPost')
    @Roles('admin', 'superAdmin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UsePipes(ValidationPipe)
    createGalleryPost(
        @Body() filterGalleryPostDTO: FilterGalleryPostDTO,
        // @Req() req: any,
    ): Promise<GalleryPost> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.galleryPostService.createGalleryPost(filterGalleryPostDTO)
    }
    
    @Put('/galPost')
    @Roles('admin', 'superAdmin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    updateGalleryPost(
      @Query('id') id:string, 
        @Body() filterGalleryPostDTO: FilterGalleryPostDTO,
        ) : Promise<GalleryPost> {
          return this.galleryPostService.updateGalleryPost(id, filterGalleryPostDTO)
        }
  
    @Delete('/galPost')
    @Roles('admin', 'superAdmin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    deleteGalleryPost(
      @Query('id') id:string, 
      ) : Promise<GalleryPost> {
        return this.galleryPostService.deleteGalleryPost(id)
      }
    //// ========= gallery.category ========\\\\

    @Get('/galcat')
    getGalleryCategories(
      @Query() pagQDto:PaginationDTO ,
    ): Promise<GalleryCategory[]> {
      return this.galleryCategoryService.getGalleryCategories(pagQDto.page, pagQDto.search);
    }
  
    @Get('/galcat/:id')
    getGalleryCategory(
      @Query('id') id:string
    ): Promise<GalleryCategory> {
      return this.galleryCategoryService.getGalleryCategory(id);
    }
    
    @Post('/galcat')
    @Roles('admin', 'superAdmin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @UsePipes(ValidationPipe)
    createGalleryCategory(
        @Body() filterGalleryCategoryDTO: FilterGalleryCategoryDTO,
        // @Req() req: any,
    ): Promise<GalleryCategory> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.galleryCategoryService.createGalleryCategory(filterGalleryCategoryDTO)
    }
    
    @Put('/galcat')
    @Roles('admin', 'superAdmin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    updateGalleryCategory(
      @Query('id') id:string, 
        @Body() filterGalleryCategoryDTO: FilterGalleryCategoryDTO,
        ) : Promise<GalleryCategory> {
          return this.galleryCategoryService.updateGalleryCategory(id, filterGalleryCategoryDTO)
        }
  
    @Delete('/galcat')
    @Roles('admin', 'superAdmin')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    deleteGalleryCategory(
      @Query('id') id:string, 
      ) : Promise<GalleryCategory> {
        return this.galleryCategoryService.deleteGalleryCategory(id)
      }
}