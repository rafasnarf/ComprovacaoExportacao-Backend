import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDUEsTable1629134692397 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'duesManual',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            isPrimary: true,
            isNullable: false,
            length: '36',
          },
          {
            name: 'nrDue',
            type: 'varchar',
            length: '14',
            isNullable: false,
          },
          {
            name: 'chaveDue',
            type: 'varchar',
            length: '14',
            isNullable: false,
          },
          {
            name: 'valorDue',
            type: 'double',
            precision: 20,
            scale: 2,
            isNullable: false,
          },
          {
            name: 'nrOperDue',
            type: 'int',
            isNullable: false,
            width: 11,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('duesManual');
  }
}
