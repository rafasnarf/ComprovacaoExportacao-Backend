import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { uuid } from 'uuidv4';

import DUEs from '../infra/typeorm/entities/DUEs';
import DueDTO from '../dtos/DueDTO';
import FakeDuesRepository from '../repositories/fakes/FakeDuesRepository';
import { RemoveDueService } from './RemoveDues.service';

describe('RemoveDueService', () => {
  let service: RemoveDueService;
  let duesRepository: FakeDuesRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RemoveDueService,
        {
          provide: getRepositoryToken(DUEs),
          useClass: FakeDuesRepository,
        },
      ],
    }).compile();

    service = await module.resolve(RemoveDueService);
    duesRepository = await module.resolve(getRepositoryToken(DUEs));
  });

  it('should return a positive confirmation of removal', async () => {
    const due: DUEs = {
      id: uuid(),
      nrDue: '1A1A1A1A',
      chaveDue: '1A1A1A1A1A',
      nrOperDue: 123456789,
      valorDue: 1000.0,
      createdAt: new Date(),
    };

    const idDue = due.id;

    await duesRepository.saveDue(due);

    const deletedDue = await service.execute(idDue);

    expect(deletedDue).toBe(true);
  });

  it('should return a false value for a error of removal Due', async () => {
    const due: DUEs = {
      id: uuid(),
      nrDue: '1A1A1A1A',
      chaveDue: '1A1A1A1A1A',
      nrOperDue: 123456789,
      valorDue: 1000.0,
      createdAt: new Date(),
    };
    await duesRepository.saveDue(due);
    const wrongID = uuid();
    const deletedDue = await service.execute(wrongID);

    expect(deletedDue).toBe(false);
  });
});
