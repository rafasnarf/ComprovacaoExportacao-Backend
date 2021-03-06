export default interface DueDTO {
  id?: string;
  nrDue: string;
  chaveDue: string;
  valorDue: number;
  nrOperDue: number;
  cnpjOper?: number;
  usoTotal?: boolean;
  dataDue?: Date;
  tipoMoeda?: number;
  valorMoedaEstrangeira?: number;
  valorTotalDue?: number;
  createdAt?: Date;
  updatedAt?: Date;
}
