// const DoctorLiabilityDiscount = require("../models/DoctorsLiability/DoctorsLiabilityDiscount")

import { Injectable } from "@nestjs/common"

@Injectable()
export class ThirdPartyService {

        getDaysBetweenTwoDates(startDate: number, endDate: number) {
            const diffInMs = new Date(endDate).valueOf() - new Date(startDate).valueOf()
            return Math.round(diffInMs / (1000 * 60 * 60 * 24)) - 1
        }

        /****************************************************************
        *****************************************************************
        *****************************************************************
        *****************************************************************
        ****************************************************************/
        /************************ Third Party **************************/
        // New Car Calculation
        async thirdPartyNewCarCalculator(data: any) {
            const thisData = {
                basePrices: data.basePrices,
                thisValidityDurations: data.validityDurations,

                driverDamagePrice: data.driverDamagePrice,

                damageDiscountPercentage: data.damageDiscountPercentage,
                driverDiscountPercentage: data.driverDiscountPercentage,

                dailyDamagePrice: data.dailyDamagePrice,

                tempAge: data.currentDate.getFullYear() - data.builtYear,
                carAge: 0,
                carAgePercent: 0,

                releaseDate: data.releaseDate,
                currentDate: data.currentDate,
                penaltyDays: 0,
            }

            let thisPrice = 0
            let thisDPrice = 0
            let thisAmount = 0
            let finalPrices = []
            let thisValidityPrices = []

            thisData.basePrices.forEach((base) => {
                thisAmount = base.amount
                thisData.thisValidityDurations.forEach((thisValidity) => {
                    thisPrice = base.basePrice
                    thisDPrice = thisData.driverDamagePrice

                    // Two Main Prices
                    thisPrice *= (thisValidity.percent / 100)
                    thisDPrice *= (thisValidity.percent / 100)

                    // Check for Car Age
                    if (thisData.tempAge > 15) {
                        thisData.carAge = thisData.tempAge - 15;
                        if (thisData.carAge >= 10) {
                            thisData.carAge = 10;
                        }
                    }

                    // Car Age Calculation on Price
                    thisData.carAgePercent = (thisData.carAge * 2) / 100
                    const carAgeBasePriceDamageAmount = thisPrice * thisData.carAgePercent
                    const carAgeAndDriverDamageAmount = thisDPrice * thisData.carAgePercent
                    thisPrice += carAgeBasePriceDamageAmount
                    thisDPrice += carAgeAndDriverDamageAmount
                    const thisCarDamageDiscountAmount = Math.round(thisPrice * (thisData.damageDiscountPercentage / 100))
                    const thisCarDriverDamageDiscountAmount = Math.round(thisDPrice * (thisData.driverDiscountPercentage / 100))
                    const thisBasePrice = Math.round(thisPrice - thisCarDamageDiscountAmount)
                    const thisDriverPrice = Math.round(thisDPrice - thisCarDriverDamageDiscountAmount)

                    thisData.penaltyDays = this.getDaysBetweenTwoDates(thisData.releaseDate, new Date().valueOf())
                    if (thisData.penaltyDays > 365) thisData.penaltyDays = 365
                    if (thisData.penaltyDays < 0) thisData.penaltyDays = 0
                    const dailyPenaltyAmount = Math.round(thisPrice / 365)
                    const thisPenaltyPrice = Math.round(thisData.penaltyDays * dailyPenaltyAmount)

                    let finalPrice = thisBasePrice + thisDriverPrice
                    finalPrice += finalPrice * .09 + thisPenaltyPrice

                    let tempObj : any = {
                        validityDuration: thisValidity.month,
                        validityPercentage: thisValidity.percent,
                        validityPrice: Math.round(finalPrice)
                    }

                    thisValidityPrices.push(tempObj)
                    tempObj ={}
                    thisPrice = 0
                    // End of Second For
                })
                finalPrices.push({ amount: thisAmount, thisValidity: thisValidityPrices })
                thisValidityPrices = []
                thisAmount = 0
                // End  of First For
            })
            return finalPrices
        }

