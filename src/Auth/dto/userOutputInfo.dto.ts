import { ApiProperty } from '@nestjs/swagger';

export class UserOutputDtoInfo {
    // constructor(firstName , lastName , mobile ,address , avatar , birthday , email ,city , sex ){
    //     this.firstName = firstna
    // }
  @ApiProperty({
    description: 'firstName',
    default: 'saeed',
  })
  firstName: string;

  @ApiProperty({
    description: 'lastName',
    default: 'Deljoo',
  })
  lastName: string;

  @ApiProperty({
    description: 'username',
    default: 'saeed123',
  })
  username: string;

  @ApiProperty({
    description: 'mobile',
    default: '09121234567',
  })
  mobile: string;

  @ApiProperty({
    description: 'address',
    default: 'Vanak Sqr, Blk.6',
  })
  address: string;

  @ApiProperty({
    description: 'avatar',
    default: 'avatar.png',
  })
  avatar: string;

  @ApiProperty({
    description: 'avatar',
    default: '2021-02-21',
  })
  birthday: Date;

  @ApiProperty({
    description: 'avatar',
    default: 'saeed@gmail.com',
  })
  email: string;

  @ApiProperty({
    description: 'Isfahan',
    default: '60c5fcf47db03439e47fe76d',
  })
  city: string;

  @ApiProperty({
    description: 'gender',
    default: 'male or female',
  })
  sex: string;
}
