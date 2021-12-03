import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import ComprovacaoManual from '../infra/typeorm/entities/ComprovocaoManual';
import ManualConfirmationDTO from '../dtos/ManualConfirmationDTO';
import ManualConfirmationRepository from '../infra/typeorm/repositories/ManualConfirmationRepository';

@Injectable()
export class FindAllService {
  constructor(
    @InjectRepository(ComprovacaoManual)
    private manualConfirmationRepository: ManualConfirmationRepository,
  ) {}

  async execute(): Promise<ManualConfirmationDTO[]> {
    const manualConfirmations =
      await this.manualConfirmationRepository.findAll();

    return manualConfirmations;
  }
}
