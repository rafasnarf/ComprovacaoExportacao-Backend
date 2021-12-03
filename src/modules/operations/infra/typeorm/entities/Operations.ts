/* eslint-disable camelcase */
import { Entity, Column, Index, PrimaryColumn } from 'typeorm';

@Entity('giro_agro_atacado_exp')
export default class giroAgroAtacadoExp {
  @Index()
  @PrimaryColumn()
  nro_oper: number;

  @Column({ select: false })
  digito_oper: string;

  @Index()
  @Column()
  pref_depe: number;

  @Column({ select: false })
  depe: string;

  @Column()
  pref_csa: number;

  @Column({ select: false })
  csa: string;

  @Column()
  nm_cli: string;

  @Column()
  mci: number;

  @Column()
  cpf_cnpj: number;

  @Column({ select: false })
  prd_mdld: string;

  @Column({ select: false })
  nom_lncr: string;

  @Column()
  dt_form: string;

  @Column()
  dt_venc: string;

  @Column()
  vlr_opr: number;

  @Column()
  situacao: string;

  @Column({ select: false })
  dt_atualizacao: string;
}
