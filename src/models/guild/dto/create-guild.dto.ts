import { ApiProperty } from '@nestjs/swagger';

export class CreateGuildDto {
  @ApiProperty({
    description: 'Guild name',
    type: String,
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'Guild description',
    type: String,
    required: true,
  })
  description?: string;
}
