"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SignInCredDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var SignInCredDto = /** @class */ (function () {
    function SignInCredDto() {
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MinLength(4),
        class_validator_1.MaxLength(30),
        swagger_1.ApiProperty({
            description: 'username, email, mobile',
            "default": 'saeed123'
        })
    ], SignInCredDto.prototype, "validationInput");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.IsNotEmpty(),
        class_validator_1.MinLength(8),
        class_validator_1.MaxLength(20),
        class_validator_1.Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password is too weak.' }),
        swagger_1.ApiProperty({
            description: 'password',
            "default": '1234Ert*&'
        })
    ], SignInCredDto.prototype, "password");
    return SignInCredDto;
}());
exports.SignInCredDto = SignInCredDto;
