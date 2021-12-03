import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ComprovacaoManual from '../infra/typeorm/entities/ComprovocaoManual';
import ManualConfirmationDTO from '../dtos/ManualConfirmationDTO';
import ManualConfirmationRepository from '../infra/typeorm/repositories/ManualConfirmationRepository';
import AppError from '../../../shared/errors/AppError';

@Injectable()
export class FindConfirmationByNrOperService {
  constructor(
    @InjectRepository(ComprovacaoManual)
    private manualConfirmationRepository: ManualConfirmationRepository,
  ) {}

  async execute(nrOper: number): Promise<ManualConfirmationDTO | AppError> {
    const manualConfirmation =
      await this.manualConfirmationRepository.findByNrOper(nrOper);

    if (!manualConfirmation) {
      return new AppError('Não há confirmação manual para esta operação', 204);
    }

    return manualConfirmation;
  }
}
