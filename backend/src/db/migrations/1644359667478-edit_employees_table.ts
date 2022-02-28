import { MigrationInterface, QueryRunner } from 'typeorm';

export class editEmployeesTable1644359667478 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE employees
      RENAME "avatarUrl" to "avatarFilename"`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE employees
      RENAME "avatarFilename" to "avatarUrl"`
    );
  }
}
