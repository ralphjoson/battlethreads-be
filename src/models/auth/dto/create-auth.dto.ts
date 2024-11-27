import { ApiProperty } from '@nestjs/swagger';

export class CreateAuthDto {
  @ApiProperty({
    description: 'username',
    type: String,
    required: true,
  })
  username: string;

  @ApiProperty({
    description: 'email',
    type: String,
    required: true,
  })
  email: string;

  @ApiProperty({
    description: 'username',
    type: String,
    required: true,
  })
  password: string;
}
