import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Doctor } from './Doctor';

@Entity({ name: 'schedule' })
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  patient_name: string;

  @Column({ type: 'timestamp with time zone', nullable: false })
  time: Date;

  @Column()
  complaints: string;

  @Column()
  completed: boolean;

  @ManyToOne((type) => Doctor, (doctor) => doctor.schedules)
  @JoinColumn({ name: 'doctor_id' })
  doctor: Doctor;

  @Column({ type: 'int', nullable: true })
  doctor_id: number;
}
