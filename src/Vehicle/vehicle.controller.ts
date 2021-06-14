import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { Province } from './province.schema';
import { FilterProvinceDTO } from './dto/filter-province.dto';
import { ProvinceService } from './province.service';


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
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  createProvince(
      @Body() filterProvinceDTO: FilterProvinceDTO,
      // @Req() req: any,
  ): Promise<Province> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.provinceService.createProvince(filterProvinceDTO)
  }
}