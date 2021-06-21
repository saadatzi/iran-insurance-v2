import { Module } from '@nestjs/common';
import { InsTypeService } from './InsType.service'
import { InsTypeController } from './InsType.controller'
import { MongooseModule } from '@nestjs/mongoose';
import { InsType, InsTypeSchema } from './InsType.schema';


@Module({
    imports: [
        MongooseModule.forFeature( [ { name: InsType.name, schema: InsTypeSchema } ]),
    ],
    providers: [InsTypeService],
    controllers : [InsTypeController]
})
export class InsTypeModule {}