        // Has Insurance Calculation
        async thirdPartyHasInsuranceCalculator(data) {

            const thisData = {
                basePrices: data.basePrices,
                thisValidityDurations: data.validityDurations,

                driverDamagePrice: data.driverDamagePrice,
                dailyDamagePrice: data.dailyDamagePrice,

                damageDiscountPercentage: data.damageDiscountPercentage,
                driverDiscountPercentage: data.driverDiscountPercentage,

                tempAge: data.currentDate.getFullYear() - data.builtYear,
                carAge: 0,
                carAgePercent: 0,

                currentDate: data.currentDate,
                penaltyDays: 0,

                // اطلاعات تکمیلی در مورد بیمه نامه قبلی
                previousInsuranceStartDate: data.previousInsuranceStartDate,
                previousInsuranceEndDate: data.previousInsuranceEndDate,

                // این اطلاعات تنها موقعی اعمال می شود که خسارت قبلی دریافت شده
                hasDamageReceived: data.hasDamageReceived,
                propertyDamageBasePercent: 20,
                propertyDamageCount: data.propertyDamageCount || 0,
                casualtyDamageBasePercent: 30,
                casualtyDamageCount: data.casualtyDamageCount || 0,
                driverAccidentDamageBasePercent: 30,
                driverAccidentDamageCount: data.driverAccidentDamageCount || 0,
            }

            let thisPrice = 0
            let thisDPrice = 0
            let thisAmount = 0
            let finalPrices = []
            let thisValidityPrices = []

            thisData.basePrices.forEach((base) => {
                thisAmount = base.amount
                thisData.thisValidityDurations.forEach((thisValidity) => {
                    thisPrice = base.basePrice
                    thisDPrice = thisData.driverDamagePrice

                    // Two Main Prices
                    thisPrice *= (thisValidity.percent / 100)
                    thisDPrice *= (thisValidity.percent / 100)

                    // Check for Car Age
                    if (thisData.tempAge > 15) {
                        thisData.carAge = thisData.tempAge - 15;
                        if (thisData.carAge >= 10) {
                            thisData.carAge = 10;
                        }
                    }

                    // Car Age Calculation on Price
                    thisData.carAgePercent = (thisData.carAge * 2) / 100
                    const carAgeBasePriceDamageAmount = thisPrice * thisData.carAgePercent
                    const carAgeAndDriverDamageAmount = thisDPrice * thisData.carAgePercent
                    thisPrice += carAgeBasePriceDamageAmount
                    thisDPrice += carAgeAndDriverDamageAmount

                    if (thisData.damageDiscountPercentage > 70) thisData.damageDiscountPercentage = 70
                    if (thisData.driverDiscountPercentage > 70) thisData.driverDiscountPercentage = 70

                    // الان می رویم سراغ دریافت خسارت
                    if (thisData.hasDamageReceived === true) {
                        // اعمال تعداد خسارت دریافت شده مالی بر روی تخفیف
                        if (thisData.propertyDamageCount === 1) thisData.damageDiscountPercentage -= thisData.propertyDamageBasePercent
                        if (thisData.propertyDamageCount === 2) thisData.damageDiscountPercentage -= (thisData.propertyDamageBasePercent + 10)
                        if (thisData.propertyDamageCount >= 3) thisData.damageDiscountPercentage -= (thisData.propertyDamageBasePercent + 20)

                        // اعمال تعداد خسارت دریافت شده جانی بر روی تخفیف
                        if (thisData.casualtyDamageCount === 1) thisData.damageDiscountPercentage -= thisData.casualtyDamageBasePercent
                        if (thisData.casualtyDamageCount === 2) thisData.damageDiscountPercentage -= (thisData.casualtyDamageBasePercent + 40)
                        if (thisData.casualtyDamageCount >= 3) thisData.damageDiscountPercentage -= (thisData.casualtyDamageBasePercent + 70)

                        // اعمال تعداد خسارت دریافت شده حوادث بر روی تخفیف
                        if (thisData.driverAccidentDamageCount === 1) thisData.driverDiscountPercentage -= thisData.driverAccidentDamageBasePercent
                        if (thisData.driverAccidentDamageCount === 2) thisData.driverDiscountPercentage -= (thisData.driverAccidentDamageBasePercent + 40)
                        if (thisData.driverAccidentDamageCount >= 3) thisData.driverDiscountPercentage -= (thisData.driverAccidentDamageBasePercent + 70)
                    }

                    const thisCarDamageDiscountAmount = Math.round(thisPrice * (thisData.damageDiscountPercentage / 100))
                    const thisCarDriverDamageDiscountAmount = Math.round(thisDPrice * (thisData.driverDiscountPercentage / 100))
                    const thisBasePrice = Math.round(thisPrice - thisCarDamageDiscountAmount)
                    const thisDriverPrice = Math.round(thisDPrice - thisCarDriverDamageDiscountAmount)

                    thisData.penaltyDays = this.getDaysBetweenTwoDates(thisData.previousInsuranceEndDate, new Date().valueOf())
                    if (thisData.penaltyDays > 365) thisData.penaltyDays = 365
                    if (thisData.penaltyDays < 0) thisData.penaltyDays = 0

                    // ========================================= مقدار عوض شود ==> عوض شد
                    const dailyPenaltyAmount = Math.round(thisPrice / 365)
                    const thisPenaltyPrice = Math.round(thisData.penaltyDays * dailyPenaltyAmount)

                    let finalPrice = thisBasePrice + thisDriverPrice
                    finalPrice += finalPrice * .09 + thisPenaltyPrice

                    let tempObj: any = {
                        validityDuration: thisValidity.month,
                        validityPercentage: thisValidity.percent,
                        validityPrice: Math.round(finalPrice)
                    }

                    thisValidityPrices.push(tempObj)
                    tempObj = {}
                    thisPrice = 0
                    // End of Second For
                })
                finalPrices.push({ amount: thisAmount, thisValidity: thisValidityPrices })
                thisValidityPrices = []
                thisAmount = 0
                // End  of First For
            })
            return finalPrices
        }

