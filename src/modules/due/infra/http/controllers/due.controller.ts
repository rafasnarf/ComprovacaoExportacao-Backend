import {
  Bind,
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';

import DueDTO from '../../../dtos/DueDTO';

import { DuesRepository } from '../../typeorm/repositories/DuesRespository';
import { SaveDuesService } from '../../../services/SaveDues.service';
import { RemoveDueService } from '../../../services/RemoveDues.service';
import { FindAllDuesFromOperationService } from '../../../services/FindAllDuesFromOperation.service';
import { FindDueByIdService } from 'src/modules/due/services/FindDueById.service';
import { FindDueByNrDueService } from '../../../services/FindDueByNrDue.service';
import { AlterDueService } from '../../../services/AlterDue.service';
import { DuesXLSXFileService } from '../../../services/DuesXLSXFile.service';
import { DuesCSVFileService } from '../../../services/DuesCSVFile.service';

@Controller('due')
export class DueController {
  private duesRepository: DuesRepository;

  constructor() {
    this.duesRepository = new DuesRepository();
  }

  @Post('/uploadFile')
  @UseInterceptors(FileInterceptor('duesFile', { dest: 'tmp' }))
  @Bind(UploadedFile())
  async uploadFile(
    duesFile: Express.Multer.File,
    @Body() dataOper: Record<string, string>,
    @Res() response: Response,
  ): Promise<Response> {
    const duesXLSXFileService = new DuesXLSXFileService(this.duesRepository);
    const duesCSVFileService = new DuesCSVFileService(this.duesRepository);

    let result;
    if (
      duesFile.mimetype ===
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      result = await duesXLSXFileService.execute(duesFile, dataOper);
    } else if (
      duesFile.mimetype === 'text/csv' ||
      duesFile.mimetype === 'application/vnd.ms-excel'
    ) {
      result = await duesCSVFileService.execute(duesFile, dataOper);
    } else {
      result = { message: 'Arquivo não suportado' };
    }

    await fs.unlinkSync(duesFile.path);

    return response.json(result);
  }

  @Post()
  async saveDue(
    @Body() data: DueDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const saveDuesService = new SaveDuesService(this.duesRepository);

    const saved = await saveDuesService.execute(data);

    return response.json(saved);
  }

  @Get()
  async findAllDues(
    @Query('operation') operation: number,
    @Res() response: Response,
  ): Promise<Response> {
    const findAllDues = new FindAllDuesFromOperationService(
      this.duesRepository,
    );

    const foundedDues = await findAllDues.execute(operation);

    return response.json(foundedDues);
  }

  @Delete()
  async removeDue(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response> {
    const { id } = request.body;

    const removeDueService = new RemoveDueService(this.duesRepository);

    const removed = await removeDueService.execute(id);

    return response.json(removed);
  }

  @Get('findDue')
  // eslint-disable-next-line consistent-return
  async findDue(
    @Query('id') id: string,
    @Query('nrDue') nrDue: string,
    @Res() response: Response,
  ): Promise<Response> {
    if (id) {
      const findDueByIdService = new FindDueByIdService(this.duesRepository);

      const findDue = await findDueByIdService.execute(id);

      return response.json(findDue);
    }
    if (nrDue) {
      const findDueByNrDue = new FindDueByNrDueService(this.duesRepository);

      const foundedDue = await findDueByNrDue.execute(nrDue);

      return response.json(foundedDue);
    }
  }

  @Put()
  async updateDue(
    @Body() data: DueDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const alterDueService = new AlterDueService(this.duesRepository);

    const alteredDue = await alterDueService.execute(data);

    return response.json(alteredDue);
  }
}
