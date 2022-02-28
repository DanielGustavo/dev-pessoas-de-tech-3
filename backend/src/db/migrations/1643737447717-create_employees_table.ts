import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createEmployeesTable1643737447717 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'employees',
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
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'phone',
            type: 'char',
            length: '15',
          },
          {
            name: 'salary',
            type: 'int',
            isNullable: false,
          },
          {
            name: 'role',
            type: 'enum',
            isNullable: false,
            enum: [
              'designer',
              'frontend',
              'backend',
              'QA',
              'DevOps',
              'manager',
            ],
          },
          {
            name: 'avatarUrl',
            type: 'varchar',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('employees');
  }
}
