import { Entity, Column, Index, PrimaryColumn } from 'typeorm';

@Entity('comprovacaoManual')
class ComprovacaoManual {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string;

  @Index()
  @Column({ type: 'int', width: 11 })
  nrOper: number;

  @Index()
  @Column({ type: 'int', width: 4 })
  prefDepe: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  dataConfirmacao: Date;

  @Column({ type: 'varchar', length: 8 })
  matriculaConfirmacao: string;

  @Column('text')
  observacoes: string;
}

export default ComprovacaoManual;
