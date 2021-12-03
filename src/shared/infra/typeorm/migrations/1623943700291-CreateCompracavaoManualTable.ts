import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export default class CreateCompracavaoManualTable1623943700291
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'comprovacaoManual',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isNullable: false,
            length: '36',
          },
          {
            name: 'nrOper',
            type: 'int',
            isNullable: false,
            width: 11,
          },
          {
            name: 'prefDepe',
            type: 'int',
            isNullable: false,
            width: 4,
          },
          {
            name: 'dataConfirmacao',
            type: 'timestamp',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'matriculaConfirmacao',
            type: 'varchar',
            isNullable: false,
            length: '8',
          },
          {
            name: 'observacoes',
            type: 'text',
            isNullable: true,
          },
        ],
      }),
    );

    await queryRunner.createIndex(
      'comprovacaoManual',
      new TableIndex({
        name: 'PrimaryKeys',
        columnNames: ['nrOper', 'prefDepe'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex('comprovacaoManual', 'PrimaryKeys');

    await queryRunner.dropTable('comprovacaoManual');
  }
}