        // No Insurance Calculation
        async thirdPartyNoInsuranceCalculator(data:any) {
            const thisData = {
                basePrices: data.basePrices,
                thisValidityDurations: data.validityDurations,

                driverDamagePrice: data.driverDamagePrice,

                tempAge: data.currentDate.getFullYear() - data.builtYear,
                carAge: 0,
                carAgePercent: 0,

                penaltyDays: 0
            }

            let thisPrice = 0
            let thisDPrice = 0
            let thisAmount = 0
            let finalPrices = []
            let thisValidityPrices = []

            thisData.basePrices.forEach((base) => {
                thisAmount = base.amount
                thisData.thisValidityDurations.forEach((thisValidity) => {
                    thisPrice = base.basePrice
                    thisDPrice = thisData.driverDamagePrice

                    // Two Main Prices
                    thisPrice *= (thisValidity.percent / 100)
                    thisDPrice *= (thisValidity.percent / 100)

                    // Check for Car Age
                    if (thisData.tempAge > 15) {
                        thisData.carAge = thisData.tempAge - 15;
                        if (thisData.carAge >= 10) {
                            thisData.carAge = 10;
                        }
                    }

                    // Car Age Calculation on Price
                    thisData.carAgePercent = (thisData.carAge * 2) / 100
                    const carAgeBasePriceDamageAmount = thisPrice * thisData.carAgePercent
                    const carAgeAndDriverDamageAmount = thisDPrice * thisData.carAgePercent
                    thisPrice += carAgeBasePriceDamageAmount
                    thisDPrice += carAgeAndDriverDamageAmount

                    thisData.penaltyDays = 365
                    const dailyPenaltyAmount = Math.round(thisPrice / 365)
                    const thisPenaltyPrice = Math.round(thisData.penaltyDays * dailyPenaltyAmount)

                    let finalPrice = thisPrice + thisDPrice
                    finalPrice += finalPrice * .09 + thisPenaltyPrice

                    let tempObj : any= {
                        validityDuration: thisValidity.month,
                        validityPercentage: thisValidity.percent,
                        validityPrice: Math.round(finalPrice)
                    }

                    thisValidityPrices.push(tempObj)
                    tempObj = {}
                    thisPrice = 0
                    // End of Second For
                })
                finalPrices.push({ amount: thisAmount, thisValidity: thisValidityPrices })
                thisValidityPrices = []
                thisAmount = 0
                // End  of First For
            })
            return finalPrices
        }

