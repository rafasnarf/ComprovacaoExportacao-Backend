import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DUEs from '../infra/typeorm/entities/DUEs';
import { DuesRepository } from '../infra/typeorm/repositories/DuesRespository';
import { uuid } from 'uuidv4';
import DueDTO from '../dtos/DueDTO';

import AppError from '../../../shared/errors/AppError';

@Injectable()
export class SaveDuesService {
  constructor(
    @InjectRepository(DUEs)
    private duesRepository: DuesRepository,
  ) {}

  async execute(data: DueDTO): Promise<DUEs | AppError> {
    const {
      nrDue,
      chaveDue,
      nrOperDue,
      cnpjOper,
      valorDue,
      usoTotal,
      valorTotalDue,
      dataDue,
      valorMoedaEstrangeira,
      tipoMoeda,
    } = data;

    if (!nrDue || !chaveDue || !nrOperDue || !cnpjOper || !valorDue) {
      return new AppError('Necessário informar os dados corretos.');
    }

    let due: DUEs;

    if (!usoTotal) {
      if (!valorTotalDue) {
        return new AppError(
          'Para uso parcial, o valor total da DUE deve ser informado.',
        );
      }
      const foundedDue = await this.duesRepository.findAllDues(nrDue);
      if (foundedDue.length === 0) {
        due = await this.saveDue(data);
        return due;
      }

      const usoDue = foundedDue[0].usoTotal;
      if (usoDue) {
        return new AppError(
          'Esta DUE já esta cadastrada como uso total para outra operação.',
        );
      }
      const cnpjDue = foundedDue[0].radicalCNPJ;
      if (cnpjDue !== Number(cnpjOper.toString().slice(0, -6))) {
        return new AppError(
          'Radical do CNPJ da operação não bate com da DUE já cadastrada.',
        );
      }
      const operDue = [];
      foundedDue.forEach(a => {
        operDue.push(a.nrOperDue);
      });

      for (let i = 0; i < operDue.length; i += 1) {
        if (operDue[i] === nrOperDue) {
          return new AppError(
            'Essa DUE já esta cadastrada para esta operação, ação não permitida',
          );
        }
      }

      const valorTotal = foundedDue[0].valorTotalDue;
      if (valorTotal !== valorTotalDue) {
        return new AppError(
          'Valor Total da DUE não é igual ao valor total já cadastrado em outra DUE.',
        );
      }

      let valorFoundedDue = 0;
      for (let i = 0; i < foundedDue.length; i += 1) {
        valorFoundedDue += foundedDue[i].valorDue;
      }

      if (valorDue + valorFoundedDue <= valorTotal) {
        due = await this.saveDue(data);
      } else {
        return new AppError(
          'Valor ultrapassa o valor total da DUE. Refaça a operação.',
        );
      }

      return due;
    }

    const foundedDue = await this.duesRepository.findDue(nrDue);
    if (foundedDue === undefined) {
      due = await this.saveDue(data);
    } else {
      const usoDue = foundedDue.usoTotal;
      if (usoDue) {
        return new AppError('Esta DUE já esta cadastrada como uso total.');
      }
      return new AppError(
        'Esta DUE já esta cadastrada para uso parcial em outra operação. Selecione uso parcial da DUE.',
      );
    }

    return due;
  }

  private async saveDue(data: DueDTO): Promise<DUEs> {
    const {
      nrDue,
      chaveDue,
      nrOperDue,
      valorDue,
      usoTotal,
      cnpjOper,
      valorTotalDue,
      dataDue,
      tipoMoeda,
      valorMoedaEstrangeira,
    } = data;
    let due: DUEs;
    if (usoTotal) {
      due = await this.duesRepository.saveDue({
        id: uuid(),
        nrDue,
        chaveDue,
        nrOperDue,
        valorDue,
        usoTotal,
        cnpjOper,
        dataDue,
        tipoMoeda,
        valorMoedaEstrangeira,
      });
    } else {
      due = await this.duesRepository.saveDue({
        id: uuid(),
        nrDue,
        chaveDue,
        nrOperDue,
        valorDue,
        usoTotal,
        cnpjOper,
        dataDue,
        valorTotalDue,
        tipoMoeda,
        valorMoedaEstrangeira,
      });
    }

    return due;
  }
}
