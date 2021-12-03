import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { FindByCnpjService } from './FindByCnpj.service';
import FakeOperationsRepository from '../repositories/fakes/FakeOperationsRepository';
import Operations from '../infra/typeorm/entities/Operations';

describe('FindOperationsByCNPJService', () => {
  let service: FindByCnpjService;
  let operationsRepository: FakeOperationsRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindByCnpjService,
        {
          provide: getRepositoryToken(Operations),
          useClass: FakeOperationsRepository,
        },
      ],
    }).compile();

    service = await module.resolve(FindByCnpjService);
    operationsRepository = await module.resolve(getRepositoryToken(Operations));
  });

  it('should return a error message from a non-existent number of operation', async () => {
    const cnpj = 101010101010;

    const result = await service.execute(cnpj);

    expect(result).toHaveProperty('statusCode', 204);
  });

  it('should return the operations with specific Cenop', async () => {
    const cnpj = 91359711000102;

    const result = await service.execute(cnpj);

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
          cnpjCli: 91359711000102,
        }),
      ]),
    );
  });
});