        /****************************************************************
        *****************************************************************
        *****************************************************************
        *****************************************************************
        *****************************************************************
        **************************** Body ******************************/
        // async bodyCalculator(data) {
        //     const currentDiscounts = data.currentDiscounts
        //     const thisData = {
        //         basePrice: data.carPrice,
        //         nonFabricAccessoriesPrice: data.nonFabricAccessoriesPrice,
        //         carInforamtion: data.thisCarInformation,
        //         clauses: data.clauses,
        //         discounts: data.discounts,
        //         isCarNew: data.isCarNew,
        //         isCarImported: data.isCarImported,
        //         isDangerousMaterialCarrier: data.isDangerousMaterialCarrier,
        //         isOutOfTownTraffic: data.isOutOfTownTraffic,
        //         builtYear: data.builtYear,
        //         hasBodyInsurance: data.hasBodyInsurance,
        //         noRecivedDamageYear: data.noRecivedDamageYear,
        //         damageDiscountPercentage: data.damageDiscountPercentage || 0,
        //         previousInsurer: data.previousInsurer || null,
        //         previousInsuranceEndDate: data.previousInsuranceEndDate || null,
        //         // driverDamagePrice: data.driverDamagePrice,

        //         tempAge: data.currentDate.getFullYear() - data.builtYear,
        //         carAge: 0,
        //         carAgePercent: 0
        //     }

        //     const thisCarInforamtion = thisData.carInforamtion
        //     console.log(thisCarInforamtion)
        //     const thisCarPrice = thisData.basePrice
        //     console.log('thisCarPrice', thisCarPrice)
        //     console.log('================================================')

        //     const thisAccessoriesPrice = thisData.nonFabricAccessoriesPrice
        //     console.log('thisAccessoriesPrice', thisAccessoriesPrice)
        //     console.log('================================================')

        //     let thisPrice = thisCarPrice + thisAccessoriesPrice
        //     console.log('thisPrice', thisPrice)
        //     console.log('================================================')

        //     // اعمال تخفیف نوع خودروی سواری
        //     // thisPrice -= (thisPrice * .30)

        //     /******************************* NEW BEGIN PROPERTIES ****************************/
        //     // دوتا متغیر داریم 
        //     // درصد ۵۵ تخفیف => X
        //     // ۱.۵۹۵۴ نمیدانم چیه => Y
        //     // این دوتا x و y هستن ؟
        //     // فعلا مبنا بر این میگیریم
        //     // پس فرمول پایین برای ماشین های زیر ۱۰۰ میلیون انگار
        //     // پس کراد میزنیم برای اضافه کردن زیر
        //     // یک. قیمت ماشین دو.مقدار ایکس سه. مقدار وای


        //     const thisRangePrice = await VehiclePrice.findOne({ max: { $lte: thisPrice }, min: { $gte: thisPrice } })
        //     thisPrice = (thisPrice * thisRangePrice.x) / 100
        //     thisPrice *= thisRangePrice.y

