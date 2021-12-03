import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DUEs from '../infra/typeorm/entities/DUEs';
import { DuesRepository } from '../infra/typeorm/repositories/DuesRespository';
import DueDTO from '../dtos/DueDTO';

import AppError from '../../../shared/errors/AppError';

@Injectable()
export class FindDueByNrDueService {
  constructor(
    @InjectRepository(DUEs)
    private duesRepository: DuesRepository,
  ) {}

  async execute(nrDue: string): Promise<DUEs | undefined> {
    const foundedDue = await this.duesRepository.findDue(nrDue);

    return foundedDue;
  }
}
