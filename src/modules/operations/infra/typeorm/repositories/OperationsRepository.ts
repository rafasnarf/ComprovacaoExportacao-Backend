import { getRepository, Repository, Between } from 'typeorm';
import IOperationsRepository from 'src/modules/operations/repositories/IOperationsRepository';
import Operations from '../entities/Operations';
import FindByDateDTO from '../../../dtos/FindaByDateDTO';

export class OperationsRepository implements IOperationsRepository {
  private ormRepository: Repository<Operations>;

  constructor() {
    this.ormRepository = getRepository(Operations);
  }

  public async findByDate({
    startDate,
    finalDate,
  }: FindByDateDTO): Promise<Operations[] | undefined> {
    const operations = await this.ormRepository.find({
      where: {
        dt_form: Between(startDate, finalDate),
      },
    });

    return operations;
  }

  public async findByCenop(prefixoCenop: number): Promise<Operations[]> {
    const operations = await this.ormRepository.find({
      where: {
        pref_csa: prefixoCenop,
      },
    });

    return operations;
  }

  public async findByNrOper(nrOper: number): Promise<Operations | undefined> {
    const operation = await this.ormRepository.findOne({
      where: {
        nro_oper: nrOper,
      },
    });

    return operation;
  }

  public async findByMci(mci: number): Promise<Operations[] | undefined> {
    const operations = await this.ormRepository.find({
      where: {
        mci,
      },
    });

    return operations;
  }

  public async findByCnpj(cnpj: number): Promise<Operations[] | undefined> {
    const operations = await this.ormRepository.find({
      where: {
        cpf_cnpj: cnpj,
      },
    });

    return operations;
  }
}
