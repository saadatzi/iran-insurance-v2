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
exports.CityController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var passport_1 = require("@nestjs/passport");
var objectId_validation_pipe_1 = require("../pipes/objectId-validation.pipe");
// @ApiHeader({
//   name: 'Authorization',
//   description: 'Auth Token'
// })
var CityController = /** @class */ (function () {
    function CityController(cityService) {
        this.cityService = cityService;
    }
    CityController.prototype.getCities = function () {
        return this.cityService.getCities();
    };
    CityController.prototype.createCity = function (filterCityDTO, provinceId
    // @Req() req: any,
    ) {
        // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
        return this.cityService.createCity(filterCityDTO);
    };
    __decorate([
        common_1.Get(),
        swagger_1.ApiBearerAuth()
    ], CityController.prototype, "getCities");
    __decorate([
        common_1.Post(),
        swagger_1.ApiBearerAuth(),
        common_1.UsePipes(common_1.ValidationPipe),
        __param(0, common_1.Body()),
        __param(1, common_1.Body('province', objectId_validation_pipe_1.ObjectIdValidationPipe))
    ], CityController.prototype, "createCity");
    CityController = __decorate([
        common_1.UseGuards(passport_1.AuthGuard('jwt')),
        common_1.Controller('city')
    ], CityController);
    return CityController;
}());
exports.CityController = CityController;
