import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { VehicleModel } from './Schemas/vehicleModel.schema';
import { FilterVehicleModelDTO } from './dto/filter-VehicleModel.dto';
import { FilterVehicleTypeDTO } from './dto/filter-VehicleType.dto';
import { VehicleModelService } from './Services/vehicle-model.service';
import { VehicleTypeService } from './Services/vehicle-type.service';
import { VehicleType } from './Schemas/vehicleType.schema';
import { RolesGuard } from './../Auth/decorators/roles.guard';
import { Roles } from '../Auth/decorators/roles.decorator';
import { VehicleBrand } from './Schemas/vehicleBrand.schema';
import { VehicleBrandService } from './Services/vehicle-brand.service';
import { VehicleUnitService } from './Services/vehicle-unit.service';
import { VehiclePriceService } from './Services/vehicle-price.service';
import { VehicleDetailService } from './Services/vehicle-detail.service';
import { FilterVehicleBrandDTO } from './dto/filter-VehicleBrand.dto';
import { VehicleUnit } from './Schemas/vehicleUnit.schema';
import { FilterVehicleUnitDTO } from './dto/filter-VehicleUnit.dto';
import { VehiclePrice } from './Schemas/vehiclePrice.schema';
import { FilterVehiclePriceDTO } from './dto/filter-VehiclePrice.dto';
import { VehicleDetail } from './Schemas/vehicleDetail.schema';
import { FilterVehicleDetailDTO } from './dto/filter-VehicleDetail.dto';


// @ApiHeader({
//   name: 'Authorization',
//   description: 'Auth Token'
// })
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('vehicle')
export class VehicleController {
  constructor(
    private readonly vehicleModelService: VehicleModelService,
    private readonly vehicleTypeService: VehicleTypeService,
    private readonly vehicleBrandService: VehicleBrandService,
    private readonly vehicleUnitService: VehicleUnitService,
    private readonly vehiclePriceService: VehiclePriceService,
    private readonly vehicleDetailService: VehicleDetailService
  ) {}
  
  // ............................ vehicle model ...................//
  @Get()
  @ApiBearerAuth()
  getVehiclesModel(): Promise<VehicleModel[]> {
    return this.vehicleModelService.getVehiclesModel();
  }

  @Get('/:id')
  @ApiBearerAuth()
  getVehicleModel(
    @Query('id', ParseIntPipe) id:string
  ): Promise<VehicleModel> {
    return this.vehicleModelService.getVehicleModel(id);
  }
  
