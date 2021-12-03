import IDuesRepository from 'src/modules/due/repositories/IDuesRepository';
import { getRepository, Repository } from 'typeorm';
import DueDTO from '../../../dtos/DueDTO';

import DUEs from '../entities/DUEs';

export class DuesRepository implements IDuesRepository {
  private ormRepository: Repository<DUEs>;

  constructor() {
    this.ormRepository = getRepository(DUEs);
  }

  public async saveDue(data: DueDTO): Promise<DUEs> {
    const {
      id,
      nrDue,
      chaveDue,
      nrOperDue,
      valorDue,
      usoTotal,
      cnpjOper,
      valorTotalDue,
      dataDue,
    } = data;
    const today = new Date();
    today.setTime(today.getTime() - today.getTimezoneOffset());

    let due: DUEs;
    if (usoTotal) {
      due = this.ormRepository.create({
        id,
        nrDue,
        chaveDue,
        nrOperDue,
        valorDue,
        usoTotal,
        dataDue,
        radicalCNPJ: Number(cnpjOper.toString().slice(0, -6)),
        createdAt: today,
        updatedAt: today,
      });
    } else {
      due = this.ormRepository.create({
        id,
        nrDue,
        chaveDue,
        nrOperDue,
        valorDue,
        usoTotal,
        valorTotalDue,
        dataDue,
        radicalCNPJ: Number(cnpjOper.toString().slice(0, -6)),
        createdAt: today,
        updatedAt: today,
      });
    }

    const saved = await this.ormRepository.save(due);

    return saved;
  }

  public async getDuesByOperation(
    operation: number,
  ): Promise<DUEs[] | undefined> {
    const foundedDues = await this.ormRepository.find({
      where: { nrOperDue: operation },
    });

    return foundedDues;
  }

  public async findDue(nrDue: string): Promise<DUEs | undefined> {
    const foundedDues = await this.ormRepository.findOne({
      where: [
        {
          nrDue,
        },
      ],
    });
    return foundedDues;
  }

  public async findDueByID(id: string): Promise<DUEs | undefined> {
    const foundedDue = await this.ormRepository.findOne({
      where: [{ id }],
    });

    return foundedDue;
  }

  public async removeDue(id: string): Promise<boolean> {
    const deleted = await this.ormRepository.delete({ id });

    if (deleted) {
      return true;
    }

    return false;
  }

  public async alterDue({
    id,
    nrDue,
    chaveDue,
    nrOperDue,
    valorDue,
    usoTotal,
    valorTotalDue,
  }: DueDTO): Promise<DUEs> {
    const today = new Date();
    today.setTime(today.getTime() - today.getTimezoneOffset());
    let due: DueDTO;
    if (!usoTotal) {
      due = {
        id,
        nrDue,
        chaveDue,
        nrOperDue,
        valorDue,
        valorTotalDue,
        updatedAt: today,
      };
    } else {
      due = {
        id,
        nrDue,
        chaveDue,
        nrOperDue,
        valorDue,
        updatedAt: today,
      };
    }

    const saved = await this.ormRepository.save(due);

    return saved;
  }

  public async findAllDues(nrDue: string): Promise<DUEs[] | undefined> {
    const dues = await this.ormRepository.find({ where: { nrDue } });

    return dues;
  }

  // public async saveFileDues(data: DueDTO): Promise<DUEs[]> {}
}
