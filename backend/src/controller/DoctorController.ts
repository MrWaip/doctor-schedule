import { Context } from 'koa';
import { Doctor } from '../entity/Doctor';
import { getRepository } from 'typeorm';

export const getDoctors = async (ctx: Context): Promise<void> => {
  const repo = getRepository(Doctor);
  const doctors = await repo.find();
  ctx.body = doctors;
};
