import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BattleLog } from './entities/battle-log.entity';
import { BattleLogService } from './battle-log.service';
import { BattleModule } from '../battle/battle.module';

@Module({
  imports: [TypeOrmModule.forFeature([BattleLog]), BattleModule],
  providers: [BattleLogService],
  exports: [BattleLogService],
})
export class BattleLogModule {}
