import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, ObjectIdColumn, OneToMany, PrimaryGeneratedColumn, Unique ,ObjectID} from "typeorm";
import * as bcrypt from 'bcrypt'
import { Lesson } from "src/lesson/lesson.entity";


@Entity()
@Unique(['username'])
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
    @Column()
    username: string

    @ApiProperty({ example:1, description: 'mobile', default: "09121234567" })
    @Column()
    mobile: string

    @ApiProperty({ example:1, description: 'address', default: "Tehran, Vanak Sqr, Blk.6" })
    @Column()
    address: string

    @ApiProperty({ example:1, description: 'Username', default: "saeed" })
    @Column({default: "avatar.png"})
    avatar: string

    @ApiProperty({ example:1, description: 'Username', default: "saeed" })
    @Column()
    birthday: Date

    @ApiProperty({ example:1, description: 'Username', default: "saeed" })
    @Column()
    email: string

    @ApiProperty({ example:1, description: 'Password', default: "pasdfwer" })
    @Column()
    password: string

    @Column()
    salt: string

    @OneToMany(type => Lesson, lesson => lesson.user, {eager: true})
    lessons: Lesson[]

    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt)
        return hash === this.password
    }

}