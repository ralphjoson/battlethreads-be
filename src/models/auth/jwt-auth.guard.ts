import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any) {
    if (info && info.name === 'TokenExpiredError') {
      throw new UnauthorizedException('TOKEN_EXPIRED');
    }

    if (info && info.name === 'JsonWebTokenError') {
      throw new UnauthorizedException('INVALID_SIGNATURE');
    }

    if (err || !user) {
      throw new UnauthorizedException('UNAUTHORIZED');
    }
    return user;
  }
}
