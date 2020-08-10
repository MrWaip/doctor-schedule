import { Context } from 'koa';
import { getRepository } from 'typeorm';
import { Schedule } from '../entity/Schedule';
import { DateTime } from 'luxon';
import { Time, Date } from '../types';

const TimeFactory = (dt: DateTime, id: number, allowed: boolean): Time => {
  return {
    allowed,
    start: dt.toISO(),
    humanVariant: dt.toFormat('dd.MM.yyyy HH:mm'),
    id,
  };
};

export const getTimes = async (ctx: Context): Promise<void> => {
  const times: Time[] = [];
  let dt = DateTime.local().startOf('day').plus({ day: 1, hours: 8 });
  let i = 1;
  const end = dt.plus({ week: 1 }).endOf('day');

  const repo = getRepository(Schedule);
  const schedules = await repo
    .createQueryBuilder('u')
    .where('u.time between :sd and :ed', { sd: dt.toISO(), ed: end.toISO() })
    .orderBy('time', 'ASC')
    .getMany();

  while (end > dt) {
    const allow = !schedules.some((i) => {
      return i.time.getTime() === dt.toJSDate().getTime();
    });
    times.push(TimeFactory(dt, i, allow));
    dt = dt.plus({ minutes: 30 });

    if (dt.weekday == 5 && dt.hour >= 18) {
      dt = dt.startOf('day').plus({ day: 3, hours: 8 });
    }

    if (dt.hour >= 18) {
      dt = dt.startOf('day').plus({ day: 1, hours: 8 });
    }

    i++;
  }
  ctx.body = times;
};

export const getDates = async (ctx: Context): Promise<void> => {
  const dates: Date[] = [];
  let dt = DateTime.local().startOf('day').minus({ week: 1 });
  const end = dt.plus({ week: 2 }).endOf('day');

  while (end > dt) {
    dates.push({
      humanVariant: dt.toFormat('dd.MM.yyyy'),
      value: dt.toISO(),
    });

    dt = dt.plus({ day: 1 });

    if (dt.weekday == 6) {
      dt = dt.startOf('day').plus({ day: 2 });
    }
  }
  ctx.body = dates;
};
