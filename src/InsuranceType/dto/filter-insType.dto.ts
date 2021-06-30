import {
  IsDate,
  IsObject,
  isString,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';

export class FilterInsTypeDTO {
  @IsString()
  @ApiProperty({
    description: 'name of the insurance type',
    default: 'آتش سوزی',
  })
  name?: string;
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  image_url: string;
}
