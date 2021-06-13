import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './city.entity';
import { CityService } from './city.service'
import { CityController } from './city.controller'
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([City]),
        AuthModule
    ],
    providers: [CityService],
    controllers : [CityController]
})
export class CityModule {}
