import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { FindByDateService } from 'src/modules/operations/services/FindByDate.service';
import { FindByCenopService } from '../../../services/FindByCenop.service';
import { FindByNrOperService } from '../../../services/FindByNrOper.service';
import { FindByMciService } from '../../../services/FindByMci.service';
import { FindByCnpjService } from '../../../services/FindByCnpj.service';
import { OperationsRepository } from '../../typeorm/repositories/OperationsRepository';

@Controller('operations')
export default class OperationsController {
  private operationsRepository: OperationsRepository;

  constructor() {
    this.operationsRepository = new OperationsRepository();
  }

  @Get('date')
  async findByDate(
    @Query('startDate') startDate: string,
    @Query('finalDate') finalDate: string,
    @Res() response: Response,
  ): Promise<Response> {
    // const operationsRepository = new OperationsRepository();

    const checkOperations = new FindByDateService(this.operationsRepository);

    const dates = { startDate, finalDate };

    const operations = await checkOperations.execute(dates);

    return response.json(operations);
  }

  @Get('cenop') async findByCenop(
    @Query('prefixoCenop') prefixoCenop: number,
    @Res() response: Response,
  ): Promise<Response> {
    // const operationsRepository = new OperationsRepository();
    const findByCenop = new FindByCenopService(this.operationsRepository);

    const operations = await findByCenop.execute(prefixoCenop);

    return response.json(operations);
  }

  @Get('nroper') async findByNrOper(
    @Query('nrOper') nrOper: number,
    @Res() response: Response,
  ): Promise<Response> {
    // const operationsRepository = new OperationsRepository();
    const findByNrOper = new FindByNrOperService(this.operationsRepository);

    const operations = await findByNrOper.execute(nrOper);

    return response.json(operations);
  }

  @Get('mci') async findByMci(
    @Query('mci') mci: number,
    @Res() response: Response,
  ): Promise<Response> {
    // const operationsRepository = new OperationsRepository();
    const findByMci = new FindByMciService(this.operationsRepository);

    const operations = await findByMci.execute(mci);

    return response.json(operations);
  }

  @Get('cnpj') async findByCnpj(
    @Query('cnpj') cnpj: number,
    @Res() response: Response,
  ): Promise<Response> {
    // const operationsRepository = new OperationsRepository();
    const findByCnpj = new FindByCnpjService(this.operationsRepository);

    const operations = await findByCnpj.execute(cnpj);

    return response.json(operations);
  }
}
