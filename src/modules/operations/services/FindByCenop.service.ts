import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OperationsRepository } from '../infra/typeorm/repositories/OperationsRepository';
import Operations from '../infra/typeorm/entities/Operations';
import OperationsDTO from '../dtos/OperationsDTO';
import AppError from '../../../shared/errors/AppError';

@Injectable()
export class FindByCenopService {
  constructor(
    @InjectRepository(Operations)
    private operationsRepository: OperationsRepository,
  ) {}

  async execute(prefixoCenop: number): Promise<OperationsDTO[] | AppError> {
    const founded = await this.operationsRepository.findByCenop(prefixoCenop);

    if (founded.length === 0) {
      return new AppError(
        'Não há nenhuma operação para o CENOP informado, ou o CENOP informado esta incorreto',
        204,
      );
    }

    const operations: OperationsDTO[] = [];

    founded.forEach(operation => {
      const oper: OperationsDTO = {
        nrOper: operation.nro_oper,
        cenop: operation.pref_csa,
        cnpjCli: operation.cpf_cnpj,
        dtFinal: operation.dt_venc,
        dtFormalizacao: operation.dt_form,
        mci: operation.mci,
        nomeCli: operation.nm_cli,
        prefDepe: operation.pref_depe,
        vlrOper: operation.vlr_opr,
        situacao: operation.situacao,
      };

      operations.push(oper);
    });

    return operations;
  }
}
