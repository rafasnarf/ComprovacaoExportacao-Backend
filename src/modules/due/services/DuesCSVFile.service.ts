/* eslint-disable no-restricted-syntax */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as csvToJson from 'convert-csv-to-json';
import { uuid } from 'uuidv4';
import * as path from 'path';

import DUEs from '../infra/typeorm/entities/DUEs';
import { DuesRepository } from '../infra/typeorm/repositories/DuesRespository';
import DueDTO from '../dtos/DueDTO';
import { SaveDuesService } from './SaveDues.service';

interface SheetObject {
  nrDue: string;
  chaveDue: string;
  vlrDue: number;
  // vlrMoeda: number;
  // vlrNF: number;
  // ptaxVenda: number;
  // dataDue: string;
}

@Injectable()
export class DuesCSVFileService {
  constructor(
    @InjectRepository(DUEs)
    private duesRepository: DuesRepository,
  ) {}

  async execute(
    duesFile: Express.Multer.File,
    dataOper: Record<string, string>,
  ): Promise<DUEs[]> {
    const saveDueService = new SaveDuesService(this.duesRepository);

    const filePath = path.format({
      dir: `${process.cwd()}\\tmp`,
      base: duesFile.filename,
    });
    const jsonFile = csvToJson.getJsonFromCsv(filePath);

    const duesSaved = [];
    for (let i = 0; i < jsonFile.length; i += 1) {
      const oldDate = jsonFile[i].DataAverbacao;
      const day = oldDate.substring(0, 2);
      const month = oldDate.substring(3, 5);
      const year = oldDate.substring(6, 10);
      const newDate = new Date(`${year}-${month}-${day}`);
      const due: DueDTO = {
        id: uuid(),
        nrDue: jsonFile[i].NumeroDue.replace('-', ''),
        chaveDue: jsonFile[i].ChaveDUE,
        valorDue: jsonFile[i].ValorDUE.replace(',', '.'),
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
