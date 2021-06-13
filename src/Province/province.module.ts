import { Module } from '@nestjs/common';
import { Province, ProvinceSchema } from './province.schema';
import { ProvinceService } from './province.service'
import { ProvinceController } from './province.controller'
import { AuthModule } from '../Auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature( [{ name: Province.name, schema: ProvinceSchema}]),
        AuthModule
    ],
    providers: [ProvinceService],
    controllers : [ProvinceController]
})
export class ProvinceModule {}
