import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { CityService } from './city.service';
import { City } from './city.schema';
import { FilterCityDTO } from './dto/filter-city.dto';
import { ObjectIdValidationPipe } from '../pipes/objectId-validation.pipe';
import { ObjectId } from 'mongoose';
import { RolesGuard } from 'Auth/decorators/roles.guard';
import { Roles } from 'Auth/decorators/roles.decorator';


@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}
  
  @Get()
  @ApiBearerAuth()
  getCities(): Promise<City[]> {
    return this.cityService.getCities();
  }
  
  @Post()
  @Roles('admin', 'superAdmin')
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  createCity(
      @Body() filterCityDTO: FilterCityDTO,
      @Body('province', ObjectIdValidationPipe) provinceId: ObjectId 
      // @Req() req: any,
  ): Promise<City> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.cityService.createCity(filterCityDTO)
  }

  @Put()
  @Roles('admin', 'superAdmin')
  @ApiBearerAuth()
  updateCity(
      @Query('id', ParseIntPipe) id:string, 
      @Body() filterCityDTO: FilterCityDTO,
      @Req() req: any
  ) : Promise<City> {
      return this.cityService.updateCity(id, filterCityDTO, req.user)
  }

  @Delete()
  @ApiBearerAuth()
  deleteCity(
      @Query('id', ParseIntPipe) id:string, 
      @Req() req: any
  ) : Promise<City> {
      return this.cityService.deleteCity(id, req.user)
  }
}