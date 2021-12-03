import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { uuid } from 'uuidv4';

import DUEs from '../infra/typeorm/entities/DUEs';
import FakeDuesRepository from '../repositories/fakes/FakeDuesRepository';
import { FindDueByNrDueService } from './FindDueByNrDue.service';

describe('FindDueByNrDueService', () => {
  let service: FindDueByNrDueService;
  let duesRepository: FakeDuesRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindDueByNrDueService,
        {
          provide: getRepositoryToken(DUEs),
          useClass: FakeDuesRepository,
        },
      ],
    }).compile();

    service = await module.resolve(FindDueByNrDueService);
    duesRepository = await module.resolve(getRepositoryToken(DUEs));
  });

  it('should return a due with the specific NrDue', async () => {
    const due: DUEs = {
      id: uuid(),
      nrDue: '1A1A1A1A',
      chaveDue: '1A1A1A1A1A',
      nrOperDue: 123456789,
      valorDue: 1000.0,
      createdAt: new Date(),
    };

    const nrDue = '1A1A1A1A';

    await duesRepository.saveDue(due);

    const foundedDue = await service.execute(nrDue);

    expect(foundedDue).toHaveProperty('nrDue', nrDue);
  });

  it('should return a undefined', async () => {
    const due: DUEs = {
      id: uuid(),
      nrDue: '1A1A1A1A',
      chaveDue: '1A1A1A1A1A',
      nrOperDue: 123456789,
      valorDue: 1000.0,
      createdAt: new Date(),
    };
    await duesRepository.saveDue(due);

    const wrongDue = '2A2A2A2A';

    const notFouded = await service.execute(wrongDue);

    expect(notFouded).toBe(undefined);
  });
});
