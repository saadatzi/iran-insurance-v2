import { User } from "src/auth/user.entity";
import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, ObjectIdColumn, PrimaryColumn ,ManyToOne} from "typeorm";

@Entity()
export class Lesson {
    @ObjectIdColumn()
    _id: string
    
    @PrimaryColumn()
    id: string

    @ApiProperty({ example:1, description: 'The name of the lesson' })
    @Column()
    name: string
    
    @ApiProperty({ example:'2021-02-13', description: 'Date of start' })
    @Column()
    startDate: string

    @ApiProperty({ example:'2021-02-13', description: 'Date of finish' })
    @Column()
    endDate: string

    // @ManyToOne(type => User, user => user.lessons, {eager: false})
    // user: User
    
}