import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { FindByMciService } from './FindByMci.service';
import FakeOperationsRepository from '../repositories/fakes/FakeOperationsRepository';
import Operations from '../infra/typeorm/entities/Operations';

describe('FindOperationsByMciService', () => {
  let service: FindByMciService;
  let operationsRepository: FakeOperationsRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindByMciService,
        {
          provide: getRepositoryToken(Operations),
          useClass: FakeOperationsRepository,
        },
      ],
    }).compile();

    service = await module.resolve(FindByMciService);
    operationsRepository = await module.resolve(getRepositoryToken(Operations));
  });

  it('should return a error message from a non-existent number of mci', async () => {
    const mci = 10101010;

    const result = await service.execute(mci);

    expect(result).toHaveProperty('statusCode', 204);
  });

  it('should return the operations of a specific MCI', async () => {
    const mci = 936774715;

    const result = await service.execute(mci);

    expect(result).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
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
          mci: 936774715,
        }),
      ]),
    );
  });
});
