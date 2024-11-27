import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'signup',
    description: 'Endpoint to create/signup new user',
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
  signup(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('login')
  @ApiOperation({
    summary: 'sign-in',
    description: 'Endpoint to sign-in',
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
  @ApiBody({
    description: 'User login credentials',
    type: LoginDto,
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
