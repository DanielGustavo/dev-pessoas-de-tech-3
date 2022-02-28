import { MigrationInterface, QueryRunner } from 'typeorm';

export class editColumnTypeOfSalaryFieldInEmployeesTable1646070524030
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE employees
      ALTER COLUMN "salary" TYPE DECIMAL(19, 4)
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE employees
      ALTER COLUMN "salary" TYPE INTEGER
    `);
  }
}
