import { IsDate, IsObject, isString, IsString, MaxLength, MinLength } from "class-validator"
import { ApiProperty } from '@nestjs/swagger';

export class FilterBlogDTO {

    @IsString()
    @ApiProperty({ description: 'title', default: 'This is about a new day.'})
    title: String
    
    @ApiProperty({ description: 'description of the blog', default: 'bla bla bla'})
    description: String

    @ApiProperty({ type: 'string', format: 'binary'})
    image: string
    
    @ApiProperty({ type: 'string', format: 'binary'})
    author: string

}

export class FilterGalleryCategoryDTO {

    @IsString()
    @ApiProperty({ description: 'title', default: 'This is about a new day.'})
    title: String
    
    @ApiProperty({ description: 'description of the blog', default: 'bla bla bla'})
    description: String

    @ApiProperty({ type: 'string', format: 'binary'})
    image: string

}


export class FilterGalleryPostDTO {

    @IsString()
    @ApiProperty({ description: 'category', default: 'FARBOD'})
    category: string
    
    @ApiProperty({ description: 'num of viewers', default: 0})
    views: number

    @ApiProperty({ description: 'num of links', default: 0})
    links: number

}