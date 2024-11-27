import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateBattleDto {
  @ApiProperty({
    description: 'attacker',
    type: [String],
    required: true,
  })
  @IsUUID('4', { each: true })
  @IsArray()
  @IsNotEmpty()
  attackers: string[];

  @ApiProperty({
    description: 'defender',
    type: String,
    required: true,
  })
  @IsUUID('4')
  @IsNotEmpty()
  defender_id: string;
}
