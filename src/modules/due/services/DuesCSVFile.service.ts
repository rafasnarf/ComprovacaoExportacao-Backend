/* eslint-disable no-restricted-syntax */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as csvToJson from 'convert-csv-to-json';
import { uuid } from 'uuidv4';
import * as path from 'path';

import DUEs from '../infra/typeorm/entities/DUEs';
import { DuesRepository } from '../infra/typeorm/repositories/DuesRespository';
import { Currency } from '../../currency/infra/typeorm/entities/Currency';
import { CurrencyRepository } from '../../currency/infra/typeorm/repositories/CurrencyRepositories';
import DueDTO from '../dtos/DueDTO';
import { SaveDuesService } from './SaveDues.service';
import { CheckCurrencyService } from '../../currency/services/CheckCurrency.service';
import { format, parseISO } from 'date-fns';

@Injectable()
export class DuesCSVFileService {
  constructor(
    @InjectRepository(DUEs)
    private duesRepository: DuesRepository,

    @InjectRepository(Currency)
    private currencyRepository: CurrencyRepository,
  ) {}

  async execute(
    duesFile: Express.Multer.File,
    dataOper: Record<string, string>,
  ): Promise<DUEs[]> {
    const saveDueService = new SaveDuesService(this.duesRepository);
    const checkCurrencyService = new CheckCurrencyService(
      this.currencyRepository,
    );

    const filePath = path.format({
      // dir: `${process.cwd()}\\tmp`,
      dir: `${process.cwd()}/tmp`,
      base: duesFile.filename,
    });
    const jsonFile = csvToJson.getJsonFromCsv(filePath);

    const duesSaved = [];

    // eslint-disable-next-line guard-for-in
    for (const i in jsonFile) {
      const oldDate = jsonFile[i].DataAverbacao;
      const day = oldDate.substring(0, 2);
      const month = oldDate.substring(3, 5);
      const year = oldDate.substring(6, 10);
      const newDate = new Date(`${year}/${month}/${day}`);

      let tipoMoeda = 0;

      switch (jsonFile[i].TipoMoeda) {
        case 'USD':
          tipoMoeda = 220;
          break;
        case 'EUR':
          tipoMoeda = 978;
          break;
        case 'GBP':
          tipoMoeda = 540;
          break;
        case 'JPY':
          tipoMoeda = 470;
          break;
        default:
          break;
      }

      const newValue = Number(
        jsonFile[i].ValorDUE.replace('.', '').replace(',', '.'),
      );

      // eslint-disable-next-line no-await-in-loop
      const cotacao = await checkCurrencyService.execute(newDate, tipoMoeda);

      const due: DueDTO = {
        id: uuid(),
        nrDue: jsonFile[i].NumeroDue.replace('-', ''),
        chaveDue: jsonFile[i].ChaveDUE,
        valorMoedaEstrangeira: newValue,
        valorDue: newValue * cotacao.valorCotacao,
        tipoMoeda,
        nrOperDue: Number(dataOper.operation),
        cnpjOper: Number(dataOper.cnpjOper),
        dataDue: newDate,
        usoTotal: true,
      };

      // eslint-disable-next-line no-await-in-loop
      const saved = await saveDueService.execute(due);

      if (Object.keys(saved).length === 2) {
        const nrDue = {
          nrDue: due.nrDue,
        };
        Object.assign(saved, nrDue);
      }

      duesSaved.push(saved);
    }

    return duesSaved;
  }
}
