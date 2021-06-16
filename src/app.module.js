"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var auth_module_1 = require("./Auth/auth.module");
var mongoose_1 = require("@nestjs/mongoose");
var city_module_1 = require("./City/city.module");
var province_module_1 = require("./Province/province.module");
var vehicle_module_1 = require("./Vehicle/vehicle.module");
// import { APP_GUARD } from '@nestjs/core';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        common_1.Module({
            imports: [
                mongoose_1.MongooseModule.forRoot("mongodb://localhost:27017/Insurance"),
                city_module_1.CityModule,
                province_module_1.ProvinceModule,
                vehicle_module_1.VehicleModule,
                auth_module_1.AuthModule
            ],
            controllers: [app_controller_1.AppController],
            providers: [
                app_service_1.AppService,
                // {
                //   provide: APP_GUARD,
                //   useClass: RolesGuard
                // }
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
