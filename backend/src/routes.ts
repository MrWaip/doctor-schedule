import { getDoctors } from './controller/DoctorController';
import { getTimes, getDates } from './controller/TimeController';
import { createSchedule, getSchedules, deleteById } from './controller/ScheduleController';

export const ApiRoutes = [
  {
    path: '/doctors',
    method: 'get',
    action: getDoctors,
  },
  {
    path: '/times',
    method: 'get',
    action: getTimes,
  },
  {
    path: '/schedule',
    method: 'post',
    action: createSchedule,
  },
  {
    path: '/schedule',
    method: 'get',
    action: getSchedules,
  },
  {
    path: '/dates',
    method: 'get',
    action: getDates,
  },
  {
    path: '/schedule/:id',
    method: 'delete',
    action: deleteById,
  },
];
