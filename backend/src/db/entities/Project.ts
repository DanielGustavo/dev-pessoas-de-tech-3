import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Customer, Employee } from '.';

// eslint-disable-next-line no-shadow
export enum ProjectPriorityLevel {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('varchar', { nullable: true })
  description?: string;

  @Column('integer')
  technicalSeconds: number;

  @Column('decimal')
  paymentPerHour: number;

  @Column('decimal', { nullable: true })
  discount?: number;

  @Column('timestamp')
  deadline: Date;

  @Column('enum', {
    enum: ProjectPriorityLevel,
  })
  priorityLevel: string;

  @Column('uuid', { nullable: true })
  customerId?: string;

  @Column('uuid', { nullable: true })
  leaderId?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @ManyToOne(() => Employee)
  @JoinColumn({ name: 'leaderId' })
  leader: Employee;

  @ManyToOne(() => Customer, (customer) => customer.projects)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @ManyToMany(() => Employee, (employee) => employee.projects)
  @JoinTable({
    name: 'employeesProjects',
    joinColumn: { name: 'projectId' },
    inverseJoinColumn: { name: 'employeeId' },
  })
  team: Employee[];

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
