import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Schedule } from './Schedule';

@Entity()
export class Doctor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  full_name: string;

  @OneToMany((type) => Schedule, (schedule) => schedule.doctor)
  schedules: Schedule[];
}
