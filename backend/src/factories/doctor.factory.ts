import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Doctor } from '../entity/Doctor';

define(Doctor, (faker: typeof Faker) => {
  const doc = new Doctor();
  doc.full_name = `${faker.name.firstName()} ${faker.name.lastName()}`;
  return doc;
});
