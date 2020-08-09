import { getDoctors } from './controller/DoctorController';

export const ApiRoutes = [
  {
    path: '/doctors',
    method: 'get',
    action: getDoctors,
  },
];
