"use strict";
exports.__esModule = true;
exports.typeOrmConfig = void 0;
exports.typeOrmConfig = {
    type: 'mongodb',
    url: 'mongodb://localhost:27017/school',
    useUnifiedTopology: true,
    entities: [__dirname + "/../**/*.entity.js"],
    synchronize: true
};
