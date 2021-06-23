import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { Province } from './province.schema';
import { FilterProvinceDTO } from './dto/filter-province.dto';
import { ProvinceService } from './province.service';
import { Roles } from 'Auth/decorators/roles.decorator';
import { PaginationDTO } from 'Dto/pagination-query.dto';


// @ApiHeader({
//   name: 'Authorization',
//   description: 'Auth Token'
// })
@Controller('province')
export class ProvinceController {
  constructor(private readonly provinceService: ProvinceService) {}
  
  @Get('/:id')
  getProvince(
    @Query('id') id:string
  ): Promise<Province> {
    return this.provinceService.getProvince(id);
  }

  @Get()
  getProvinces(
    @Query() pagQDto:PaginationDTO ,
  ): Promise<Province[]> {
    return this.provinceService.getProvinces(pagQDto.page, pagQDto.search);
  }
  
  @Post()
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'))
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
  @UseGuards(AuthGuard('jwt'))
  updateCity(
      @Query('id') id:string, 
      @Body() filterProvinceDTO: FilterProvinceDTO,
      @Req() req: any
  ) : Promise<Province> {
      return this.provinceService.updateProvince(id, filterProvinceDTO, req.user)
  }

  @Delete()
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'))
  deleteCity(
      @Query('id') id:string, 
      @Req() req: any
  ) : Promise<Province> {
      return this.provinceService.deleteProvince(id, req.user)
  }
}