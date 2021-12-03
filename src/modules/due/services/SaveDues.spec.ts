import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { uuid } from 'uuidv4';

import DUEs from '../infra/typeorm/entities/DUEs';
import FakeDuesRepository from '../repositories/fakes/FakeDuesRepository';
import { SaveDuesService } from './SaveDues.service';

describe('SaveDuesService', () => {
  let service: SaveDuesService;
  let duesRepository: FakeDuesRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaveDuesService,
        {
          provide: getRepositoryToken(DUEs),
          useClass: FakeDuesRepository,
        },
      ],
    }).compile();

    service = await module.resolve(SaveDuesService);
    duesRepository = await module.resolve(getRepositoryToken(DUEs));
  });

  it('should return a error message from a existent number of due already confirmated', async () => {
    const due: DUEs = {
      id: uuid(),
      nrDue: '1A1A1A1A',
      chaveDue: '1A1A1A1A1A',
      nrOperDue: 123456789,
      valorDue: 1000.0,
      createdAt: new Date(),
    };

    await duesRepository.saveDue(due);

    const result = await service.execute(due);

    expect(result).toHaveProperty('statusCode', 400);
  });

  it('should return ok for Due', async () => {
    const due: DUEs = {
      id: uuid(),
      nrDue: '1A1A1A1A',
      chaveDue: '1A1A1A1A1A',
      nrOperDue: 123456789,
      valorDue: 1000.0,
      createdAt: new Date(),
    };

    const result = await service.execute(due);

    expect(result).toBe(true);
  });
});
