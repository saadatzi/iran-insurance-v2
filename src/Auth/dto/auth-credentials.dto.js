"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthCredentialDto = void 0;
var class_validator_1 = require("class-validator");
var swagger_1 = require("@nestjs/swagger");
var AuthCredentialDto = /** @class */ (function () {
    function AuthCredentialDto() {
    }
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MinLength(2),
        class_validator_1.MaxLength(25),
        swagger_1.ApiProperty({
            description: 'firstName',
            "default": 'saeed'
        })
    ], AuthCredentialDto.prototype, "firstName");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MinLength(4),
        class_validator_1.MaxLength(20),
        swagger_1.ApiProperty({
            description: 'lastName',
            "default": 'Deljoo'
        })
    ], AuthCredentialDto.prototype, "lastName");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MinLength(4),
        class_validator_1.MaxLength(30),
        class_validator_1.IsNotEmpty(),
        swagger_1.ApiProperty({
            description: 'username',
            "default": 'saeed123'
        })
    ], AuthCredentialDto.prototype, "username");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MinLength(10),
        class_validator_1.MaxLength(14),
        class_validator_1.IsNotEmpty(),
        swagger_1.ApiProperty({
            description: 'mobile',
            "default": '09121234567'
        })
    ], AuthCredentialDto.prototype, "mobile");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MinLength(10),
        class_validator_1.MaxLength(40),
        swagger_1.ApiProperty({
            description: 'address',
            "default": 'Vanak Sqr, Blk.6'
        })
    ], AuthCredentialDto.prototype, "address");
    __decorate([
        class_validator_1.IsString(),
        swagger_1.ApiProperty({
            description: 'avatar',
            "default": 'avatar.png'
        })
    ], AuthCredentialDto.prototype, "avatar");
    __decorate([
        class_validator_1.IsDateString(),
        swagger_1.ApiProperty({
            description: 'avatar',
            "default": '2021-02-21'
        })
    ], AuthCredentialDto.prototype, "birthday");
    __decorate([
        class_validator_1.IsEmail(),
        class_validator_1.IsNotEmpty(),
        swagger_1.ApiProperty({
            description: 'avatar',
            "default": 'saeed@gmail.com'
        })
    ], AuthCredentialDto.prototype, "email");
    __decorate([
        swagger_1.ApiProperty({
            description: 'Isfahan',
            "default": '60c5fcf47db03439e47fe76d'
        })
    ], AuthCredentialDto.prototype, "city");
    __decorate([
        class_validator_1.IsString(),
        class_validator_1.MinLength(8),
        class_validator_1.MaxLength(20),
        class_validator_1.Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, { message: 'password is too weak.' }),
        swagger_1.ApiProperty({
            description: 'password',
            "default": '1234Ert*&'
        })
    ], AuthCredentialDto.prototype, "password");
    __decorate([
        class_validator_1.IsIn(["male", "female"]),
        swagger_1.ApiProperty({
            description: 'gender',
            "default": 'male'
        })
    ], AuthCredentialDto.prototype, "sex");
    return AuthCredentialDto;
}());
exports.AuthCredentialDto = AuthCredentialDto;
