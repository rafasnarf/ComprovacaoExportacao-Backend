import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DueDTO from '../dtos/DueDTO';
import DUEs from '../infra/typeorm/entities/DUEs';
import { DuesRepository } from '../infra/typeorm/repositories/DuesRespository';

@Injectable()
export class AlterDueService {
  constructor(
    @InjectRepository(DUEs)
    private duesRepository: DuesRepository,
  ) {}

  async execute(data: DueDTO): Promise<DUEs | boolean> {
    const foundedDue = await this.duesRepository.findDueByID(data.id);

    if (!foundedDue) {
      return false;
    }

    // const foundedByNrDue = await this.duesRepository.findDue(data.nrDue);

    // if (foundedByNrDue) {
    //   return false;
    // }

    const alteredDue = await this.duesRepository.alterDue(data);
    return alteredDue;
  }
}
