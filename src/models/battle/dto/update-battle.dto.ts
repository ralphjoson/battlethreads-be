import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class UpdateBattleDto {
  @ApiProperty({
    description: 'damage',
    type: Number,
    required: true,
  })
  damage: number;

  @ApiProperty({
    description: 'user ids of the victors',
    type: [String],
    required: true,
  })
  @IsUUID('4', { each: true })
  @IsArray()
  @IsNotEmpty()
  winners: string[];
}