  @Post('/vehiclemodel')
  @Roles('admin', 'superAdmin')
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  createVehicleModel(
      @Body() filterVehicleModelDTO: FilterVehicleModelDTO,
      // @Req() req: any,
  ): Promise<VehicleModel> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.vehicleModelService.createVehicleModel(filterVehicleModelDTO)
  }

  @Patch('/vehiclemodel')
  @Roles('admin', 'superAdmin')
  @ApiBearerAuth()
  updateVehicleModel(
      @Query('id', ParseIntPipe) id:string, 
      @Body() filterVehicleModelDTO: FilterVehicleModelDTO,
      @Req() req: any
  ) : Promise<VehicleModel> {
      return this.vehicleModelService.updateVehicleModel(id, filterVehicleModelDTO, req.user)
  }

  @Delete('/vehiclemodel')
  @ApiBearerAuth()
  deleteVehicleModel(
      @Query('id', ParseIntPipe) id:string, 
      @Req() req: any
  ) : Promise<VehicleModel> {
      return this.vehicleModelService.deleteVehicleModel(id, req.user)
  }
  
  // ............................ vehicle type ...................//
  @Get('/type')
  @ApiBearerAuth()
  getVehiclesType(): Promise<VehicleType[]> {
    return this.vehicleTypeService.getVehiclesType();
  }

  @Get('/type/:id')
  @ApiBearerAuth()
  getVehicleType(
    @Query('id', ParseIntPipe) id:string
  ): Promise<VehicleType> {
    return this.vehicleTypeService.getVehicleType(id);
  }
  
  @Post('/vehicletype')
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  createVehicleType(
      @Body() filterVehicleTypeDTO: FilterVehicleTypeDTO,
      // @Req() req: any,
  ): Promise<VehicleType> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.vehicleTypeService.createVehicleType(filterVehicleTypeDTO)
  }

  @Patch('/vehicletype')
  @ApiBearerAuth()
  updateVehicleType(
      @Query('id', ParseIntPipe) id:string, 
      @Body() filterVehicleTypeDTO: FilterVehicleTypeDTO,
      @Req() req: any
  ) : Promise<VehicleType> {
      return this.vehicleTypeService.updateVehicleType(id, filterVehicleTypeDTO, req.user)
  }

  @Delete('/vehicletype')
  @ApiBearerAuth()
  deleteVehicleType(
      @Query('id', ParseIntPipe) id:string, 
      @Req() req: any
  ) : Promise<VehicleType> {
      return this.vehicleTypeService.deleteVehicleType(id, req.user)
  }

  // ............................ vehicle brand ...................//
  @Get('/type')
  @ApiBearerAuth()
  getVehiclesBrand(): Promise<VehicleBrand[]> {
    return this.vehicleBrandService.getVehiclesBrand();
  }

  @Get('/type/:id')
  @ApiBearerAuth()
  getVehicleBrand(
    @Query('id', ParseIntPipe) id:string
  ): Promise<VehicleBrand> {
    return this.vehicleBrandService.getVehicleBrand(id);
  }
  
  @Post('/vehiclebrand')
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  createVehicleBrand(
      @Body() filterVehicleBrandDTO: FilterVehicleBrandDTO,
      // @Req() req: any,
  ): Promise<VehicleBrand> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.vehicleBrandService.createVehicleBrand(filterVehicleBrandDTO)
  }

  @Patch('/vehiclebrand')
  @ApiBearerAuth()
  updateVehicleBrand(
      @Query('id', ParseIntPipe) id:string, 
      @Body() filterVehicleBrandDTO: FilterVehicleBrandDTO,
      @Req() req: any
  ) : Promise<VehicleBrand> {
      return this.vehicleBrandService.updateVehicleBrand(id, filterVehicleBrandDTO, req.user)
  }

  @Delete('/vehiclebrand')
  @ApiBearerAuth()
  deleteVehicleBrand(
      @Query('id', ParseIntPipe) id:string, 
      @Req() req: any
  ) : Promise<VehicleBrand> {
      return this.vehicleBrandService.deleteVehicleBrand(id, req.user)
  }


  // ............................ vehicle Unit ...................//
  @Get('/type')
  @ApiBearerAuth()
  getVehiclesUnit(): Promise<VehicleUnit[]> {
    return this.vehicleUnitService.getVehiclesUnit();
  }

  @Get('/type/:id')
  @ApiBearerAuth()
  getVehicleUnit(
    @Query('id', ParseIntPipe) id:string
  ): Promise<VehicleUnit> {
    return this.vehicleUnitService.getVehicleUnit(id);
  }
  
  @Post('/vehicleunit')
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  createVehicleUnit(
      @Body() filterVehicleUnitDTO: FilterVehicleUnitDTO,
      // @Req() req: any,
  ): Promise<VehicleUnit> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.vehicleUnitService.createVehicleUnit(filterVehicleUnitDTO)
  }

  @Patch('/vehicleunit')
  @ApiBearerAuth()
  updateVehicleUnit(
      @Query('id', ParseIntPipe) id:string, 
      @Body() filterVehicleUnitDTO: FilterVehicleUnitDTO,
      @Req() req: any
  ) : Promise<VehicleUnit> {
      return this.vehicleUnitService.updateVehicleUnit(id, filterVehicleUnitDTO, req.user)
  }

  @Delete('/vehicleunit')
  @ApiBearerAuth()
  deleteVehicleUnit(
      @Query('id', ParseIntPipe) id:string, 
      @Req() req: any
  ) : Promise<VehicleUnit> {
      return this.vehicleUnitService.deleteVehicleUnit(id, req.user)
  }

  // ............................ vehicle Price ...................//
  @Get('/type')
  @ApiBearerAuth()
  getVehiclesPrice(): Promise<VehiclePrice[]> {
    return this.vehiclePriceService.getVehiclesPrice();
  }

  @Get('/type/:id')
  @ApiBearerAuth()
  getVehiclePrice(
    @Query('id', ParseIntPipe) id:string
  ): Promise<VehiclePrice> {
    return this.vehiclePriceService.getVehiclePrice(id);
  }
  
  @Post('/vehicleprice')
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  createVehiclePrice(
      @Body() filterVehiclePriceDTO: FilterVehiclePriceDTO,
      // @Req() req: any,
  ): Promise<VehiclePrice> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.vehiclePriceService.createVehiclePrice(filterVehiclePriceDTO)
  }

  @Patch('/vehicleprice')
  @ApiBearerAuth()
  updateVehiclePrice(
      @Query('id', ParseIntPipe) id:string, 
      @Body() filterVehiclePriceDTO: FilterVehiclePriceDTO,
      @Req() req: any
  ) : Promise<VehiclePrice> {
      return this.vehiclePriceService.updateVehiclePrice(id, filterVehiclePriceDTO, req.user)
  }

  @Delete('/vehicleprice')
  @ApiBearerAuth()
  deleteVehiclePrice(
      @Query('id', ParseIntPipe) id:string, 
      @Req() req: any
  ) : Promise<VehiclePrice> {
      return this.vehiclePriceService.deleteVehiclePrice(id, req.user)
  }


  // ............................ vehicle Detail ...................//
  @Get('/type')
  @ApiBearerAuth()
  getVehiclesDetail(): Promise<VehicleDetail[]> {
    return this.vehicleDetailService.getVehiclesDetail();
  }

  @Get('/type/:id')
  @ApiBearerAuth()
  getVehicleDetail(
    @Query('id', ParseIntPipe) id:string
  ): Promise<VehicleDetail> {
    return this.vehicleDetailService.getVehicleDetail(id);
  }
  
  @Post('/vehicledetail')
  @ApiBearerAuth()
  @UsePipes(ValidationPipe)
  createVehicleDetail(
      @Body() filterVehicleDetailDTO: FilterVehicleDetailDTO,
      // @Req() req: any,
  ): Promise<VehicleDetail> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.vehicleDetailService.createVehicleDetail(filterVehicleDetailDTO)
  }

  @Patch('/vehicledetail')
  @ApiBearerAuth()
  updateVehicleDetail(
      @Query('id', ParseIntPipe) id:string, 
      @Body() filterVehicleDetailDTO: FilterVehicleDetailDTO,
      @Req() req: any
  ) : Promise<VehicleDetail> {
      return this.vehicleDetailService.updateVehicleDetail(id, filterVehicleDetailDTO, req.user)
  }

  @Delete('/vehicledetail')
  @ApiBearerAuth()
  deleteVehicleDetail(
      @Query('id', ParseIntPipe) id:string, 
      @Req() req: any
  ) : Promise<VehicleDetail> {
      return this.vehicleDetailService.deleteVehicleDetail(id, req.user)
  }

}