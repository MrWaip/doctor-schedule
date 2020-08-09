export type ScheduleRecord = {
  id: number;
  patient_name: string;
  time: string;
  complaints: string;
  completed: boolean;
};

export type Date = {
  humanVariant: string;
  value: string;
};

export type SearchForm = {
  doctor: Doctor | null;
  date: Date | null;
};

export type Doctor = {
  id: number;
  full_name: string;
};

export type Time = {
  id: number;
  start: string;
  humanVariant: string;
  allowed: boolean;
};

export type Loading = {
  doctors: boolean;
  times: boolean;
};

export type RegForm = {
  doctor: Doctor | null;
  time: Time | null;
  patient: string;
  complaints: string;
};
