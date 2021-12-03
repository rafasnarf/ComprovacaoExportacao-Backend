/* eslint-disable camelcase */
import { Entity, Column, Index, In } from 'typeorm';

@Entity('tb_ctc_moe_etg')
export class Currency {
  @Index()
  @Column()
  dt_ctc: Date;

  @Index()
  @Column()
  cd_moe: number;

  @Column()
  nm_moeda: string;

  @Column()
  vlr_cpr_br: number;

  @Column({ select: false })
  vlr_vnd_br: number;

  @Column({ select: false })
  vlr_cpr_usd: number;

  @Column({ select: false })
  vlr_vnd_usd: number;

  @Column({ select: false })
  dt_hr_atu_ctc: Date;

  @Column({ select: false })
  dt_hr_atu_tbl: Date;
}
