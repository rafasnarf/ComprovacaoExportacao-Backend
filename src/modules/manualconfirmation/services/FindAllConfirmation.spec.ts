import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import CompravacaoManual from '../infra/typeorm/entities/ComprovocaoManual';
import ManualConfirmationDTO from '../dtos/ManualConfirmationDTO';
import FakeManualConfirmationRepository from '../repositories/fakes/FakeManualConfirmationsRepository';
import { FindAllService } from './FindAllConfirmation.service';

describe('FindConfirmationByNrOperService', () => {
  let service: FindAllService;
  let manualConfirmationRepository: FakeManualConfirmationRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FindAllService,
        {
          provide: getRepositoryToken(CompravacaoManual),
          useClass: FakeManualConfirmationRepository,
        },
      ],
    }).compile();

    service = await module.resolve(FindAllService);
    manualConfirmationRepository = await module.resolve(
      getRepositoryToken(CompravacaoManual),
    );
  });

  it('should return a correct amount of confirmations', async () => {
    const manualConfirmation1: ManualConfirmationDTO = {
      matriculaConfirmacao: 'F1234567',
      nrOper: 12345678,
      prefDepe: 1111,
      observacoes: 'Teste',
    };

    const manualConfirmation2: ManualConfirmationDTO = {
      matriculaConfirmacao: 'F1234567',
      nrOper: 12345677,
      prefDepe: 1112,
      observacoes: 'Teste',
    };

    const manualConfirmation3: ManualConfirmationDTO = {
      matriculaConfirmacao: 'F1234567',
      nrOper: 12345676,
      prefDepe: 1113,
      observacoes: 'Teste',
    };

    await manualConfirmationRepository.createConfirmation(manualConfirmation1);
    await manualConfirmationRepository.createConfirmation(manualConfirmation2);
    await manualConfirmationRepository.createConfirmation(manualConfirmation3);

    const result = await service.execute();

    expect(result).toHaveLength(3);
  });
});
