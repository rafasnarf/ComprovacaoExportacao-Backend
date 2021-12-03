import DueDTO from '../dtos/DueDTO';
import DUEs from '../infra/typeorm/entities/DUEs';

export default interface IDuesRepository {
  saveDue(data: DueDTO): Promise<DUEs>;
  getDuesByOperation(operation: number): Promise<DUEs[] | undefined>;
  findDue(nrDue: string): Promise<DUEs | undefined>;
  removeDue(id: string): Promise<boolean>;
  findDueByID(id: string): Promise<DUEs | undefined>;
  alterDue(data: DueDTO): Promise<DUEs>;
  findAllDues(nrDue: string): Promise<DUEs[] | undefined>;
  // saveFileDues(data: DueDTO): Promise<DUEs[]>;
}
