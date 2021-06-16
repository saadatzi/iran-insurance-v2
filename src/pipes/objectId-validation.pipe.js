"use strict";
exports.__esModule = true;
exports.ObjectIdValidationPipe = void 0;
var common_1 = require("@nestjs/common");
var mongoose_1 = require("mongoose");
var ObjectIdValidationPipe = /** @class */ (function () {
    function ObjectIdValidationPipe() {
    }
    ObjectIdValidationPipe.prototype.transform = function (value) {
        if (!this.IsObjectIdValid(value)) {
            throw new common_1.BadRequestException(" " + value + " is not an valid object id. ");
        }
        return value;
    };
    ObjectIdValidationPipe.prototype.IsObjectIdValid = function (ObjId) {
        return mongoose_1.Types.ObjectId.isValid(ObjId);
    };
    return ObjectIdValidationPipe;
}());
exports.ObjectIdValidationPipe = ObjectIdValidationPipe;
