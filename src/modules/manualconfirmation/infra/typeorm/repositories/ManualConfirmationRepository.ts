import { getRepository, Repository } from 'typeorm';
import { uuid } from 'uuidv4';

import ManualConfirmationDTO from '../../../dtos/ManualConfirmationDTO';
import IManualConfirmationRepository from '../../../repositories/IManualConfirmationsRepository';
import ComprovacaoManual from '../entities/ComprovocaoManual';

export default class ManualConfirmationRepository
  implements IManualConfirmationRepository
{
  private ormRepository: Repository<ComprovacaoManual>;

  constructor() {
    this.ormRepository = getRepository(ComprovacaoManual);
  }

  public async createConfirmation(
    data: ManualConfirmationDTO,
  ): Promise<ManualConfirmationDTO> {
    const { nrOper, matriculaConfirmacao, prefDepe, observacoes } = data;

    const confirmation = this.ormRepository.create({
      id: uuid(),
      nrOper,
      matriculaConfirmacao,
      prefDepe,
      observacoes,
    });

    await this.ormRepository.save(confirmation);

    return confirmation;
  }

  public async findByNrOper(
    nrOper: number,
  ): Promise<ComprovacaoManual | undefined> {
    const confirmation = await this.ormRepository.findOne({
      where: {
        nrOper,
      },
    });

    return confirmation;
  }

  public async findAll(): Promise<ComprovacaoManual[]> {
    const confirmations = await this.ormRepository.find();

    return confirmations;
  }
}
