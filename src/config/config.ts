import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions ={
    type: 'mongodb',
    url: 'mongodb://localhost:27017/school',
    useUnifiedTopology: true,
    entities: [__dirname + "/../**/*.entity.js"],
    synchronize: true
}