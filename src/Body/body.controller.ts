import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
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
import { PaginationDTO } from 'Dto/pagination-query.dto';


// @ApiHeader({
//   name: 'Authorization',
//   description: 'Auth Token'
// })
@ApiBearerAuth()
@Controller('body')
export class BodyController {
  constructor(
    private readonly BodyClauseService: BodyClauseService,
    private readonly BodyDiscountService: BodyDiscountService
  ) {}
  
  // ............................ Body Clause ...................//
  @Get('/clause')
  getBodiesClause(
    @Query() pagQDto:PaginationDTO ,
  ): Promise<BodyClause[]> {
    return this.BodyClauseService.getBodiesClause(pagQDto.page, pagQDto.search);
  }

  @Get('/clause/:id')
  getBodyClause(
    @Query('id') id:string
  ): Promise<BodyClause> {
    return this.BodyClauseService.getBodyClause(id);
  }
  
  @Post('/clause')
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(ValidationPipe)
  createBodyClause(
      @Body() filterBodyClauseDTO: FilterBodyClauseDTO,
      // @Req() req: any,
  ): Promise<BodyClause> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.BodyClauseService.createBodyClause(filterBodyClauseDTO)
  }

  @Patch('/clause')
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  updateBodyClause(
      @Query('id') id:string, 
      @Body() filterBodyClauseDTO: FilterBodyClauseDTO,
      @Req() req: any
  ) : Promise<BodyClause> {
      return this.BodyClauseService.updateBodyClause(id, filterBodyClauseDTO, req.user)
  }

  @Delete('/clause')
    @UseGuards(AuthGuard('jwt'), RolesGuard)
  deleteBodyClause(
      @Query('id') id:string, 
      @Req() req: any
  ) : Promise<BodyClause> {
      return this.BodyClauseService.deleteBodyClause(id, req.user)
  }
  
  // ............................ Body type ...................//
  @Get('/discount')
  getBodysType(
    @Query() pagQDto:PaginationDTO ,
  ): Promise<BodyDiscount[]> {
    return this.BodyDiscountService.getBodiesDiscount(pagQDto.page, pagQDto.search);
  }

  @Get('/discount/:id')
  getBodyDiscount(
    @Query('id') id:string
  ): Promise<BodyDiscount> {
    return this.BodyDiscountService.getBodyDiscount(id);
  }
  
  @Post('/discount')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(ValidationPipe)
  createBodyDiscount(
      @Body() filterBodyDiscountDTO: FilterBodyDiscountDTO,
      // @Req() req: any,
  ): Promise<BodyDiscount> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.BodyDiscountService.createBodyDiscount(filterBodyDiscountDTO)
  }

  @Patch('/discount')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  updateBodyDiscount(
      @Query('id') id:string, 
      @Body() filterBodyDiscountDTO: FilterBodyDiscountDTO,
      @Req() req: any
  ) : Promise<BodyDiscount> {
      return this.BodyDiscountService.updateBodyDiscount(id, filterBodyDiscountDTO, req.user)
  }

  @Delete('/discount')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  deleteBodyDiscount(
      @Query('id') id:string, 
      @Req() req: any
  ) : Promise<BodyDiscount> {
      return this.BodyDiscountService.deleteBodyDiscount(id, req.user)
  }

}