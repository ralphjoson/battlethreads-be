import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'Username or Email',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  identifier: string; // This field accepts either username or email

  @ApiProperty({
    description: 'password',
    type: String,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
