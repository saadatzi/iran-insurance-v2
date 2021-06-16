import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CityModule } from './City/city.module';
import { ProvinceModule } from './Province/province.module';
import { VehicleModule } from './Vehicle/vehicle.module';
import { BodyModule } from './Body/body.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb://localhost:27017/Insurance"),
    CityModule,
    ProvinceModule,
    VehicleModule,
    AuthModule,
    BodyModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
