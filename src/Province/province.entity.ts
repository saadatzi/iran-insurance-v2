import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ObjectIdColumn, ObjectID, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import { City } from "src/City/city.entity";

@Entity()
export class Province {
    @ObjectIdColumn()
    _id: ObjectID

    @PrimaryGeneratedColumn()
    id: number
    
    @ApiProperty({ example:1, description: 'The name of the lesson' })
    @Column()
    name: string
    
    @ApiProperty({ example:'2021-02-13', description: 'Date of start' })
    @OneToMany(type => City, city => city.province)
    city: City[]

}