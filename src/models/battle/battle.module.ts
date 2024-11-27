import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Battle } from './entities/battle.entity';
import { BattleService } from './battle.service';
import { BattleController } from './battle.controller';
import { BattleLog } from '../battle_log/entities/battle-log.entity';
import { BattleLogService } from '../battle_log/battle-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([Battle, BattleLog])],
  controllers: [BattleController],
  providers: [BattleService, BattleLogService],
  exports: [BattleService],
})
export class BattleModule {}
