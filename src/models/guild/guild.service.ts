import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Guild } from './entities/guild.entity';
import { Repository } from 'typeorm';
import { CreateGuildDto } from './dto/create-guild.dto';
import { UserService } from '../user/user.service';

@Injectable()
export class GuildService {
  constructor(
    @InjectRepository(Guild)
    private readonly guildRepository: Repository<Guild>,
    private readonly userService: UserService,
  ) {}

  async createGuild(userId: string, createGuildDto: CreateGuildDto) {
    try {
      const guildDto = {
        ...createGuildDto,
        owner_id: userId,
      };
      const guild = await this.guildRepository.save(guildDto);
      return guild;
    } catch (error) {
      throw error;
    }
  }

  async getGuildInfo(guildId: string) {
    try {
      const guild = await this.guildRepository.findOneBy({ id: guildId });
      if (!guild) {
        throw new HttpException('GUILD_NOT_FOUND', HttpStatus.NOT_FOUND);
      }
      const guildOwner = await this.userService.getUser(guild.owner_id);
      return {
        ...guild,
        owner: guildOwner,
      };
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
