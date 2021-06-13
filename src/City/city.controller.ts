import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { CityService } from './city.service';
import { City } from './city.schema';
import { FilterCityDTO } from './dto/filter-city.dto';
import { ObjectIdValidationPipe } from 'src/pipes/objectId-validation.pipe';
import { ObjectId } from 'mongoose';


// @ApiHeader({
//   name: 'Authorization',
//   description: 'Auth Token'
// })
@UseGuards(AuthGuard('jwt'))
@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}
  
  @Get()
  @ApiBearerAuth()
  getCities(): Promise<City[]> {
    return this.cityService.getCities();
  }
  
  @Post()
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
}