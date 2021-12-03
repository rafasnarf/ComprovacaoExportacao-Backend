import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import CompravacaoManual from '../infra/typeorm/entities/ComprovocaoManual';
import ManualConfirmationDTO from '../dtos/ManualConfirmationDTO';
import FakeManualConfirmationRepository from '../repositories/fakes/FakeManualConfirmationsRepository';
import { FindConfirmationByNrOperService } from './FindConfirmationByNrOper.service';

describe('FindConfirmationByNrOperService', () => {
  let service: FindConfirmationByNrOperService;
  let manualConfirmationRepository: FakeManualConfirmationRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindConfirmationByNrOperService,
        {
          provide: getRepositoryToken(CompravacaoManual),
          useClass: FakeManualConfirmationRepository,
        },
      ],
    }).compile();

    service = await module.resolve(FindConfirmationByNrOperService);
    manualConfirmationRepository = await module.resolve(
      getRepositoryToken(CompravacaoManual),
    );
  });

  it('should return a error message from a non-existent number of operation', async () => {
    const nrOper = 10101010;

    const result = await service.execute(nrOper);

    expect(result).toHaveProperty('statusCode', 204);
  });

  it('should return a operantion with the specific number', async () => {
    const manualConfirmation: ManualConfirmationDTO = {
      matriculaConfirmacao: 'F1234567',
      nrOper: 12345678,
      prefDepe: 1111,
      observacoes: 'Teste',
    };

    const nrOper = 12345678;

    await manualConfirmationRepository.createConfirmation(manualConfirmation);

    const result = await service.execute(nrOper);

    expect(result).toHaveProperty('id');
    expect(result).toHaveProperty('dataConfirmacao');

    expect(result).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        nrOper: 12345678,
        prefDepe: 1111,
        dataConfirmacao: expect.any(Date),
        matriculaConfirmacao: 'F1234567',
        observacoes: 'Teste',
      }),
    );
  });
});
