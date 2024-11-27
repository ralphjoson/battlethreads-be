import {
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserStatService } from '../user_stat/user-stat.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth('access-token')
@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userStatService: UserStatService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get('my-info')
  @ApiOperation({
    summary: 'Get my user info',
    description: 'Endpoint to fetch my user info',
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
  myUserInfo(@Req() req) {
    return this.userService.getUser(req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({
    summary: 'Get user info',
    description: 'Endpoint to fetch user info',
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
  @ApiParam({ name: 'id', required: true, type: String })
  getUserById(@Param('id') userId: string) {
    return this.userService.getUser(userId);
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id/stats')
  @ApiOperation({
    summary: 'Get user stats',
    description: 'Endpoint to fetch user stats',
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
  @ApiParam({ name: 'id', required: true, type: String })
  getUserStats(@Param('id') userId: string) {
    return this.userStatService.getUserStats(userId);
  }
}
