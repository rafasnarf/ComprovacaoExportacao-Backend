import ManualConfirmationDTO from '../dtos/ManualConfirmationDTO';
import ComprovacaoManual from '../infra/typeorm/entities/ComprovocaoManual';

export default interface IManualConfirmationRepository {
  createConfirmation(
    data: ManualConfirmationDTO,
  ): Promise<ManualConfirmationDTO>;
  findByNrOper(nrOper: number): Promise<ComprovacaoManual | undefined>;
  findAll(): Promise<ComprovacaoManual[]>;
}
