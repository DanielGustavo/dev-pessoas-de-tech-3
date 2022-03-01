import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Project } from '.';

// eslint-disable-next-line no-shadow
export enum EmployeeRoles {
  designer = 'designer',
  frontend = 'frontend',
  backend = 'backend',
  QA = 'QA',
  DevOps = 'DevOps',
  manager = 'manager',
}

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('char', { length: 15, nullable: true })
  phone?: string;

  @Column('int')
  salary: number;

  @Column('enum', {
    enum: EmployeeRoles,
  })
  role: string;

  @Column('varchar', { nullable: true })
  avatarFilename?: string;

  @ManyToMany(() => Project, (projects) => projects.team)
  projects: Project[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
