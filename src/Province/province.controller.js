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
exports.ProvinceController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var passport_1 = require("@nestjs/passport");
// @ApiHeader({
//   name: 'Authorization',
//   description: 'Auth Token'
// })
var ProvinceController = /** @class */ (function () {
    function ProvinceController(provinceService) {
        this.provinceService = provinceService;
    }
    ProvinceController.prototype.getProvinces = function () {
        return this.provinceService.getProvinces();
    };
    ProvinceController.prototype.createProvince = function (filterProvinceDTO) {
        // this.logger.verbose(`User ${req.user.username} creating a task. Data: ${JSON.stringify(FilterLessonDTO)}`)
        return this.provinceService.createProvince(filterProvinceDTO);
    };
    __decorate([
        common_1.Get(),
        swagger_1.ApiBearerAuth()
    ], ProvinceController.prototype, "getProvinces");
    __decorate([
        common_1.Post(),
        swagger_1.ApiBearerAuth(),
        common_1.UsePipes(common_1.ValidationPipe),
        __param(0, common_1.Body())
    ], ProvinceController.prototype, "createProvince");
    ProvinceController = __decorate([
        common_1.UseGuards(passport_1.AuthGuard('jwt')),
        common_1.Controller('province')
    ], ProvinceController);
    return ProvinceController;
}());
exports.ProvinceController = ProvinceController;
