import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './Auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CityModule } from './City/city.module';
import { ProvinceModule } from './Province/province.module';
import { VehicleModule } from './Vehicle/vehicle.module';
import { BodyModule } from './Body/body.module';
import { InsuranceModule } from 'Insurance/Insurance.module';
import { MulterModule } from '@nestjs/platform-express';
import { InsTypeModule } from 'InsuranceType/InsType.module';
import { OtherModule } from 'Others/other.module';
import { NestModule, MiddlewareConsumer } from '@nestjs/common';
import { LoggerMiddleware } from './Middleware/logger.middleware';
@Module({
  imports: [
    MulterModule.register({
      dest: './files',
    }),
    MongooseModule.forRoot(
      // `mongodb://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@mongodb:27017/BimeDB?authSource=admin&readPreference=primary`,
      'mongodb://mongo:27017/BimeDB',
      {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
      },
    ),
    CityModule,
    ProvinceModule,
    VehicleModule,
    AuthModule,
    BodyModule,
    InsuranceModule,
    InsTypeModule,
    OtherModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
// export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware);
  }
}
