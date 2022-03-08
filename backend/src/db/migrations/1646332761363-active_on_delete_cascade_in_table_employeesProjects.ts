import { MigrationInterface, QueryRunner } from 'typeorm';

export class activeOnDeleteCascadeInTableEmployeesProjects1646332761363
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "employeesProjects"
      DROP CONSTRAINT "employee_employeesprojects_id_fk",
      DROP CONSTRAINT "project_employeesprojects_id_fk",
      ADD CONSTRAINT "employee_employeesprojects_id_fk"
        FOREIGN KEY ("employeeId")
        REFERENCES employees(id)
        ON DELETE CASCADE,
      ADD CONSTRAINT "project_employeesprojects_id_fk"
        FOREIGN KEY ("projectId")
        REFERENCES projects(id)
        ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "employeesProjects"
      DROP CONSTRAINT "employee_employeesprojects_id_fk",
      DROP CONSTRAINT "project_employeesprojects_id_fk",
      ADD CONSTRAINT "employee_employeesprojects_id_fk"
        FOREIGN KEY ("employeeId")
        REFERENCES employees(id),
      ADD CONSTRAINT "project_employeesprojects_id_fk"
        FOREIGN KEY ("projectId")
        REFERENCES projects(id)
    `);
  }
}
