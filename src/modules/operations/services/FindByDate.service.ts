import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { OperationsRepository } from '../infra/typeorm/repositories/OperationsRepository';
import Operations from '../infra/typeorm/entities/Operations';
import OperationsDTO from '../dtos/OperationsDTO';
import AppError from '../../../shared/errors/AppError';

interface IRequest {
  startDate: string;
  finalDate: string;
}

@Injectable()
export class FindByDateService {
  constructor(
    @InjectRepository(Operations)
    private operationsRepository: OperationsRepository,
  ) {}

  async execute({
    startDate,
    finalDate,
  }: IRequest): Promise<OperationsDTO[] | AppError> {
    const foundedOperations = await this.operationsRepository.findByDate({
      startDate,
      finalDate,
    });

    if (foundedOperations.length === 0) {
      return new AppError('Não há nenhuma operação para a data informada', 204);
    }

    const operations: OperationsDTO[] = [];

    foundedOperations.forEach(operation => {
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
