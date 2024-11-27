import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BattleLog } from './entities/battle-log.entity';
import { Repository } from 'typeorm';
import { BattleService } from '../battle/battle.service';

@Injectable()
export class BattleLogService {
  constructor(
    @InjectRepository(BattleLog)
    private readonly battleLogRepository: Repository<BattleLog>,
    @Inject(forwardRef(() => BattleService))
    private readonly battleService: BattleService,
  ) {}

  async createBattleLog(battleId: string, winners: string[], queryRunner) {
    try {
      const battle = await this.battleService.getBattle(battleId);
      if (!battle) {
        throw new HttpException('BATTLE_NOT_FOUND', HttpStatus.NOT_FOUND);
      }

      const battleLog = queryRunner.manager.create(BattleLog, {
        battle_id: battleId,
        winners,
      });
      return await queryRunner.manager.save(BattleLog, battleLog);
      return battleLog;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
