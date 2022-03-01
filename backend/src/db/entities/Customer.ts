import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('customers')
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar')
  name: string;

  @Column('varchar')
  email: string;

  @Column('char', { length: 15, nullable: true })
  phone?: string;

  @Column('varchar', { nullable: true })
  site: string;

  @Column('char', { length: 14 })
  cnpj: string;

  @Column('varchar', { nullable: true })
  avatarFilename?: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;
}
