import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { InsuranceService } from './insurance.service';
import { FilterInsuranceDTO } from './dto/filter-insurance.dto';
import { ObjectIdValidationPipe } from '../pipes/objectId-validation.pipe';
import { ObjectId } from 'mongoose';


@Controller('thirdparty')
export class InsuranceController {
  constructor(private readonly insuranceService: InsuranceService) {}
  
  @Post()
  // @UsePipes(ValidationPipe)
  thirdParty(
      @Body(ValidationPipe) filterInsuranceDTO: FilterInsuranceDTO,
      @Query('isPreview') isPreview: boolean 
      // @Req() req: any,
  ): Promise<JSON[]> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.insuranceService.thirdParty(filterInsuranceDTO, isPreview)
  }

}