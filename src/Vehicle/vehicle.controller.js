"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.VehicleController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var passport_1 = require("@nestjs/passport");
var roles_guard_1 = require("./../Auth/decorators/roles.guard");
var roles_decorator_1 = require("../Auth/decorators/roles.decorator");
// @ApiHeader({
//   name: 'Authorization',
//   description: 'Auth Token'
// })
var VehicleController = /** @class */ (function () {
    function VehicleController(vehicleModelService, vehicleTypeService) {
        this.vehicleModelService = vehicleModelService;
        this.vehicleTypeService = vehicleTypeService;
    }
    // ............................ vehicle model ...................//
    VehicleController.prototype.getVehiclesModel = function () {
        return this.vehicleModelService.getVehiclesModel();
    };
    VehicleController.prototype.getVehicleModel = function (id) {
        return this.vehicleModelService.getVehicleModel(id);
    };
    VehicleController.prototype.createVehicleModel = function (filterVehicleModelDTO) {
        // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
        return this.vehicleModelService.createVehicleModel(filterVehicleModelDTO);
    };
    VehicleController.prototype.updateVehicleModel = function (id, filterVehicleModelDTO, req) {
        return this.vehicleModelService.updateVehicleModel(id, filterVehicleModelDTO, req.user);
    };
    VehicleController.prototype.deleteVehicleModel = function (id, req) {
        return this.vehicleModelService.deleteVehicleModel(id, req.user);
    };
    // ............................ vehicle type ...................//
    VehicleController.prototype.getVehiclesType = function () {
        return this.vehicleTypeService.getVehiclesType();
    };
    VehicleController.prototype.getVehicleType = function (id) {
        return this.vehicleTypeService.getVehicleType(id);
    };
    VehicleController.prototype.createVehicleType = function (filterVehicleTypeDTO) {
        // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
        return this.vehicleTypeService.createVehicleType(filterVehicleTypeDTO);
    };
    VehicleController.prototype.updateVehicleType = function (id, filterVehicleTypeDTO, req) {
        return this.vehicleTypeService.updateVehicleType(id, filterVehicleTypeDTO, req.user);
    };
    VehicleController.prototype.deleteVehicleType = function (id, req) {
        return this.vehicleTypeService.deleteVehicleType(id, req.user);
    };
    __decorate([
        common_1.Get(),
        swagger_1.ApiBearerAuth()
    ], VehicleController.prototype, "getVehiclesModel");
    __decorate([
        common_1.Get('/:id'),
        swagger_1.ApiBearerAuth(),
        __param(0, common_1.Query('id', common_1.ParseIntPipe))
    ], VehicleController.prototype, "getVehicleModel");
    __decorate([
        common_1.Post('/vehiclemodel'),
        roles_decorator_1.Roles('admin', 'superAdmin'),
        swagger_1.ApiBearerAuth(),
        common_1.UsePipes(common_1.ValidationPipe),
        __param(0, common_1.Body())
    ], VehicleController.prototype, "createVehicleModel");
    __decorate([
        common_1.Patch('/vehiclemodel'),
        roles_decorator_1.Roles('admin', 'superAdmin'),
        swagger_1.ApiBearerAuth(),
        __param(0, common_1.Query('id', common_1.ParseIntPipe)),
        __param(1, common_1.Body()),
        __param(2, common_1.Req())
    ], VehicleController.prototype, "updateVehicleModel");
    __decorate([
        common_1.Delete('/vehiclemodel'),
        swagger_1.ApiBearerAuth(),
        __param(0, common_1.Query('id', common_1.ParseIntPipe)),
        __param(1, common_1.Req())
    ], VehicleController.prototype, "deleteVehicleModel");
    __decorate([
        common_1.Get('/type'),
        swagger_1.ApiBearerAuth()
    ], VehicleController.prototype, "getVehiclesType");
    __decorate([
        common_1.Get('/type/:id'),
        swagger_1.ApiBearerAuth(),
        __param(0, common_1.Query('id', common_1.ParseIntPipe))
    ], VehicleController.prototype, "getVehicleType");
    __decorate([
        common_1.Post('/vehicletype'),
        swagger_1.ApiBearerAuth(),
        common_1.UsePipes(common_1.ValidationPipe),
        __param(0, common_1.Body())
    ], VehicleController.prototype, "createVehicleType");
    __decorate([
        common_1.Patch('/vehicletype'),
        swagger_1.ApiBearerAuth(),
        __param(0, common_1.Query('id', common_1.ParseIntPipe)),
        __param(1, common_1.Body()),
        __param(2, common_1.Req())
    ], VehicleController.prototype, "updateVehicleType");
    __decorate([
        common_1.Delete('/vehicletype'),
        swagger_1.ApiBearerAuth(),
        __param(0, common_1.Query('id', common_1.ParseIntPipe)),
        __param(1, common_1.Req())
    ], VehicleController.prototype, "deleteVehicleType");
    VehicleController = __decorate([
        common_1.UseGuards(passport_1.AuthGuard('jwt'), roles_guard_1.RolesGuard),
        common_1.Controller('vehicle')
    ], VehicleController);
    return VehicleController;
}());
exports.VehicleController = VehicleController;
