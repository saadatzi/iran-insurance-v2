"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VehicleModelSchema = exports.VehicleModel = void 0;
var mongoose_1 = require("@nestjs/mongoose");
var mongoose = require("mongoose");
var VehicleModel = /** @class */ (function () {
    function VehicleModel() {
    }
    __decorate([
        mongoose_1.Prop({ unique: true, required: true })
    ], VehicleModel.prototype, "name");
    __decorate([
        mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'VehicleBrand' })
    ], VehicleModel.prototype, "brand");
    __decorate([
        mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'VehicleType' })
    ], VehicleModel.prototype, "type");
    __decorate([
        mongoose_1.Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'VehicleDetail' })
    ], VehicleModel.prototype, "detail");
    VehicleModel = __decorate([
        mongoose_1.Schema()
    ], VehicleModel);
    return VehicleModel;
}());
exports.VehicleModel = VehicleModel;
exports.VehicleModelSchema = mongoose_1.SchemaFactory.createForClass(VehicleModel);
