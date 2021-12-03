import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { FindByDateService } from './FindByDate.service';
// import OperationsRepository from '../infra/typeorm/repositories/OperationsRepository';
import FakeOperationsRepository from '../repositories/fakes/FakeOperationsRepository';
import Operations from '../infra/typeorm/entities/Operations';

describe('FindOperationsByDateService', () => {
  let service: FindByDateService;
  let operationsRepository: FakeOperationsRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindByDateService,
        {
          provide: getRepositoryToken(Operations),
          useClass: FakeOperationsRepository,
        },
      ],
    }).compile();

    service = await module.resolve(FindByDateService);
    operationsRepository = await module.resolve(getRepositoryToken(Operations));
  });

  it('should return a error message from a non-existent number of operation', async () => {
    const data = {
      startDate: '2000-04-01',
      finalDate: '2000-04-31',
    };

    const result = await service.execute(data);

    expect(result).toHaveProperty('statusCode', 204);
  });

  it('should return the operations with specific date', async () => {
    const data = {
      startDate: '2021-04-01',
      finalDate: '2021-04-31',
    };

    const result = await service.execute(data);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          mci: expect.any(Number),
          nomeCli: expect.any(String),
          cnpjCli: expect.any(Number),
          nrOper: expect.any(Number),
          prefDepe: expect.any(Number),
          cenop: expect.any(Number),
          vlrOper: expect.any(Number),
          dtFormalizacao: expect.any(String),
          dtFinal: expect.any(String),
          situacao: expect.any(String),
        }),
      ]),
    );

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          dtFormalizacao: expect.stringContaining('2021-04'),
        }),
      ]),
    );
  });
});
