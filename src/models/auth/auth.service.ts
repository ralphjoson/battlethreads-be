import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user/entity/user/user';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { UserStatService } from '../user_stat/user-stat.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly userService: UserService,
    private readonly userStatService: UserStatService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(createAuthDto: CreateAuthDto): Promise<User> {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();
    try {
      const hashPassword = await bcrypt.hash(createAuthDto.password, 10);
      createAuthDto.password = hashPassword;

      const userExist = await this.userService.checkIfUserExist(
        createAuthDto.username,
        createAuthDto.email,
      );

      if (userExist) {
        throw new HttpException(
          'Username or email already exist',
          HttpStatus.CONFLICT,
        );
      }

      const result = await queryRunner.manager.save(User, createAuthDto);

      if (result) {
        await this.userStatService.generateDefaultUserStats(
          result.id,
          queryRunner,
        );
        const qrCode = await this.userService.generateQrCode(result.id);
        result.qr_code = qrCode;

        await queryRunner.manager.update(
          User,
          { id: result.id },
          { qr_code: qrCode },
        );
      }
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async login(loginDto: LoginDto) {
    try {
      const { identifier, password } = loginDto;
      const user = await this.userService.getUserByUsernameOrEmail(identifier);
      if (!user) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const accessToken = this.jwtService.sign({ userId: user.id });

      const refreshToken = this.jwtService.sign(
        { userId: user.id },
        {
          secret: this.configService.get('JWT_REFRESH_SECRET'),
          expiresIn: '60d',
        },
      );

      return { accessToken, refreshToken };
    } catch (error) {
      throw error;
    }
  }
}
