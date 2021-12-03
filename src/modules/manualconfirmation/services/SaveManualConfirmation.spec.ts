import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import CompravacaoManual from '../infra/typeorm/entities/ComprovocaoManual';
import ManualConfirmationDTO from '../dtos/ManualConfirmationDTO';
import FakeManualConfirmationRepository from '../repositories/fakes/FakeManualConfirmationsRepository';
import { SaveManualConfirmationService } from './SaveManualConfirmation.service';

describe('FindOperationsByCenopService', () => {
  let service: SaveManualConfirmationService;
  let manualConfirmationRepository: FakeManualConfirmationRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SaveManualConfirmationService,
        {
          provide: getRepositoryToken(CompravacaoManual),
          useClass: FakeManualConfirmationRepository,
        },
      ],
    }).compile();

    service = await module.resolve(SaveManualConfirmationService);
    manualConfirmationRepository = await module.resolve(
      getRepositoryToken(CompravacaoManual),
    );
  });

  it('should return a error message from a existent number of operation already confirmated', async () => {
    const manualConfirmation: ManualConfirmationDTO = {
      matriculaConfirmacao: 'F8365846',
      nrOper: 12345678,
      prefDepe: 4011,
      observacoes: 'Teste',
    };

    await manualConfirmationRepository.createConfirmation(manualConfirmation);

    const result = await service.execute(manualConfirmation);

    expect(result).toHaveProperty('statusCode', 208);
  });

  it('should return the confirmation', async () => {
    const manualConfirmation: ManualConfirmationDTO = {
      matriculaConfirmacao: 'F1234567',
      nrOper: 12345678,
      prefDepe: 1111,
      observacoes: 'Teste',
    };

    const result = await service.execute(manualConfirmation);

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
