import { IsDate, IsObject, isString, IsString, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class FilterBlogDTO {

    @IsString()
    @ApiProperty({ description: 'title', default: 'This is about a new day.'})
    title: String
    
    @IsString()
    @ApiProperty({ description: 'description of the blog', default: 'bla bla bla'})
    description: String
    
    @IsString()
    @ApiProperty({ type: 'string', format: 'binary'})
    image: string
    
    @IsString()
    @ApiProperty({ type: 'string', format: 'binary'})
    author: string

}

export class FilterGalleryCategoryDTO {

    @IsString()
    @ApiProperty({ description: 'title', default: 'This is about a new day.'})
    title: String
    
    @IsString()
    @ApiProperty({ description: 'description of the blog', default: 'bla bla bla'})
    description: String
    
    @IsString()
    @ApiProperty({ type: 'string', format: 'binary'})
    image: string

}


export class FilterGalleryPostDTO {

    @IsString()
    @ApiProperty({ description: 'category', default: 'FARBOD'})
    category: string
    
    @IsString()
    @ApiProperty({ description: 'num of viewers', default: 0})
    views: number
    
    @IsString()
    @ApiProperty({ description: 'num of links', default: 0})
    links: number

}