        //     // let moreThan100MDiscountAmount = 0
        //     // if (thisCarPrice >= 1000000000) {
        //     //     // بعدا بندازش تو اونجایی که دیتا های اولیه رو وارد میکنی
        //     //     // اعمال تخفیف 100 میلیون به بالا
        //     //     console.log('More')
        //     //     moreThan100MDiscountAmount = thisCarPrice * (10 / 100)
        //     // }

        //     console.log('moreThan100MDiscountAmount', moreThan100MDiscountAmount)

        //     thisPrice -= moreThan100MDiscountAmount

        //     if (thisData.tempAge > 15) {
        //         thisData.carAge = thisData.tempAge - 15;
        //         if (thisData.carAge >= 10) {
        //             thisData.carAge = 10;
        //         }
        //     }

        //     if (thisData.hasBodyInsurance) {
        //         if (thisData.noRecivedDamageYears === 1) thisPrice -= thisPrice * .30
        //         if (thisData.noRecivedDamageYears === 2) thisPrice -= thisPrice * .40
        //         if (thisData.noRecivedDamageYears === 3) thisPrice -= thisPrice * .50
        //         if (thisData.noRecivedDamageYears === 4) thisPrice -= thisPrice * .60
        //         if (thisData.noRecivedDamageYears === 5) thisPrice -= thisPrice * .70
        //     }

        //     // Clauses Calculation
        //     thisData.clauses.forEach((clause) => {
        //         console.log('thisClause', clause)
        //         // اعمال پوشش های اضافه
        //         // قبلا نسبت به اکتیو بودن پوشش ها به متغیر پاس داده شدن
        //         thisPrice += thisPrice * (clause.percent / 100)

        //     })

        //     // Discounts Calculation
        //     // پیدا کردن تخفیف های تعریفی 
        //     thisData.discounts.forEach((discount) => {
        //         console.log('thisDiscount', discount)
        //         // اعمال تخفیفات تعریفی
        //         thisPrice -= thisPrice * (discount.pcercent / 100)
        //     })

        //     if (thisData.isCashPayment) {
        //         // تخفیف پرداخت نقدی
        //         thisPrice -= thisPrice * (10 / 100)
        //     }

        //     if (thisData.isCarNew) {
        //         // تخفیف ماشین صفر کیلومتر
        //         thisPrice -= thisPrice * (20 / 100)
        //     }

        //     if (thisData.isDangerousMaterialCarrier) {
        //         // اعمال درصد این مورد
        //         const dangerousMaterialCarrierPercent = thisCarInforamtion.detail.dangerousMaterialCarrierPercent
        //         thisPrice += thisPrice * (dangerousMaterialCarrierPercent / 100)
        //     }

        //     if (thisData.isOutOfTownTraffic) {
        //         // اعمال درصد این مورد
        //         const outOfTownTrafficPercent = thisCarInforamtion.detail.outOfTownTrafficPercent
        //         thisPrice += thisPrice * (outOfTownTrafficPercent / 100)
        //     }

        //     thisPrice += (thisPrice * .09)
        //     return thisPrice
        // },

        // /****************************************************************
        // *****************************************************************
        // *****************************************************************
        // *****************************************************************
        // *****************************************************************
        // **************************** Fire ******************************/

        // async fireCalculator(data) {
        //     const thisData = {
        //         propertyType: data.propertyType,
        //         structureType: data.structureType,
        //         propertyAge: Number(data.propertyAge),
        //         propertyArea: Number(data.propertyArea),
        //         suppliesValue: Number(data.suppliesValue),
        //         isNonIndustrial: data.isNonIndustrial,
        //         isIndustrial: data.isIndustrial,
        //         machineryValue: Number(data.machineryValue),
        //         isResidental: data.isResidental,
        //         constructionCostPerMeter: Number(data.constructionCostPerMeter),
        //         clauses: data.clauses,
        //         discounts: data.discounts,
        //         // آیا پرداخت نقدی است؟
        //         isCashPayment: data.isCashPayment
        //     }

