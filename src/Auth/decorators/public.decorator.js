"use strict";
exports.__esModule = true;
exports.Public = void 0;
var common_1 = require("@nestjs/common");
/**
 * Allow everyone to access a route
 * @constructor
 */
var Public = function () { return common_1.SetMetadata('public', true); };
exports.Public = Public;
