import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { GuildService } from './guild.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateGuildDto } from './dto/create-guild.dto';

@ApiBearerAuth('access-token')
@ApiTags('Guild')
@Controller('guild')
export class GuildController {
  constructor(private readonly guildService: GuildService) {}

  @UseGuards(JwtAuthGuard)
  @Post('create')
  @ApiOperation({
    summary: 'Create Guild',
    description: 'Endpoint to create guild',
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
  createGuild(@Req() req, @Body() createGuildDto: CreateGuildDto) {
    return this.guildService.createGuild(req.user.userId, createGuildDto);
  }
}
