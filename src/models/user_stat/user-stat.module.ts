import { Module } from '@nestjs/common';
import { UserStatService } from './user-stat.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserStat } from './entities/user-stat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserStat])],
  providers: [UserStatService],
  exports: [UserStatService],
})
export class UserStatModule {}
