import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import DUEs from '../infra/typeorm/entities/DUEs';
import { DuesRepository } from '../infra/typeorm/repositories/DuesRespository';

@Injectable()
export class FindAllDuesFromOperationService {
  constructor(
    @InjectRepository(DUEs)
    private duesRepository: DuesRepository,
  ) {}

  async execute(operation: number): Promise<DUEs[] | undefined> {
    const foundedDues = await this.duesRepository.getDuesByOperation(operation);

    return foundedDues;
  }
}
