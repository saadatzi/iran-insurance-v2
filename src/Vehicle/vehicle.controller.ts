import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Query, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiHeader } from "@nestjs/swagger";
import { AuthGuard } from '@nestjs/passport';
import { VehicleModel } from './schemas/vehicleModel.schema';
import { FilterVehicleModelDTO } from './dto/filter-VehicleModel.dto';
import { FilterVehicleTypeDTO } from './dto/filter-VehicleType.dto';
import { VehicleModelService } from './services/vehicle-model.service';
import { VehicleTypeService } from './services/vehicle-type.service';
import { VehicleType } from './schemas/vehicleType.schema';
import { RolesGuard } from './../Auth/decorators/roles.guard';
import { Roles } from '../Auth/decorators/roles.decorator';
import { VehicleBrand } from './schemas/vehicleBrand.schema';
import { VehicleBrandService } from './services/vehicle-brand.service';
import { VehicleUnitService } from './services/vehicle-unit.service';
import { VehiclePriceService } from './services/vehicle-price.service';
import { VehicleDetailService } from './services/vehicle-detail.service';
import { FilterVehicleBrandDTO } from './dto/filter-VehicleBrand.dto';
import { VehicleUnit } from './schemas/vehicleUnit.schema';
import { FilterVehicleUnitDTO } from './dto/filter-VehicleUnit.dto';
import { VehiclePrice } from './schemas/vehiclePrice.schema';
import { FilterVehiclePriceDTO } from './dto/filter-VehiclePrice.dto';
import { VehicleDetail } from './schemas/vehicleDetail.schema';
import { FilterVehicleDetailDTO } from './dto/filter-VehicleDetail.dto';
import { PaginationDTO } from 'Dto/pagination-query.dto';


