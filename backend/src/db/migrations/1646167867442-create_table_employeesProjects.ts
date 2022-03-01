import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class createTableEmployeesProjects1646167867442
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employeesProjects',
        columns: [
          {
            name: 'employeeId',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: 'projectId',
            type: 'uuid',
            isNullable: false,
            isPrimary: true,
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

    const employeeIdForeignKey = new TableForeignKey({
      columnNames: ['employeeId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'employees',
      name: 'employee_employeesprojects_id_fk',
    });

    const projectIdForeignKey = new TableForeignKey({
      columnNames: ['projectId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'projects',
      name: 'project_employeesprojects_id_fk',
    });

    await queryRunner.createForeignKey(
      'employeesProjects',
      employeeIdForeignKey
    );

    await queryRunner.createForeignKey(
      'employeesProjects',
      projectIdForeignKey
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employeesProjects');
  }
}
