import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Schedule1597061129873 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'schedule',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'patient_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'time',
            type: 'timestamp with time zone',
            isNullable: false,
          },
          {
            name: 'complaints',
            type: 'varchar',
          },
          {
            name: 'completed',
            type: 'boolean',
          },
          {
            name: 'doctor_id',
            type: 'int',
            unsigned: true,
          },
        ],
      }),
    );

    await queryRunner.createForeignKey(
      'schedule',
      new TableForeignKey({
        columnNames: ['doctor_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'doctor',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('schedule');
    const foreignKey = table.foreignKeys.find((fk) => fk.columnNames.indexOf('doctor_id') !== -1);
    await queryRunner.dropForeignKey('schedule', foreignKey);
    await queryRunner.dropTable('schedule', true);
  }
}
