import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Doctor } from '../entity/Doctor';
import { Schedule } from '../entity/Schedule';
import { DateTime } from 'luxon';

const getRandomIntervalTime = (): Date => {
  const minutes = Math.round(Math.random() * 48) * 30;
  const day = Math.round(Math.random() * 7);
  const dt = DateTime.local().startOf('day').plus({ minutes, day });
  return dt.toJSDate();
};

define(Schedule, (faker: typeof Faker) => {
  const entity = new Schedule();
  entity.complaints = faker.lorem.sentence();
  entity.completed = faker.random.boolean();
  entity.patient_name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  entity.time = getRandomIntervalTime();
  entity.doctor = factory(Doctor)() as any;
  return entity;
});
