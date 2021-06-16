"use strict";
exports.__esModule = true;
exports.Roles = void 0;
var common_1 = require("@nestjs/common");
/**
 * Allow only specified roles to access a specific route
 * @param roles
 * @constructor
 */
var Roles = function () {
    var roles = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        roles[_i] = arguments[_i];
    }
    return common_1.SetMetadata('roles', roles);
};
exports.Roles = Roles;
