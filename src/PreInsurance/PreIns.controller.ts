import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { PreInsService } from './PreIns.service';
import { RolesGuard } from 'Auth/decorators/roles.guard';
import { Roles } from 'Auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from "@nestjs/swagger";
import { PreInsurance } from './PreIns.schema';
import { FilterPreInsDTO } from './dto/filter-preIns.dto';



@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('InsuranceType')
export class PreInsController {
  constructor(private readonly PreInsService: PreInsService) {}
  
  @Get()
  @ApiBearerAuth()
  getPreInss(): Promise<PreInsurance[]> {
    return this.PreInsService.getPreInss();
  }

  @Get('/:id')
  @ApiBearerAuth()
  getPreIns(
    @Query('id') id:string
  ): Promise<PreInsurance> {
    return this.PreInsService.getPreIns(id);
  }
  
  @Post()
  @Roles('admin', 'superAdmin')
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  createPreIns(
      @Body() FilterPreInsDTO: FilterPreInsDTO,
      // @Body('province', ObjectIdValidationPipe) provinceId: ObjectId  // if we want to validate an object id 
      // @Req() req: any,
  ): Promise<PreInsurance> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.PreInsService.createPreIns(FilterPreInsDTO)
  }

  @Put()
  @Roles('admin', 'superAdmin')
  @ApiBearerAuth()
  updatePreIns(
      @Query('id') id:string, 
      @Body() FilterPreInsDTO: FilterPreInsDTO,
      @Req() req: any
  ) : Promise<PreInsurance> {
      return this.PreInsService.updatePreIns(id, FilterPreInsDTO, req.user)
  }

  @Delete()
  @ApiBearerAuth()
  deletePreIns(
      @Query('id') id:string, 
      @Req() req: any
  ) : Promise<PreInsurance> {
      return this.PreInsService.deletePreIns(id, req.user)
  }
}