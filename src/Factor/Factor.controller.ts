import { BadRequestException, Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Post, PreconditionFailedException, Put, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { FactorService } from './Factor.service';
import { RolesGuard } from 'Auth/decorators/roles.guard';
import { Roles } from 'Auth/decorators/roles.decorator';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth } from "@nestjs/swagger";
import { Factor } from './Factor.schema';
import { FilterFactorDTO } from './dto/filter-factor.dto';
import { InsuranceService } from 'Insurance/insurance.service';
import { PaginationDTO } from 'Dto/pagination-query.dto';



@Controller('InsuranceType')
export class FactorController {
  constructor(
    private readonly FactorService: FactorService,
    private readonly InsuranceService: InsuranceService,
    ) {}
  

  // the user factor record must be returned so @Req is need and req.user must be queried from DB
  @Get()
  getFactors(
    @Query() pagQDto:PaginationDTO ,
  ): Promise<Factor[]> {
    return this.FactorService.getFactors(pagQDto.page, pagQDto.search);
  }

  @Get('/:id')
  getFactor(
    @Query('id') id:string
  ): Promise<Factor> {
    return this.FactorService.getFactor(id);
  }
  
  @Post()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(ValidationPipe)
  async createFactor(
    @Body() FilterFactorDTO: FilterFactorDTO,
    @Query('isPreview') isPreview: boolean 
    // @Body('province', ObjectIdValidationPipe) provinceId: ObjectId  // if we want to validate an object id 
    // @Req() req: any,
    ): Promise<Factor> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      const prices = this.InsuranceService.thirdParty(FilterFactorDTO, isPreview)
      let validPrice = await filter(prices, price => {
        return price.amount === FilterFactorDTO.basePrice
      })

      async function filter(arr, callback) {
        const fail = Symbol()
        return (await Promise.all(arr.map(async item => (await callback(item)) ? item : fail))).filter(i=>i!==fail)
      }

      if(validPrice[0] !== FilterFactorDTO.price) throw new BadRequestException(` price are not equal`)
      return this.FactorService.createFactor(FilterFactorDTO)
    }
    
  @Put()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(ValidationPipe)
  updateFactor(
      @Query('id') id:string, 
      @Body() FilterFactorDTO: FilterFactorDTO,
      @Req() req: any
  ) : Promise<Factor> {
      return this.FactorService.updateFactor(id, FilterFactorDTO, req.user)
  }

  @Delete()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  deleteFactor(
      @Query('id') id:string, 
      @Req() req: any
  ) : Promise<Factor> {
      return this.FactorService.deleteFactor(id, req.user)
  }
}