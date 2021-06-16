// import { Injectable } from "@nestjs/common";
// import { FilterVehicleModelDTO } from "../dto/filter-VehicleModel.dto";
// import { Model } from "mongoose";
// import { InjectModel } from "@nestjs/mongoose";
// import { VehicleType } from "../Schemas/vehicleType.schema";
// import { FilterVehicleTypeDTO } from "../dto/filter-VehicleType.dto";
// import { VehicleModel } from "../Schemas/vehicleModel.schema";
// import { VehicleBrand } from "../Schemas/vehicleBrand.schema";
// import { VehiclePrice } from "../Schemas/vehiclePrice.schema";
// import { VehicleUnit } from "../Schemas/vehicleUnit.schema";
// import { VehicleDetail } from "../Schemas/vehicleDetail.schema";
// @Injectable()
// export class VehicleService {
//     constructor(
//         @InjectModel(VehicleModel.name) 
//         @InjectModel(VehicleType.name) 
//         @InjectModel(VehiclePrice.name) 
//         @InjectModel(VehicleUnit.name) 
//         @InjectModel(VehicleBrand.name) 
//         @InjectModel(VehicleDetail.name) 
//         private VehicleModel: Model<VehicleModel>,
//         private VehicleType: Model<VehicleType>,
//         // private VehicleBrand: Model<VehicleBrand>,
//         // private VehiclePrice: Model<VehiclePrice>,
//         // private VehicleUnit: Model<VehicleUnit>,
//         // private VehiclDetail: Model<VehicleDetail>,
//     ){}
//     async getVehiclesModel(): Promise<VehicleModel[]> {
//             return await this.VehicleModel.find()
//     }
//     async getVehicleModel(id: string): Promise<VehicleModel> {
//             return await this.VehicleModel.findById(id)
//     }
//     async createVehicleModel(filterVehicleModelDTO: FilterVehicleModelDTO): Promise<VehicleModel>{
//         // const {name, province, areaCode} = filterProvinceDTO
//         const vehicleModel = new this.VehicleModel(filterVehicleModelDTO)
//         try {
//             return await vehicleModel.save()
//         }catch(err) {
//             console.log(err)
//         }
//     }
//     async updateVehicleModel(id: string, filterVehicleModelDTO: FilterVehicleModelDTO, user:object): Promise<VehicleModel>{
//         const vehicleModel = await this.VehicleModel.findById(id)
//         Object.assign(vehicleModel, filterVehicleModelDTO)
//         try {
//             return await vehicleModel.save()
//         }catch(err) {
//             console.log(err)
//         }
//     }
//     async deleteVehicleModel(id: string, user:object): Promise<VehicleModel>{
//         try {
//             return await this.VehicleModel.findByIdAndDelete(id)
//         }catch(err) {
//             console.log(err)
//         }
//     }
//       // ............................ vehicle type ...................//
//     async getVehiclesType(): Promise<VehicleType[]> {
//         return await this.VehicleType.find()
//     }
//     async getVehicleType(id: string): Promise<VehicleType> {
//         return await this.VehicleType.findById(id)
//     }
//     async createVehicleType(filterVehicleTypeDTO: FilterVehicleTypeDTO): Promise<VehicleType>{
//         // const {name, province, areaCode} = filterProvinceDTO
//         const vehicleType = new this.VehicleType(filterVehicleTypeDTO)
//         try {
//             return await vehicleType.save()
//         }catch(err) {
//             console.log(err)
//         }
//     }
//     async updateVehicleType(id: string, filterVehicleTypeDTO: FilterVehicleTypeDTO, user:object): Promise<VehicleType>{
//         const vehicleType = await this.VehicleType.findById(id)
//         Object.assign(vehicleType, filterVehicleTypeDTO)
//         try {
//             return await vehicleType.save()
//         }catch(err) {
//             console.log(err)
//         }
//     }
//     async deleteVehicleType(id: string, user:object): Promise<VehicleType>{
//         try {
//             return await this.VehicleType.findByIdAndDelete(id)
//         }catch(err) {
//             console.log(err)
//         }
//     }
// }
