import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user/user';
import { Repository } from 'typeorm';
import { ConfigService } from 'src/config/config.service';
import * as QRCode from 'qrcode';
import * as path from 'path';
import * as fs from 'fs';
import { NgrokService } from 'src/providers/ngrok.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
    private readonly ngrokService: NgrokService,
  ) {}

  async getUser(userId: string): Promise<User | null> {
    try {
      const result = await this.userRepository.findOneBy({ id: userId });
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUserByUsernameOrEmail(identifier: string) {
    try {
      const user = await this.userRepository
        .createQueryBuilder('user')
        .where('user.username = :identifier OR user.email = :identifier', {
          identifier,
        })
        .getOne();

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async generateQrCode(userId: string): Promise<string> {
    try {
      // temporary code
      let data: string = '';
      if (this.configService.get('ENVIRONMENT') == 'local') {
        const ngrokUrl = this.ngrokService.getNgrokUrl();
        data = `${ngrokUrl}/api/v1/users/${userId}/stats`;
      } else {
        data = `${this.configService.get('SERVER_URL')}/api/v1/users/${userId}/stats`;
      }

      const directory = path.join(process.cwd(), 'qrcodes');
      if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory);
      }

      const filePath = path.join(directory, `${userId}-qrcode.png`);
      await QRCode.toFile(filePath, data);

      const relativePath = path.relative(process.cwd(), filePath);
      return relativePath;
    } catch (error) {
      throw error;
    }
  }

  async checkIfUserExist(username: string, email: string): Promise<boolean> {
    try {
      const userExist = await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email OR user.username = :username', {
          email: email,
          username: username,
        })
        .getOne();

      return !!userExist;
    } catch (error) {
      throw error;
    }
  }
}
