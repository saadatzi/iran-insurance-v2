import { Module } from '@nestjs/common';
import { FactorService } from './Factor.service'
import { FactorController } from './Factor.controller'
import { MongooseModule } from '@nestjs/mongoose';
import { Factor, FactorSchema } from './Factor.schema';
import { InsuranceModule } from 'Insurance/Insurance.module';
import { AuthModule } from 'Auth/auth.module';


@Module({
    imports: [
        MongooseModule.forFeature( [ { name: Factor.name, schema: FactorSchema } ]),
        InsuranceModule,
        AuthModule
    ],
    providers: [FactorService],
    controllers : [FactorController]
})
export class PreInsModule {}