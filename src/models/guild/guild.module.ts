import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Guild } from './entities/guild.entity';
import { GuildService } from './guild.service';
import { UserModule } from '../user/user.module';
import { GuildController } from './guild.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Guild]), UserModule],
  controllers: [GuildController],
  providers: [GuildService],
  exports: [GuildService],
})
export class GuildModule {}
