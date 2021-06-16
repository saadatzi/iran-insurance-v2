import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../Auth/decorators/roles.guard';
import { Roles } from '../Auth/decorators/roles.decorator';
import { BodyClause } from './Schemas/bodyClause.schema';
import { FilterBodyClauseDTO } from './dto/filter-BodyClause.dto';
import { BodyClauseService } from './Services/body-Clause.service';
import { BodyDiscountService } from './Services/body-Discount.service';
import { BodyDiscount } from './Schemas/bodyDiscount.schema';
import { FilterBodyDiscountDTO } from './dto/filter-BodyDiscount.dto';


// @ApiHeader({
//   name: 'Authorization',
//   description: 'Auth Token'
// })
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('vehicle')
export class BodyController {
  constructor(
    private readonly BodyClauseService: BodyClauseService,
    private readonly BodyDiscountService: BodyDiscountService
  ) {}
  
  // ............................ Body Clause ...................//
  @Get()
  @ApiBearerAuth()
  getBodiesClause(): Promise<BodyClause[]> {``
    return this.BodyClauseService.getBodiesClause();
  }

  @Get('/:id')
  @ApiBearerAuth()
  getBodyClause(
    @Query('id', ParseIntPipe) id:string
  ): Promise<BodyClause> {
    return this.BodyClauseService.getBodyClause(id);
  }
  
  @Post('/bodyclause')
  @Roles('admin', 'superAdmin')
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  createBodyClause(
      @Body() filterBodyClauseDTO: FilterBodyClauseDTO,
      // @Req() req: any,
  ): Promise<BodyClause> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.BodyClauseService.createBodyClause(filterBodyClauseDTO)
  }

  @Patch('/bodyclause')
  @Roles('admin', 'superAdmin')
  @ApiBearerAuth()
  updateBodyClause(
      @Query('id', ParseIntPipe) id:string, 
      @Body() filterBodyClauseDTO: FilterBodyClauseDTO,
      @Req() req: any
  ) : Promise<BodyClause> {
      return this.BodyClauseService.updateBodyClause(id, filterBodyClauseDTO, req.user)
  }

  @Delete('/bodyclause')
  @ApiBearerAuth()
  deleteBodyClause(
      @Query('id', ParseIntPipe) id:string, 
      @Req() req: any
  ) : Promise<BodyClause> {
      return this.BodyClauseService.deleteBodyClause(id, req.user)
  }
  
  // ............................ Body type ...................//
  @Get('/type')
  @ApiBearerAuth()
  getBodysType(): Promise<BodyDiscount[]> {
    return this.BodyDiscountService.getBodiesDiscount();
  }

  @Get('/type/:id')
  @ApiBearerAuth()
  getBodyDiscount(
    @Query('id', ParseIntPipe) id:string
  ): Promise<BodyDiscount> {
    return this.BodyDiscountService.getBodyDiscount(id);
  }
  
  @Post('/bodydiscount')
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  createBodyDiscount(
      @Body() filterBodyDiscountDTO: FilterBodyDiscountDTO,
      // @Req() req: any,
  ): Promise<BodyDiscount> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.BodyDiscountService.createBodyDiscount(filterBodyDiscountDTO)
  }

  @Patch('/bodydiscount')
  @ApiBearerAuth()
  updateBodyDiscount(
      @Query('id', ParseIntPipe) id:string, 
      @Body() filterBodyDiscountDTO: FilterBodyDiscountDTO,
      @Req() req: any
  ) : Promise<BodyDiscount> {
      return this.BodyDiscountService.updateBodyDiscount(id, filterBodyDiscountDTO, req.user)
  }

  @Delete('/bodydiscount')
  @ApiBearerAuth()
  deleteBodyDiscount(
      @Query('id', ParseIntPipe) id:string, 
      @Req() req: any
  ) : Promise<BodyDiscount> {
      return this.BodyDiscountService.deleteBodyDiscount(id, req.user)
  }

}