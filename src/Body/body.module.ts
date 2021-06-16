import { Module } from '@nestjs/common';
import { AuthModule } from '../Auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BodyDiscount, BodyDiscountSchema } from './Schemas/bodyDiscount.schema';
import { BodyClause, BodyClauseSchema } from './Schemas/bodyClause.schema';
import { BodyController } from './body.controller';
import { BodyClauseService } from './Services/body-Clause.service';
import { BodyDiscountService } from './Services/body-Discount.service';

@Module({
    imports: [
        MongooseModule.forFeature( [
            { 
                name: BodyClause.name,
                schema: BodyClauseSchema,
            },
            {
                name: BodyDiscount.name,
                schema: BodyDiscountSchema
            }
        ]),
        AuthModule
    ],
    providers: [BodyDiscountService, BodyClauseService],
    controllers : [BodyController]
})
export class BodyModule {}
