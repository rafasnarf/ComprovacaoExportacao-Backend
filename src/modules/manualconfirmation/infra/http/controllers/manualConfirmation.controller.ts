import { Body, Controller, Get, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import ManualConfirmationRepository from '../../typeorm/repositories/ManualConfirmationRepository';
import ManualConfirmationDTO from 'src/modules/manualconfirmation/dtos/ManualConfirmationDTO';
import { SaveManualConfirmationService } from '../../../services/SaveManualConfirmation.service';
import { FindConfirmationByNrOperService } from '../../../services/FindConfirmationByNrOper.service';
import { FindAllService } from '../../../services/FindAllConfirmation.service';

@Controller('manualconfirmation')
export default class ManualConfirmationController {
  private manualConfirmationRepository: ManualConfirmationRepository;

  constructor() {
    this.manualConfirmationRepository = new ManualConfirmationRepository();
  }

  @Post('save')
  async saveConfirmation(
    @Body() data: ManualConfirmationDTO,
    @Res() response: Response,
  ): Promise<Response> {
    const saveConfirmation = new SaveManualConfirmationService(
      this.manualConfirmationRepository,
    );

    const saved = await saveConfirmation.execute(data);

    return response.json(saved);
  }

  @Get('operation')
  async findByNrOper(
    @Query('nrOper') nrOper: number,
    @Res() response: Response,
  ): Promise<Response> {
    const findConfirmation = new FindConfirmationByNrOperService(
      this.manualConfirmationRepository,
    );

    const confirmation = await findConfirmation.execute(nrOper);

    return response.json(confirmation);
  }

  @Get()
  async findAll(@Res() response: Response): Promise<Response> {
    const findAllConfirmations = new FindAllService(
      this.manualConfirmationRepository,
    );

    const confirmations = await findAllConfirmations.execute();

    return response.json(confirmations);
  }
}
