import * as dotenv from 'dotenv';

export class ConfigService {
  private readonly envConfig: Record<string, string>;

  constructor() {
    const result = dotenv.config();
    if (result.error) {
      this.envConfig = process.env;
    } else {
      this.envConfig = result.parsed;
    }
  }

  public get(key: string): string {
    const value = this.envConfig[key];
    if (!value) {
      throw new Error(`Configuration key "${key}" is missing.`);
    }
    return value;
  }

  public async getPortConfig() {
    return this.get('PORT');
  }

  public getPostgresConfig() {
    return {
      connectionString: `postgresql://${this.get(
        'POSTGRES_USERNAME',
      )}:${this.get('POSTGRES_PASSWORD')}@${this.get(
        'POSTGRES_HOST',
      )}:${this.get('POSTGRES_PORT')}/${this.get('POSTGRES_DATABASE')}`,
    };
  }
}
