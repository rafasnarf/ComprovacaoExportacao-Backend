import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { FindByNrOperService } from './FindByNrOper.service';
import FakeOperationsRepository from '../repositories/fakes/FakeOperationsRepository';
import Operations from '../infra/typeorm/entities/Operations';

describe('FindOperationsByNrOperService', () => {
  let service: FindByNrOperService;
  let operationsRepository: FakeOperationsRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindByNrOperService,
        {
          provide: getRepositoryToken(Operations),
          useClass: FakeOperationsRepository,
        },
      ],
    }).compile();

    service = await module.resolve(FindByNrOperService);
    operationsRepository = await module.resolve(getRepositoryToken(Operations));
  });

  it('should return a operation with specific number of operation', async () => {
    const operacao = 4000425;

    const result = await service.execute(operacao);

    expect(result).toEqual({
      mci: 900096080,
      nomeCli: 'COPLANA - COOPERATIVA AGROINDUSTRIAL',
      cnpjCli: 48662175000190,
      nrOper: 4000425,
      prefDepe: 1916,
      cenop: 4748,
      vlrOper: 40000000,
      dtFormalizacao: '2019-05-09',
      dtFinal: '2020-05-03',
      situacao: 'VENCIDA',
    });

    expect(result).toHaveProperty('nrOper', 4000425);
  });

  it('should return a error message from a non-existent number of operation', async () => {
    const operacao = 100000;

    const result = await service.execute(operacao);

    expect(result).toHaveProperty('statusCode', 204);
  });
});