        //     // ارزش ساختمان = هزینه ساخت هر متر * مساحت
        //     let basePrice = thisData.constructionCostPerMeter * thisData.propertyArea

        //     // به علاوه ارزش لاوازم ساختمان
        //     basePrice += thisData.suppliesValue


        //     if (thisData.isIndustrial) {
        //         basePrice += thisData.machineryValue
        //     }


        //     // گزینه خاصی برای این پیدا نکردم
        //     // if (thisData.isNonIndustrial) {
        //     //     basePrice += thisData.machineryValue
        //     // }

        //     // Clauses Calculation
        //     thisData.clauses.forEach((clause) => {
        //         console.log('thisClause', clause)
        //         // اعمال پوشش های اضافه
        //         // قبلا نسبت به اکتیو بودن پوشش ها به متغیر پاس داده شدن
        //         basePrice += basePrice * (clause.percent / 100)

        //     })

        //     // Discounts Calculation
        //     // پیدا کردن تخفیف های تعریفی 
        //     thisData.discounts.forEach((discount) => {
        //         console.log('thisDiscount', discount)
        //         // اعمال تخفیفات تعریفی
        //         basePrice -= basePrice * (discount.pcercent / 100)
        //     })


        //     if (thisData.isCashPayment) {
        //         // تخفیف پرداخت نقدی
        //         basePrice -= basePrice * (10 / 100)
        //     }

        //     return basePrice
        // },

        // /****************************************************************
        // *****************************************************************
        // *****************************************************************
        // *****************************************************************
        // *****************************************************************
        // ********************** Doctor Liability ************************/
        // async doctorLiability(data) {
        //     try {
        //         const thisData = {
        //             doctorType: data.doctorType,
        //             doctorSpeciality: data.doctorSpeciality,
        //             clauses: data.clauses,
        //             discounts: data.discounts,
        //             noDamageDiscountYears: data.noDamageDiscountYears,
        //             isCashPayment: data.isCashPayment
        //         }

        //         let finalPrice = thisData.doctorSpeciality.basePrice

        //         // Clauses Calculation
        //         thisData.clauses.forEach((clause) => {
        //             console.log('thisClause', clause)
        //             // اعمال پوشش های اضافه
        //             // قبلا نسبت به اکتیو بودن پوشش ها به متغیر پاس داده شدن
        //             finalPrice += finalPrice * (clause.percent / 100)

        //         })

        //         // Discounts Calculation
        //         // پیدا کردن تخفیف های تعریفی 
        //         thisData.discounts.forEach((discount) => {
        //             console.log('thisDiscount', discount)
        //             // اعمال تخفیفات تعریفی
        //             finalPrice -= finalPrice * (discount.pcercent / 100)
        //         })

        //         if (thisData.noDamageDiscountYears > 0) {
        //             // finalPrice * (virtualData.yearPer / 100)
        //             // Math.round(discounts.yearDiscountAmount / 1000) * 1000
        //             let discountAmount = 0
        //             if (thisData.noDamageDiscountYears === 1) discountAmount = 10
        //             if (thisData.noDamageDiscountYears === 2) discountAmount = 20
        //             if (thisData.noDamageDiscountYears === 3) discountAmount = 30
        //             if (thisData.noDamageDiscountYears >= 4) discountAmount = 70
        //             finalPrice -= Math.round((finalPrice * (discountAmount / 100)) / 1000) * 1000
        //         }

        //         if (thisData.isCashPayment === true) {
        //             const discountAmount = 10
        //             finalPrice -= Math.round((finalPrice * (discountAmount / 100)) / 1000) * 1000
        //         }

        //         finalPrice += finalPrice * 0.09

        //     } catch (error) { res.status(500).send({ error: `An error has Accured ${error}` }) }
        // }
    }