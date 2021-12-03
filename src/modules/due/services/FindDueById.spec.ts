import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { uuid } from 'uuidv4';

import DUEs from '../infra/typeorm/entities/DUEs';
import FakeDuesRepository from '../repositories/fakes/FakeDuesRepository';
import { FindDueByIdService } from './FindDueById.service';

describe('FindDueByIdService', () => {
  let service: FindDueByIdService;
  let duesRepository: FakeDuesRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindDueByIdService,
        {
          provide: getRepositoryToken(DUEs),
          useClass: FakeDuesRepository,
        },
      ],
    }).compile();

    service = await module.resolve(FindDueByIdService);
    duesRepository = await module.resolve(getRepositoryToken(DUEs));
  });

  it('should return a due with the specific ID', async () => {
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

    const foundedDue = await duesRepository.findDueByID(idDue);

    expect(foundedDue).toHaveProperty('id', idDue);
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

    const wrongID = uuid();

    const notFouded = await duesRepository.findDueByID(wrongID);

    expect(notFouded).toBe(undefined);
  });
});