// @ApiHeader({
//   name: 'Authorization',
//   description: 'Auth Token'
// })
@ApiBearerAuth()
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
  @Get('/model')
  getVehiclesModel(
    @Query() pagQDto:PaginationDTO ,
  ): Promise<VehicleModel[]> {
    return this.vehicleModelService.getVehiclesModel(pagQDto.page, pagQDto.search);
  }

  @Get('/model/:id')
  getVehicleModel(
    @Query('id') id:string
  ): Promise<VehicleModel> {
    return this.vehicleModelService.getVehicleModel(id);
  }
  
  @Post('/model')
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(ValidationPipe)
  createVehicleModel(
      @Body() filterVehicleModelDTO: FilterVehicleModelDTO,
      // @Req() req: any,
  ): Promise<VehicleModel> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.vehicleModelService.createVehicleModel(filterVehicleModelDTO)
  }

  @Patch('/model')
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  updateVehicleModel(
      @Query('id') id:string, 
      @Body() filterVehicleModelDTO: FilterVehicleModelDTO,
      @Req() req: any
  ) : Promise<VehicleModel> {
      return this.vehicleModelService.updateVehicleModel(id, filterVehicleModelDTO, req.user)
  }

  @Delete('/model')
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  deleteVehicleModel(
      @Query('id') id:string, 
      @Req() req: any
  ) : Promise<VehicleModel> {
      return this.vehicleModelService.deleteVehicleModel(id, req.user)
  }
  
  // ............................ vehicle type ...................//
  @Get('/type')
  getVehiclesType(
    @Query() pagQDto:PaginationDTO ,
  ): Promise<VehicleType[]> {
    return this.vehicleTypeService.getVehiclesType(pagQDto.page, pagQDto.search);
  }

  @Get('/type/:id')
  getVehicleType(
    // @Query('id') id:string if the id where numeric you must check the validation by ParsIntPipe.
    @Query('id') id:string
  ): Promise<VehicleType> {
    return this.vehicleTypeService.getVehicleType(id);
  }
  
  @Post('/type')
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(ValidationPipe)
  createVehicleType(
      @Body() filterVehicleTypeDTO: FilterVehicleTypeDTO,
      // @Req() req: any,
  ): Promise<VehicleType> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.vehicleTypeService.createVehicleType(filterVehicleTypeDTO)
  }

  @Patch('/type')
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  updateVehicleType(
      @Query('id') id:string, 
      @Body() filterVehicleTypeDTO: FilterVehicleTypeDTO,
      @Req() req: any
  ) : Promise<VehicleType> {
      return this.vehicleTypeService.updateVehicleType(id, filterVehicleTypeDTO, req.user)
  }

  @Delete('/type')
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  deleteVehicleType(
      @Query('id') id:string, 
      @Req() req: any
  ) : Promise<VehicleType> {
      return this.vehicleTypeService.deleteVehicleType(id, req.user)
  }

  // ............................ vehicle brand ...................//
  @Get('/brand')
  getVehiclesBrand(
    @Query() pagQDto:PaginationDTO ,
  ): Promise<VehicleBrand[]> {
    return this.vehicleBrandService.getVehiclesBrand(pagQDto.page, pagQDto.search);
  }

  @Get('/brand/:id')
  getVehicleBrand(
    @Query('id') id:string
  ): Promise<VehicleBrand> {
    return this.vehicleBrandService.getVehicleBrand(id);
  }
  
  @Post('/brand')
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(ValidationPipe)
  createVehicleBrand(
      @Body() filterVehicleBrandDTO: FilterVehicleBrandDTO,
      // @Req() req: any,
  ): Promise<VehicleBrand> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.vehicleBrandService.createVehicleBrand(filterVehicleBrandDTO)
  }

  @Patch('/brand')
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  updateVehicleBrand(
      @Query('id') id:string, 
      @Body() filterVehicleBrandDTO: FilterVehicleBrandDTO,
      @Req() req: any
  ) : Promise<VehicleBrand> {
      return this.vehicleBrandService.updateVehicleBrand(id, filterVehicleBrandDTO, req.user)
  }

  @Delete('/brand')
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  deleteVehicleBrand(
      @Query('id') id:string, 
      @Req() req: any
  ) : Promise<VehicleBrand> {
      return this.vehicleBrandService.deleteVehicleBrand(id, req.user)
  }


  // ............................ vehicle Unit ...................//
  @Get('/unit')
  getVehiclesUnit(
    @Query() pagQDto:PaginationDTO ,
  ): Promise<VehicleUnit[]> {
    return this.vehicleUnitService.getVehiclesUnit(pagQDto.page, pagQDto.search);
  }

  @Get('/unit/:id')
  getVehicleUnit(
    @Query('id') id:string
  ): Promise<VehicleUnit> {
    return this.vehicleUnitService.getVehicleUnit(id);
  }
  
  @Post('/unit')
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(ValidationPipe)
  createVehicleUnit(
      @Body() filterVehicleUnitDTO: FilterVehicleUnitDTO,
      // @Req() req: any,
  ): Promise<VehicleUnit> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.vehicleUnitService.createVehicleUnit(filterVehicleUnitDTO)
  }

  @Patch('/unit')
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  updateVehicleUnit(
      @Query('id') id:string, 
      @Body() filterVehicleUnitDTO: FilterVehicleUnitDTO,
      @Req() req: any
  ) : Promise<VehicleUnit> {
      return this.vehicleUnitService.updateVehicleUnit(id, filterVehicleUnitDTO, req.user)
  }

  @Delete('/unit')
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  deleteVehicleUnit(
      @Query('id') id:string, 
      @Req() req: any
  ) : Promise<VehicleUnit> {
      return this.vehicleUnitService.deleteVehicleUnit(id, req.user)
  }

  // ............................ vehicle Price ...................//
  @Get('/price')
  getVehiclesPrice(
    @Query() pagQDto:PaginationDTO ,
  ): Promise<VehiclePrice[]> {
    return this.vehiclePriceService.getVehiclesPrice(pagQDto.page, pagQDto.search);
  }

  @Get('/price/:id')
  getVehiclePrice(
    @Query('id') id:string
  ): Promise<VehiclePrice> {
    return this.vehiclePriceService.getVehiclePrice(id);
  }
  
  @Post('/price')
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @UsePipes(ValidationPipe)
  createVehiclePrice(
      @Body() filterVehiclePriceDTO: FilterVehiclePriceDTO,
      // @Req() req: any,
  ): Promise<VehiclePrice> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.vehiclePriceService.createVehiclePrice(filterVehiclePriceDTO)
  }

  @Patch('/price')
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  updateVehiclePrice(
      @Query('id') id:string, 
      @Body() filterVehiclePriceDTO: FilterVehiclePriceDTO,
      @Req() req: any
  ) : Promise<VehiclePrice> {
      return this.vehiclePriceService.updateVehiclePrice(id, filterVehiclePriceDTO, req.user)
  }

  @Delete('/price')
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  deleteVehiclePrice(
      @Query('id') id:string, 
      @Req() req: any
  ) : Promise<VehiclePrice> {
      return this.vehiclePriceService.deleteVehiclePrice(id, req.user)
  }


  // ............................ vehicle Detail ...................//
  @Get('/detail')
  getVehiclesDetail(
    @Query() pagQDto:PaginationDTO ,
  ): Promise<VehicleDetail[]> {
    return this.vehicleDetailService.getVehiclesDetail(pagQDto.page, pagQDto.search);
  }

  @Get('/detail/:id')
  getVehicleDetail(
    @Query('id') id:string
  ): Promise<VehicleDetail> {
    return this.vehicleDetailService.getVehicleDetail(id);
  }
  
  @Post('/detail')
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  createVehicleDetail(
      @Body() filterVehicleDetailDTO: FilterVehicleDetailDTO,
      // @Req() req: any,
  ): Promise<VehicleDetail> {
      // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
      return this.vehicleDetailService.createVehicleDetail(filterVehicleDetailDTO)
  }

  @Patch('/detail')
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  updateVehicleDetail(
      @Query('id') id:string, 
      @Body() filterVehicleDetailDTO: FilterVehicleDetailDTO,
      @Req() req: any
  ) : Promise<VehicleDetail> {
      return this.vehicleDetailService.updateVehicleDetail(id, filterVehicleDetailDTO, req.user)
  }

  @Delete('/detail')
  @Roles('admin', 'superAdmin')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  deleteVehicleDetail(
      @Query('id') id:string, 
      @Req() req: any
  ) : Promise<VehicleDetail> {
      return this.vehicleDetailService.deleteVehicleDetail(id, req.user)
  }

}