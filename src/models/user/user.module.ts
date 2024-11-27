import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user/user';
import { NgrokService } from 'src/providers/ngrok.service';
import { UserStatService } from '../user_stat/user-stat.service';
import { UserStat } from '../user_stat/entities/user-stat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UserStat])],
  controllers: [UserController],
  providers: [UserService, NgrokService, UserStatService],
  exports: [UserService],
})
export class UserModule {}
