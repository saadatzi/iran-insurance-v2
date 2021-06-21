import { BadRequestException, Injectable } from "@nestjs/common";
import { ThirdPartyService } from '../tools/insuranceCalculator.service'
import { FilterInsuranceDTO } from "./dto/filter-insurance.dto";
import { VehicleModel } from "./../Vehicle/Schemas/vehicleModel.schema";
import { VehicleBrand } from "./../Vehicle/Schemas/vehicleBrand.schema";
import { VehicleType } from "./../Vehicle/Schemas/vehicleType.schema";
import { VehicleDetail } from "./../Vehicle/Schemas/vehicleDetail.schema";
import { VehicleUnit } from "./../Vehicle/Schemas/vehicleUnit.schema";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class InsuranceService {

    constructor(
        @InjectModel(VehicleModel.name)
        private VehicleModel: Model<VehicleModel>,
        @InjectModel(VehicleBrand.name)
        private VehicleBrand: Model<VehicleBrand>,
        @InjectModel(VehicleDetail.name)
        private VehicleDetail: Model<VehicleDetail>,
        @InjectModel(VehicleUnit.name)
        private VehicleUnit: Model<VehicleUnit>,
        @InjectModel(VehicleType.name)
        private VehicleType: Model<VehicleType>,
        private IC : ThirdPartyService

    ){}

    async thirdParty(filterInsuranceDTO: FilterInsuranceDTO, isPreview: boolean): Promise<JSON[]> {
        
        /*
            حتما از دلجو بپرس این قیمتی که برای جریمه دیر کرد چجوری تعیین میشه
        */

        /*
            مراحل ریفاکتور:
            1. تا اونجایی که میشه مراحل پاس دادن دیتا داخل شرط باشن تا از الکی دیتا این ور اون ور نشه
            2. فعلا فانکشن هارو جدا میکنیم تا به مرحله پاسخ دهی برسن. بعدش این فانکشن ها رو اگر شد یکی میکنیم
             مشخصا توی این حالت یکم بهم ریختگی دیده خواهد شد ولی خب فعلا مهم نیست
            3. ظاهرا خیلی از دیتا با هم مشترکن پس این گزینه هم باشه که دیتا های مشترک یه بار مقدار دهی بشن
            4. خیلی از فانکشنا و دیتا ها مشترکن اینم درست کن (یکیشون کن)
            */
            try {
                // توی این آبجکت براساس سناریو های مختلف، نوع عملیات هارو مشخص میکنیم.
                // مثلا اگر ماشین جدید بود این فانکشن اجرا شه
                // یا اگه صرفا قیمت های پیش نمایش رو میخواد و یا میخواد بخره
                const OP = {
                    isPreview: isPreview,
                    hasInsurance: filterInsuranceDTO.hasInsurance || false,
                    isNewCar: filterInsuranceDTO.isNewCar || false
                }
    
    
                // مدل ماشین رو میگیرم برای در آوردن اطلاعات کلیش 
                const carModel = filterInsuranceDTO.carModel
                // اینجا کل اطلاعات قیمتیش رو میکشیم بیرون
                const thisCarInformation = await this.VehicleModel.findOne({ _id: carModel }).select('-createdAt -updatedAt -__v -_id')
                    .populate({ path: 'brand', model: this.VehicleBrand, select: { '__v': 0, 'types': 0, 'createdAt': 0, 'updatedAt': 0, '_id': 0 } })
                    .populate({ path: 'type', model: this.VehicleType, select: { '__v': 0, 'types': 0, 'createdAt': 0, 'updatedAt': 0, '_id': 0 } })
                    .populate({ path: 'detail', model: this.VehicleDetail, select: { '__v': 0, 'types': 0, 'createdAt': 0, 'updatedAt': 0, '_id': 0 }, populate: { path: 'anotherTypeUnit', model: this.VehicleUnit, select: { '__v': 0, 'types': 0, 'createdAt': 0, 'updatedAt': 0, '_id': 0 } } })
                    .exec()
    
                // برای پرفورمنس بهتر دیتایی های که برای محاسبه نیاز هست فقط و فقط نسبت به نوع ماشین نگه میداریم
                // نگه داری اطلاعاتی که در یک سناریو دیگر لازم است و نه در سناریوی جاری به شدت پرهیز شود. الله اکبر
                let prices = []
                if (OP.isNewCar === true && OP.hasInsurance === false) {
                    // توی این آبجکت کل اطلاعات خام مورد نیاز بیمه نامه رو نگه میداریم.
                    const newCarData = {
                        // تاریخ جاری
                        currentDate: new Date(),
                        // قیمت های پایه براساس سطح تعهدات مالی
                        basePrices: thisCarInformation.detail.financialOblications,
                        // مدت اعتبار بیمه نامه ها
                        validityDurations: thisCarInformation.detail.validityDuration,
                        // قیمت خسارت راننده (همون عددی که همزمان با قیمت خسارت راننده تغییر میکنه)
                        driverDamagePrice: thisCarInformation.detail.driverDamagePrice,
                        // میزان خسارت روزانه
                        dailyDamagePrice: thisCarInformation.detail.dailyDamagePrice,
                        // درصد تخفیف ثالث // ظاهرا پیش فرض باید 5 درصد در نظر بگیریم
                        damageDiscountPercentage: 5,
                        // درصد تخفیف راننده // دقیقا مثل تخفیف ثالث
                        driverDiscountPercentage: 5,
                        // تاریخ ترخیص خودرو // ظاهرا فقط توی سناریو ماشین جدید کاربرد داره
                        releaseDate: filterInsuranceDTO.releaseDate || '2021-02-20',
                        // سال ساخت خودرو - برای محاسبه سن خودرو
                        builtYear: filterInsuranceDTO.builtYear || '2004'
                    }
                    prices = await this.IC.thirdPartyNewCarCalculator(newCarData)
                }
    
    
                // No Previous Insurance Case
                if (OP.isNewCar === false && OP.hasInsurance === false) {
                    const noInsuranceData = {
                        // قیمت های پایه براساس سطح تعهدات مالی
                        basePrices: thisCarInformation.detail.financialOblications,
                        // مدت اعتبار بیمه نامه ها
                        validityDurations: thisCarInformation.detail.validityDuration,
                        // قیمت خسارت راننده (همون عددی که همزمان با قیمت خسارت راننده تغییر میکنه)
                        driverDamagePrice: thisCarInformation.detail.driverDamagePrice,
                        // سال ساخت خودرو - برای محاسبه سن خودرو
                        builtYear: filterInsuranceDTO.builtYear || '1992',
                        currentDate: new Date().valueOf()
    
                    }
                    prices = await this.IC.thirdPartyNoInsuranceCalculator(noInsuranceData)
    
                }
    
                // Has Previous Insurance Case
                if (OP.hasInsurance === true && OP.isNewCar === false) {
                    // این حالتیه که قبلا بیمه نامه داشته
                    // با این متغیر مشخص میکنیم که آیا قبلا خسارت گرفته یا نه چون نسبت به دریافت خسارت نرخ دهی تغییر میکنه
                    const hasDamageReceived = filterInsuranceDTO.hasDamageReceived || false
                    // اطلاعات اصلی
                    const hasInsuranceData = {
                        // تاریخ جاری
                        currentDate: new Date(),
                        // همون متغیر برای تشخیص اینکه خسارت دریافت کرده یا نه
                        hasDamageReceived: hasDamageReceived,
                        // قیمت های پایه براساس سطح تعهدات مالی
                        basePrices: thisCarInformation.detail.financialOblications,
                        // مدت اعتبار بیمه نامه ها
                        validityDurations: thisCarInformation.detail.validityDuration,
                        // درصد تخفیف ثالث // ظاهرا پیش فرض باید 5 درصد بیشتر در نظر بگیریم                    
                        damageDiscountPercentage: filterInsuranceDTO.damageDiscountPercentage + 5 || 5,
                        // درصد تخفیف راننده // دقیقا مثل تخفیف ثالث
                        driverDiscountPercentage: filterInsuranceDTO.driverDiscountPercentage + 5 || 5,
                        // سال ساخت خودرو - برای محاسبه سن خودرو
                        builtYear: filterInsuranceDTO.builtYear || '2004',
                        // قیمت خسارت راننده (همون عددی که همزمان با قیمت خسارت راننده تغییر میکنه)
                        driverDamagePrice: thisCarInformation.detail.driverDamagePrice,
                        // میزان خسارت روزانه
                        dailyDamagePrice: thisCarInformation.detail.dailyDamagePrice,
                        // بیمه کننده قبلی
                        previousInsurer: filterInsuranceDTO.previousInsurer,
                        // تاریخ شروع بیمه نامه قبلی
                        previousInsuranceStartDate: filterInsuranceDTO.previousInsuranceStartDate,
                        // تاریخ اتمام بیمه نامه قبلی
                        previousInsuranceEndDate: filterInsuranceDTO.previousInsuranceEndDate,
                        // شماره بیمه نامه قبلی - این اختیاریه
                        previousInsuranceNumber: filterInsuranceDTO.previousInsuranceNumber || null,
    
                    }
                    // چک میکنیم که آیا خسارت گرفته قبلا یا نه 
                    if (hasDamageReceived === true) {
                        // تعداد دفعات دریافت خسارت مالی
                        hasInsuranceData['propertyDamageCount'] = filterInsuranceDTO.propertyDamageCount
                        // تعداد ذفعات دریافت خسار جانی
                        hasInsuranceData['casualtyDamageCount'] = filterInsuranceDTO.casualtyDamageCount
                        // تعداد دفعات دریافت خسارت حوادث راننده
                        hasInsuranceData['driverAccidentDamageCount'] = filterInsuranceDTO.driverAccidentDamageCount
                    }
                    prices = await this.IC.thirdPartyHasInsuranceCalculator(hasInsuranceData)
                }
    
    
                return prices
            } catch (error) { throw new BadRequestException('prices in insurance service') }

    }
}