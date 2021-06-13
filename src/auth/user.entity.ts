import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, ObjectIdColumn, PrimaryGeneratedColumn, ObjectID, ManyToOne} from "typeorm";
import * as bcrypt from 'bcrypt'
import { UserRole } from "./enum/user-role.enum";
import { City } from "src/City/city.entity";

export type Sex = "male" | "female"
 
@Entity()
export class User extends BaseEntity {
    @ObjectIdColumn()
    _id: ObjectID

    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({ example:1, description: 'firstName', default: "saeed" })
    @Column()
    firstName: string

    @ApiProperty({ example:1, description: 'lastName', default: "saeed" })
    @Column()
    lastName: string

    @ApiProperty({ example:1, description: 'Username', default: "saeed89" })
    @Column({unique: true})
    username: string

    @ApiProperty({ example:1, description: 'mobile', default: "09121234567" })
    @Column()
    mobile: string

    @ApiProperty({ example:1, description: 'address', default: "Tehran, Vanak Sqr, Blk.6" })
    @Column()
    address: string

    @ApiProperty({ example:"avatar.png", description: 'avatar', default: "saeed" })
    @Column({default: "avatar.png"})
    avatar: string

    @ApiProperty({ example:"1370/05/12", description: 'birthday', default: "1370/05/12" })
    @Column()
    birthday: Date

    @ApiProperty({ example:"asd@gmail.com", description: 'email', default: "asd@gmail.com" })
    @Column({unique: true})
    email: string

    // find the enum for Api for the next time
    @ApiProperty({ example: "customer", description: 'role', default: "customer" }) 
    @Column({default: "customer"})
    role: UserRole

    @ApiProperty({ example:false, description: 'block', default: false })
    @Column({default: false})
    block: boolean

    @ApiProperty({ example:1, description: 'city', default: "Isfahan" })
    @ManyToOne(type => City, city => city.user)
    city: City

    @ApiProperty({ example:1, description: 'Password', default: "pasdfwer" })
    @Column()
    password: string

    @Column()
    salt: string

    @Column({type:"enum", enum:["male", "female"], default: "male"})
    sex: Sex

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }

}