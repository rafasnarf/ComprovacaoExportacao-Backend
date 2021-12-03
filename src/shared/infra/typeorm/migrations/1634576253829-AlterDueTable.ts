import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AlterDueTable1634576253829 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'duesManual',
      'createdAt',
      new TableColumn({
        name: 'createdAt',
        type: 'timestamp',
        default: 0,
      }),
    );
    await queryRunner.addColumns('duesManual', [
      new TableColumn({
        name: 'updatedAt',
        type: 'timestamp',
        default: 'now()',
      }),
      new TableColumn({
        name: 'radicalCNPJ',
        type: 'int',
        width: 8,
      }),
      new TableColumn({
        name: 'usoTotal',
        type: 'boolean',
        default: 'true',
      }),
      new TableColumn({
        name: 'dataDue',
        type: 'date',
      }),
      new TableColumn({
        name: 'tipoMoeda',
        type: 'varchar',
        length: '3',
      }),
      new TableColumn({
        name: 'valorMoedaEstrangeira',
        type: 'double',
        precision: 20,
        scale: 2,
      }),
      new TableColumn({
        name: 'valorTotalDue',
        type: 'double',
        precision: 20,
        scale: 2,
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('duesManual', 'updatedAt');
    await queryRunner.dropColumn('duesManual', 'usoTotal');
    await queryRunner.dropColumn('duesManual', 'dataDue');
    await queryRunner.dropColumn('duesManual', 'tipoMoeda');
    await queryRunner.dropColumn('duesManual', 'radicalCNPJ');
    await queryRunner.dropColumn('duesManual', 'valorMoedaEstrangeira');
    await queryRunner.dropColumn('duesManual', 'valorTotalDue');
  }
}
