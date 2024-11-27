import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './models/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from './config/config.service';
import { AuthModule } from './models/auth/auth.module';
import { ConfigModule } from './config/config.module';
import { UserStatModule } from './models/user_stat/user-stat.module';
import { BattleModule } from './models/battle/battle.module';
import { GuildModule } from './models/guild/guild.module';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.getPostgresConfig().connectionString,
        autoLoadEntities: true,
        synchronize: true,
      }),
    }),
    AuthModule,
    UserModule,
    UserStatModule,
    BattleModule,
    GuildModule,
  ],
  controllers: [AppController],
  providers: [AppService, ConfigService],
})
export class AppModule {}
