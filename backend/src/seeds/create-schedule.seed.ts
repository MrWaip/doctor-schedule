import { Seeder, Factory } from 'typeorm-seeding';
import { Schedule } from '../entity/Schedule';

export default class CreateScheduleSeed implements Seeder {
  public async run(factory: Factory): Promise<void> {
    await factory(Schedule)().createMany(20);
  }
}
