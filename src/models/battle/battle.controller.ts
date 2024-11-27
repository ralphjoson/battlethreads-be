import {
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BattleService } from './battle.service';
import { CreateBattleDto } from './dto/create-battle.dto';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateBattleDto } from './dto/update-battle.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth('access-token')
@ApiTags('Battle')
@Controller('battle')
export class BattleController {
  constructor(private readonly battleService: BattleService) {}

  @UseGuards(JwtAuthGuard)
  @Post('start')
  @ApiOperation({
    summary: 'Start Attack',
    description: 'Endpoint to start attack/battle',
  })
  @ApiResponse({
    status: 200,
    description: 'success',
  })
  @ApiResponse({
    status: 503,
    description: 'Server Error',
    type: InternalServerErrorException,
  })
  startBattle(@Body() createBattleDto: CreateBattleDto) {
    return this.battleService.startBattle(createBattleDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':battleId/end')
  @ApiOperation({
    summary: 'End Attack',
    description: 'Endpoint to end attack/battle',
  })
  @ApiResponse({
    status: 200,
    description: 'success',
  })
  @ApiResponse({
    status: 503,
    description: 'Server Error',
    type: InternalServerErrorException,
  })
  @ApiParam({ name: 'battleId', type: String, required: true })
  endBattle(
    @Param('battleId') battleId: string,
    @Body() updateBattleDto: UpdateBattleDto,
  ) {
    return this.battleService.endBattle(battleId, updateBattleDto);
  }
}
