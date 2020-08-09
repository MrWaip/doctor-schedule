import { Seeder, Factory } from 'typeorm-seeding';
import { Doctor } from '../entity/Doctor';

export default class CreateDoctors implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Doctor)().createMany(10);
  }
}
