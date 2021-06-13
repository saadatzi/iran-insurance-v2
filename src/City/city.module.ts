import { Module } from '@nestjs/common';
import { City, CitySchema } from './city.schema';
import { CityService } from './city.service'
import { CityController } from './city.controller'
import { AuthModule } from '../Auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forFeature( [{ name: City.name, schema: CitySchema}]),
        AuthModule
    ],
    providers: [CityService],
    controllers : [CityController]
})
export class CityModule {}
