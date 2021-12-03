import IManualConfirmationRepository from '../IManualConfirmationsRepository';
import ManualConfirmationDTO from '../../dtos/ManualConfirmationDTO';
import { uuid } from 'uuidv4';
import ComprovocaoManual from '../../infra/typeorm/entities/ComprovocaoManual';

export default class FakeManualConfirmationsRepository
  implements IManualConfirmationRepository
{
  private confirmations: ComprovocaoManual[] = [];

  public async createConfirmation(
    data: ManualConfirmationDTO,
  ): Promise<ManualConfirmationDTO> {
    const confirmation = new ComprovocaoManual();

    Object.assign(
      confirmation,
      { id: uuid(), dataConfirmacao: new Date() },
      data,
    );

    await this.confirmations.push(confirmation);

    return confirmation;
  }

  public async findByNrOper(
    nrOper: number,
  ): Promise<ComprovocaoManual | undefined> {
    const confirmation = this.confirmations.find(operartion => {
      return operartion.nrOper === nrOper;
    });

    return confirmation;
  }

  public async findAll(): Promise<ComprovocaoManual[]> {
    return this.confirmations;
  }
}
