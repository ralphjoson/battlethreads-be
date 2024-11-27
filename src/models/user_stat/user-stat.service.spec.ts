import { Test, TestingModule } from '@nestjs/testing';
import { UserStatService } from './user-stat.service';

describe('UserStatService', () => {
  let service: UserStatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserStatService],
    }).compile();

    service = module.get<UserStatService>(UserStatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
