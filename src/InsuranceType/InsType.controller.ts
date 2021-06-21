import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put, Query, Req, Res, UploadedFile, UploadedFiles, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { InsTypeService } from './InsType.service';
import { RolesGuard } from 'Auth/decorators/roles.guard';
import { Roles } from 'Auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiConsumes } from "@nestjs/swagger";
import { InsType } from './InsType.schema';
import { FilterInsTypeDTO } from './dto/filter-insType.dto';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { editFileName } from 'utils/editFileName';
import { imageFileFilter } from 'utils/file-uploading.utils';
import { diskStorage } from 'multer'



// @UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('InsuranceType')
export class InsTypeController {
  constructor(private readonly insTypeService: InsTypeService) {}

  @Get(':imgpath')
  seeUploadfile(
    @Param('imgpath') image,
    @Res() res
  ) {
    return res.sendFile(image, {root: './files'})
  }
  
  @Get()
  @ApiBearerAuth()
  getInsTypes(): Promise<InsType[]> {
    return this.insTypeService.getInsTypes();
  }

  @Get('/:id')
  @ApiBearerAuth()
  getInsType(
    @Query('id') id:string
  ): Promise<InsType> {
    return this.insTypeService.getInsType(id);
  }
  
  @ApiConsumes('multipart/form-data')
  @Post()
  @Roles('admin', 'superAdmin')
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('image_url', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }))
  async createInsType(
      @UploadedFile() file:Express.Multer.File,
      @Body() filterInsTypeDTO: FilterInsTypeDTO,
      // @Body('province', ObjectIdValidationPipe) provinceId: ObjectId  // if we want to validate an object id 
      // @Req() req: any,
  ){
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)

    const response = {
      originalname: file.originalname,
      filename: file.filename
    }
    filterInsTypeDTO.image_url = response.filename
    const bodyRes = await this.insTypeService.createInsType(filterInsTypeDTO)

    return {bodyRes}
  }

  @ApiConsumes('multipart/form-data')
  @Put()
  @Roles('admin', 'superAdmin')
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  @UseInterceptors(
    FileInterceptor('image_url', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    })
  )
  updateInsType(
      @UploadedFile() file:Express.Multer.File,
      @Query('id') id:string, 
      @Body() filterInsTypeDTO: FilterInsTypeDTO,
  ) : Promise<InsType> {
      const response = {
        originalname: file.originalname,
        filename: file.filename
      }
      filterInsTypeDTO.image_url = response.filename
      return this.insTypeService.updateInsType(id, filterInsTypeDTO)
  }

  @Delete()
  @ApiBearerAuth()
  deleteInsType(
      @Query('id') id:string, 
  ) : Promise<InsType> {
      return this.insTypeService.deleteInsType(id)
  }
}