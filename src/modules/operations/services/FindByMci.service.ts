import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import AppError from '../../../shared/errors/AppError';
import { OperationsRepository } from '../infra/typeorm/repositories/OperationsRepository';
import Operations from '../infra/typeorm/entities/Operations';
import OperationsDTO from '../dtos/OperationsDTO';

@Injectable()
export class FindByMciService {
  constructor(
    @InjectRepository(Operations)
    private operationsRepository: OperationsRepository,
  ) {}

  async execute(mci: number): Promise<OperationsDTO[] | AppError> {
    const founded = await this.operationsRepository.findByMci(mci);

    if (founded.length === 0) {
      return new AppError('Não há nenhuma operação com o MCI informado', 204);
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
