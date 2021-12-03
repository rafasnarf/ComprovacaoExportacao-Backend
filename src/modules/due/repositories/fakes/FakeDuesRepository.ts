import IDuesRepository from '../IDuesRepository';
import DUEs from '../../infra/typeorm/entities/DUEs';
import DueDTO from '../../dtos/DueDTO';

export default class FakeDuesRepository implements IDuesRepository {
  private dues: DUEs[] = [];

  public async saveDue({
    id,
    nrDue,
    chaveDue,
    nrOperDue,
    valorDue,
    createdAt,
  }: DUEs): Promise<DUEs> {
    const due = new DUEs();

    Object.assign(due, {
      id,
      nrDue,
      chaveDue,
      nrOperDue,
      valorDue,
      createdAt,
    });

    this.dues.push(due);

    return due;
  }

  public async getDuesByOperation(
    operation: number,
  ): Promise<DUEs[] | undefined> {
    const filtredDues = this.dues.filter(e => e.nrOperDue === operation);

    return filtredDues;
  }

  public async findDue(nrDue: string): Promise<DUEs | undefined> {
    return this.dues.find(e => e.nrDue === nrDue);
  }

  public async findDueByID(id: string): Promise<DUEs | undefined> {
    return this.dues.find(e => e.id === id);
  }

  public async removeDue(id: string): Promise<boolean> {
    const indexDue = this.dues.findIndex(e => e.id === id);
    this.dues.splice(indexDue, 1);

    return true;
  }

  public async alterDue({
    id,
    nrDue,
    chaveDue,
    nrOperDue,
    valorDue,
  }: DueDTO): Promise<DUEs> {
    const due = new DUEs();

    Object.assign(due, {
      id,
      nrDue,
      chaveDue,
      nrOperDue,
      valorDue,
    });
    return due;
  }

  public async findAllDues(nrDue: string): Promise<DUEs[] | undefined> {
    return this.dues.filter(e => e.nrDue === nrDue);
  }
}
