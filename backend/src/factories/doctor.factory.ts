import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Doctor } from '../entity/Doctor';

define(Doctor, (faker: typeof Faker) => {
  const name = faker.name.title();
  const doc = new Doctor();
  doc.full_name = name;
  return doc;
});
