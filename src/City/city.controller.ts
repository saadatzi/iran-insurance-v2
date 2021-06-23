import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { CityService } from './city.service';
import { City } from './city.schema';
import { FilterCityDTO } from './dto/filter-city.dto';
// import { ObjectIdValidationPipe } from '../pipes/objectId-validation.pipe';
import { ObjectId } from 'mongoose';
import { RolesGuard } from 'Auth/decorators/roles.guard';
import { Roles } from 'Auth/decorators/roles.decorator';
import { query } from 'express';
import { PaginationDTO } from '../Dto/pagination-query.dto';


@ApiBearerAuth()
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}
  
  @Get('/:id')
  getCity(
    @Param('id') id:string
  ): Promise<City> {
    return this.cityService.getCity(id);
  }
  
  @Get()
  getCities(
    @Query() pagQDto:PaginationDTO ,
  ): Promise<City[]> {
    return this.cityService.getCities(pagQDto.page, pagQDto.search);
  }
  
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'superAdmin')
  @UsePipes(ValidationPipe)
  createCity(
      @Body() filterCityDTO: FilterCityDTO,
      // @Body('province', ObjectIdValidationPipe) provinceId: ObjectId 
      // @Req() req: any,
  ): Promise<City> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.cityService.createCity(filterCityDTO)
  }

  @Put()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles('admin', 'superAdmin')
  updateCity(
      @Query('id') id:string, 
      @Body() filterCityDTO: FilterCityDTO,
      @Req() req: any
  ) : Promise<City> {
      return this.cityService.updateCity(id, filterCityDTO, req.user)
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  deleteCity(
      @Query('id') id:string, 
      @Req() req: any
  ) : Promise<City> {
      return this.cityService.deleteCity(id, req.user)
  }
}