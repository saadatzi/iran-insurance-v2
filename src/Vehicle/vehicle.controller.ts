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
import { Roles } from 'src/Auth/decorators/roles.decorator';


// @ApiHeader({
//   name: 'Authorization',
//   description: 'Auth Token'
// })
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('vehicle')
export class VehicleController {
  constructor(
    private readonly vehicleModelService: VehicleModelService,
    private readonly vehicleTypeService: VehicleTypeService
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

}