import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/auth/user.entity";
import { Province } from "src/Province/province.entity";
import { Column, Entity, ObjectIdColumn, PrimaryColumn, OneToOne, ObjectID, OneToMany, ManyToOne, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class City {
    @ObjectIdColumn()
    _id: ObjectID

    @PrimaryGeneratedColumn()
    id: number
    
    @ApiProperty({ example:1, description: 'The name of the lesson' })
    @Column()
    name: string
    
    @ApiProperty({ example:'Khorasan', description: 'Name of the province' })
    @ManyToOne(type => Province, province => province.city)
    province: Province
    
    @ApiProperty()
    @OneToMany(type => User, user => user.city)
    user: User[]

    @ApiProperty({ example:'0313', description: 'Area code of city' })
    @Column()
    areaCode: string

}