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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var user_schema_1 = require("./user.schema");
var mongoose_1 = require("@nestjs/mongoose");
var bcrypt = require("bcrypt");
var AuthService = /** @class */ (function () {
    function AuthService(userModel, jwtService) {
        this.userModel = userModel;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger('AuthService');
    }
    AuthService.prototype.signUp = function (authCredentialDto) {
        return __awaiter(this, void 0, void 0, function () {
            var salt, _a, createdUser;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, bcrypt.genSalt()];
                    case 1:
                        salt = _b.sent();
                        _a = authCredentialDto;
                        return [4 /*yield*/, this.hashPassword(authCredentialDto.password, salt)];
                    case 2:
                        _a.password = _b.sent();
                        authCredentialDto['salt'] = salt;
                        console.log(authCredentialDto);
                        createdUser = new this.userModel(authCredentialDto);
                        return [4 /*yield*/, createdUser.save()];
                    case 3: return [2 /*return*/, _b.sent()];
                }
            });
        });
    };
    AuthService.prototype.hashPassword = function (password, salt) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, bcrypt.hash(password, salt)];
            });
        });
    };
    AuthService.prototype.signIn = function (signInCredDto) {
        return __awaiter(this, void 0, void 0, function () {
            var user, username, payload, accessToken, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.validateUserPassword(signInCredDto)];
                    case 1:
                        user = _a.sent();
                        if (!user.username)
                            throw new common_1.UnauthorizedException('Invalid credentials');
                        username = user.username;
                        payload = { username: username };
                        accessToken = this.jwtService.sign(payload);
                        this.logger.debug("Generated JWT Token with payload  " + JSON.stringify(payload));
                        response = {
                            success: true,
                            msg: 'LOGGED_IN_SUCCESS',
                            token: accessToken,
                            user: user
                        };
                        return [2 /*return*/, response];
                }
            });
        });
    };
    AuthService.prototype.validateUserPassword = function (signInCredDto) {
        return __awaiter(this, void 0, void 0, function () {
            var validationInput, password, srchVal, user, _a;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        validationInput = signInCredDto.validationInput, password = signInCredDto.password;
                        srchVal = this.mobileOEmailOUsername(validationInput);
                        return [4 /*yield*/, this.userModel.findOne((_b = {}, _b[srchVal] = validationInput, _b))];
                    case 1:
                        user = _c.sent();
                        _a = user;
                        if (!_a) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.validatePassword(user, password)];
                    case 2:
                        _a = (_c.sent());
                        _c.label = 3;
                    case 3:
                        if (_a) {
                            return [2 /*return*/, user];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.validatePassword = function (user, password) {
        return __awaiter(this, void 0, void 0, function () {
            var hash;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, bcrypt.hash(password, user.salt)];
                    case 1:
                        hash = _a.sent();
                        return [2 /*return*/, hash === user.password];
                }
            });
        });
    };
    AuthService.prototype.mobileOEmailOUsername = function (validationInput) {
        if (validationInput.match(/[+0]{1}[\d]{10,12}/))
            return 'mobile';
        if (validationInput.match(/[\d\w]+\@[\d\w]+\.[\w]{2,5}/))
            return 'email';
        if (validationInput.match(/[\d\w]+/))
            return 'username';
        return null;
    };
    AuthService = __decorate([
        common_1.Injectable(),
        __param(0, mongoose_1.InjectModel(user_schema_1.User.name))
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
