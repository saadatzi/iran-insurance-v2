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
exports.AuthController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var AuthController = /** @class */ (function () {
    function AuthController(authService) {
        this.authService = authService;
    }
    AuthController.prototype.signUp = function (authCredentialDto) {
        return this.authService.signUp(authCredentialDto);
    };
    AuthController.prototype.signIn = function (signInCredDto) {
        return this.authService.signIn(signInCredDto);
    };
    __decorate([
        swagger_1.ApiTags('sign Up'),
        swagger_1.ApiOperation({ summary: 'Remember to use capital and lower letter and sign' }),
        common_1.Post('/signup'),
        __param(0, common_1.Body(common_1.ValidationPipe))
    ], AuthController.prototype, "signUp");
    __decorate([
        swagger_1.ApiTags('sign In')
        // @ApiBody({"username": "saeed", "password": "asldfjwe"})
        ,
        common_1.Post('/signin'),
        __param(0, common_1.Body(common_1.ValidationPipe))
    ], AuthController.prototype, "signIn");
    AuthController = __decorate([
        common_1.Controller('auth')
    ], AuthController);
    return AuthController;
}());
exports.AuthController = AuthController;
