import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('duesManual')
export default class DUEs {
  @PrimaryColumn({ type: 'varchar', length: 36 })
  id: string;

  @Column({ type: 'varchar', length: 14 })
  nrDue: string;

  @Column({ type: 'varchar', length: 14 })
  chaveDue: string;

  @Column({ type: 'double', precision: 20, scale: 2, default: 0 })
  valorDue: number;

  @Column()
  nrOperDue: number;

  @Column({ type: 'int', width: 8 })
  radicalCNPJ: number;

  @Column()
  usoTotal: boolean;

  @Column()
  dataDue: Date;

  @Column({ type: 'int', width: 3 })
  tipoMoeda: number;

  @Column({ type: 'double', precision: 20, scale: 2 })
  valorMoedaEstrangeira: number;

  @Column({ type: 'double', precision: 20, scale: 2 })
  valorTotalDue: number;

  @CreateDateColumn({ type: 'timestamp', default: 'NOW()' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp', default: 'NOW()' })
  updatedAt: Date;
}
