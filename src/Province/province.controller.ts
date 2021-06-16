import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { Province } from './province.schema';
import { FilterProvinceDTO } from './dto/filter-province.dto';
import { ProvinceService } from './province.service';
import { Roles } from 'Auth/decorators/roles.decorator';


// @ApiHeader({
//   name: 'Authorization',
//   description: 'Auth Token'
// })
@UseGuards(AuthGuard('jwt'))
@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}
  
  @Get()
  @ApiBearerAuth()
  getProvinces(): Promise<Province[]> {
    return this.provinceService.getProvinces();
  }
  
  @Post()
  @Roles('admin', 'superAdmin')
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  createProvince(
      @Body() filterProvinceDTO: FilterProvinceDTO,
      // @Req() req: any,
  ): Promise<Province> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.provinceService.createProvince(filterProvinceDTO)
  }


  @Put()
  @Roles('admin', 'superAdmin')
  @ApiBearerAuth()
  updateCity(
      @Query('id', ParseIntPipe) id:string, 
      @Body() filterProvinceDTO: FilterProvinceDTO,
      @Req() req: any
  ) : Promise<Province> {
      return this.provinceService.updateProvince(id, filterProvinceDTO, req.user)
  }

  @Delete()
  @ApiBearerAuth()
  deleteCity(
      @Query('id', ParseIntPipe) id:string, 
      @Req() req: any
  ) : Promise<Province> {
      return this.provinceService.deleteProvince(id, req.user)
  }
}