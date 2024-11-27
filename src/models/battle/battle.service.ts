import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Battle, BattleStatus } from './entities/battle.entity';
import { Repository } from 'typeorm';
import { CreateBattleDto } from './dto/create-battle.dto';
import { UpdateBattleDto } from './dto/update-battle.dto';
import { BattleLogService } from '../battle_log/battle-log.service';

@Injectable()
export class BattleService {
  constructor(
    @InjectRepository(Battle)
    private readonly battleRepository: Repository<Battle>,
    private readonly battleLogService: BattleLogService,
  ) {}

  async getBattle(battleId: string) {
    try {
      const battle = await this.battleRepository.findOneBy({ id: battleId });
      return battle;
    } catch (error) {
      throw error;
    }
  }

  async startBattle(createBattleDto: CreateBattleDto) {
    try {
      const attackers = createBattleDto.attackers;
      const existingBattle = await this.battleRepository
        .createQueryBuilder('battle')
        .where('battle.attackers && :attackers', { attackers })
        .andWhere('battle.status = :status', { status: 'IN-PROGRESS' })
        .getOne();

      if (existingBattle) {
        throw new HttpException('EXISTING_BATTLE', HttpStatus.CONFLICT);
      }

      const battle = await this.battleRepository.save(createBattleDto);
      return battle;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async endBattle(battleId: string, updateBattleDto: UpdateBattleDto) {
    const queryRunner =
      this.battleRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const battle = await this.battleRepository.findOneBy({
        id: battleId,
        status: BattleStatus.IN_PROGRESS,
      });
      if (!battle) {
        throw new HttpException('BATTLE_NOT_FOUND', HttpStatus.NOT_FOUND);
      }
      const battleDto = {
        damage: updateBattleDto.damage,
        status: BattleStatus.COMPLETED,
      };
      const updatedBattle = await queryRunner.manager.save(Battle, battleDto);

      await this.battleLogService.createBattleLog(
        battleId,
        updateBattleDto.winners,
        queryRunner,
      );

      await queryRunner.commitTransaction();
      return updatedBattle;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error(error);
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
