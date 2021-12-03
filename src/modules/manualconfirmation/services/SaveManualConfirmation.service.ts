import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ComprovacaoManual from '../infra/typeorm/entities/ComprovocaoManual';
import ManualConfirmationDTO from '../dtos/ManualConfirmationDTO';
import ManualConfirmationRepository from '../infra/typeorm/repositories/ManualConfirmationRepository';
import AppError from '../../../shared/errors/AppError';

@Injectable()
export class SaveManualConfirmationService {
  constructor(
    @InjectRepository(ComprovacaoManual)
    private manualConfirmationRepository: ManualConfirmationRepository,
  ) {}

  async execute(
    data: ManualConfirmationDTO,
  ): Promise<ManualConfirmationDTO | AppError> {
    const { nrOper } = data;

    const hasOper = await this.manualConfirmationRepository.findByNrOper(
      nrOper,
    );

    if (hasOper !== undefined) {
      return new AppError('Já existe confirmação para esta operação', 208);
    }

    const confirmation =
      await this.manualConfirmationRepository.createConfirmation(data);

    return confirmation;
  }
}
