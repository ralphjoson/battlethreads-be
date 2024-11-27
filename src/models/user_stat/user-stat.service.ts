import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserStat } from './entities/user-stat.entity';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class UserStatService {
  constructor(
    @InjectRepository(UserStat)
    private readonly userStatRepository: Repository<UserStat>,
  ) {}

  async getUserStats(userId: string): Promise<UserStat | null> {
    try {
      const userStats = await this.userStatRepository.findOneBy({
        user_id: userId,
      });

      if (userStats) {
        userStats.critical_chance = parseFloat(
          userStats.critical_chance.toString(),
        );
        userStats.critical_damage_modifier = parseFloat(
          userStats.critical_damage_modifier.toString(),
        );
        userStats.dodge_chance = parseFloat(userStats.dodge_chance.toString());
      }

      return userStats;
    } catch (error) {
      throw error;
    }
  }

  async generateDefaultUserStats(userId: string, queryRunner: QueryRunner) {
    try {
      const userStat = queryRunner.manager.create(UserStat, {
        user_id: userId,
      });
      return await queryRunner.manager.save(UserStat, userStat);
    } catch (error) {
      throw error;
    }
  }
}
