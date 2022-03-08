import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTableProjects1646166258690 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'projects',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isNullable: false,
            default: 'uuid_generate_v4()',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'technicalSeconds',
            type: 'integer',
            isNullable: false,
          },
          {
            name: 'paymentPerHour',
            type: 'decimal(19, 4)',
            isNullable: false,
          },
          {
            name: 'discount',
            type: 'decimal(19, 4)',
            isNullable: true,
          },
          {
            name: 'deadline',
            type: 'timestamp',
            isNullable: false,
          },
          {
            name: 'priorityLevel',
            type: 'enum',
            isNullable: false,
            enum: ['low', 'medium', 'high'],
          },
          {
            name: 'customerId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'leaderId',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            isNullable: false,
            default: 'now()',
          },
        ],
      })
    );

    const leaderIdForeignKey = new TableForeignKey({
      columnNames: ['leaderId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'employees',
      name: 'employee_project_id_fk',
    });

    const customerIdForeignKey = new TableForeignKey({
      columnNames: ['customerId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'customers',
      name: 'customer_project_id_fk',
    });

    await queryRunner.createForeignKey('projects', leaderIdForeignKey);
    await queryRunner.createForeignKey('projects', customerIdForeignKey);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('projects');
  }
}
