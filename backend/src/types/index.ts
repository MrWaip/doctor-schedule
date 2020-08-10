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

export type Date = {
  humanVariant: string;
  value: string;
};
