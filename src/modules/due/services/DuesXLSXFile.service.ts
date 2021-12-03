/* eslint-disable no-restricted-syntax */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { uuid } from 'uuidv4';
import * as xlsx from 'xlsx';
import * as fs from 'fs';
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
  dataDue: Date;
}

@Injectable()
export class DuesXLSXFileService {
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
    const file = fs.readFileSync(filePath);
    const workbook = xlsx.read(file, { type: 'buffer', cellDates: true });
    const sheets = workbook.SheetNames;
    let jsonFile;
    sheets.forEach(y => {
      const worksheet = workbook.Sheets[y];
      jsonFile = xlsx.utils.sheet_to_json(worksheet);
    });

    const newJson: SheetObject[] = [];
    for (let i = 0; i < Object.keys(jsonFile).length; i += 1) {
      const valorDue = jsonFile[i]['Valor DUE'];

      const data: SheetObject = {
        nrDue: jsonFile[i]['Numero Due'],
        chaveDue: jsonFile[i]['Chave  DUE'],
        vlrDue: Number.parseFloat(valorDue),
        dataDue: jsonFile[i]['Data Averbacao'],
        // vlrMoeda: jsonFile[i]['Valor USD'],
        // vlrNF: jsonFile[i]['Valor NF'],
        // ptaxVenda: jsonFile[i]['Ptax Venda'],
      };
      newJson.push(data);
    }

    const duesSaved = [];

    for (let i = 0; i < newJson.length; i += 1) {
      const due: DueDTO = {
        id: uuid(),
        nrDue: newJson[i].nrDue.replace('-', ''),
        chaveDue: newJson[i].chaveDue,
        valorDue: newJson[i].vlrDue,
        nrOperDue: Number(dataOper.operation),
        cnpjOper: Number(dataOper.cnpjOper),
        dataDue: newJson[i].dataDue,
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
