import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DUEs from '../infra/typeorm/entities/DUEs';
import { DuesRepository } from '../infra/typeorm/repositories/DuesRespository';

@Injectable()
export class RemoveDueService {
  constructor(
    @InjectRepository(DUEs)
    private duesRepository: DuesRepository,
  ) {}

  async execute(id: string): Promise<boolean> {
    const foundedDue = await this.duesRepository.findDueByID(id);

    if (!foundedDue) {
      return false;
    }

    await this.duesRepository.removeDue(id);
    return true;
  }
}
