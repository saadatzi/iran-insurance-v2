import { Module } from '@nestjs/common';
import { ThirdPartyService } from './insuranceCalculator.service'

@Module({
    // imports: [
    //     VehiclePriceService
    // ]
    providers: [ThirdPartyService],
    exports: [ThirdPartyService],
})

export class ThirdPartyModule {}
