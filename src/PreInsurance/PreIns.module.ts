import { Module } from '@nestjs/common';
import { PreInsService } from './PreIns.service'
import { PreInsController } from './PreIns.controller'
import { MongooseModule } from '@nestjs/mongoose';
import { PreInsurance, PreInsuranceSchema } from './PreIns.schema';


@Module({
    imports: [
        MongooseModule.forFeature( [ { name: PreInsurance.name, schema: PreInsuranceSchema } ]),
    ],
    providers: [PreInsService],
    controllers : [PreInsController]
})
export class PreInsModule {}