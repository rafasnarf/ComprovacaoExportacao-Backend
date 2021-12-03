import FindByDateDTO from '../dtos/FindaByDateDTO';
import Operations from '../infra/typeorm/entities/Operations';

export default interface IOperationsRepository {
  findByDate(data: FindByDateDTO): Promise<Operations[] | undefined>;
  findByCenop(prefixoCenop: number): Promise<Operations[] | undefined>;
  findByNrOper(nrOper: number): Promise<Operations | undefined>;
  findByMci(mci: number): Promise<Operations[] | undefined>;
  findByCnpj(cnpj: number): Promise<Operations[] | undefined>;
}
