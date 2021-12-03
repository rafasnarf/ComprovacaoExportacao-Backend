import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { FindByCenopService } from './FindByCenop.service';
import FakeOperationsRepository from '../repositories/fakes/FakeOperationsRepository';
import Operations from '../infra/typeorm/entities/Operations';

describe('FindOperationsByCenopService', () => {
  let service: FindByCenopService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindByCenopService,
        {
          provide: getRepositoryToken(Operations),
          useClass: FakeOperationsRepository,
        },
      ],
    }).compile();

    service = await module.resolve(FindByCenopService);
  });

  it('should return a error message from a non-existent number of operation', async () => {
    const cenop = 1000;

    const result = await service.execute(cenop);

    expect(result).toHaveProperty('statusCode', 204);
  });

  it('should return the operations with specific Cenop', async () => {
    const cenop = 1968;

    const result = await service.execute(cenop);

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
          cenop: 1968,
        }),
      ]),
    );
  });
});
