import { MigrationInterface, QueryRunner } from 'typeorm';

export class editEmployeesTable1643746325545 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE employees ' +
        'ALTER COLUMN "avatarUrl" DROP NOT NULL, ' +
        'ALTER COLUMN "phone" DROP NOT NULL'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE employees ' +
        'ALTER COLUMN "avatarUrl" SET NOT NULL, ' +
        'ALTER COLUMN "phone" SET NOT NULL'
    );
  }
}
