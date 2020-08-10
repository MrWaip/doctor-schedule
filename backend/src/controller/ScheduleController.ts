import { Context, Next } from 'koa';
import { getRepository, getManager } from 'typeorm';
import { Schedule } from '../entity/Schedule';
import { Doctor, Time } from '../types';
import { DateTime } from 'luxon';

type CreateScheduleBody = {
  doctor: Doctor;
  time: Time;
  patient: string;
  complaints: string;
};

type GetScheduleQuery = {
  doctor?: number;
  date?: string;
};

type DeleteScheduleParam = {
  id: number;
};

export const getSchedules = async (ctx: Context, next: Next): Promise<void> => {
  const { date, doctor } = ctx.query as GetScheduleQuery;

  if (!date || !doctor) {
    ctx.body = [];
    return next();
  }

  const start = DateTime.fromISO(date);
  const end = start.endOf('day');

  const repo = getRepository(Schedule);
  const schedules = await repo
    .createQueryBuilder('u')
    .where('u.time between :sd and :ed', { sd: start.toISO(), ed: end.toISO() })
    .andWhere('u.doctor_id = :di', { di: doctor })
    .orderBy('time', 'ASC')
    .getMany();

  ctx.body = schedules.map((i) => {
    return { ...i, time: DateTime.fromJSDate(i.time).toFormat('HH:mm') };
  });
};

export const createSchedule = async (ctx: Context, next: Next): Promise<void> => {
  const { doctor, time, patient, complaints } = ctx.request.body as CreateScheduleBody;

  const schedule = new Schedule();
  schedule.completed = false;
  schedule.doctor_id = doctor.id;
  schedule.time = new Date(time.start);
  schedule.patient_name = patient;
  schedule.complaints = complaints;

  await getManager().save(schedule);

  ctx.body = {
    message: 'Запись успешно создана',
  };

  return next();
};

export const deleteById = async (ctx: Context, next: Next): Promise<void> => {
  const { id } = ctx.params as DeleteScheduleParam;
  await getRepository(Schedule).delete(id);
  ctx.body = {
    message: 'Запись успешно удалена',
  };
  return next();
};
