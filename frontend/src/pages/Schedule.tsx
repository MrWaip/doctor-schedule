import React, { useState } from 'react';
import {
  Typography,
  Button,
  TableHead,
  TableCell,
  TableRow,
  Paper,
  Table,
  TableBody,
  TableContainer,
  IconButton,
  TextField,
  Grid,
} from '@material-ui/core';
import '../styles/Schedule.scss';
import { Delete } from '@material-ui/icons';
import { Doctor, Time } from './Registration';
import { useForm } from 'react-hook-form';

export type ScheduleRecord = {
  id: number;
  patient_name: string;
  time: string;
  complaints: string;
  completed: boolean;
};

export type SearchForm = {
  doctor: Doctor | null;
  date: Time | null;
};

const defaultValues: SearchForm = {
  doctor: null,
  date: null,
};

const Schedule = () => {
  const results: ScheduleRecord[] = [
    {
      id: 1,
      patient_name: 'TEST',
      time: '12:30',
      complaints: 'Болит жевот',
      completed: true,
    },
  ];

  const { control, register, errors, handleSubmit } = useForm<SearchForm>({ defaultValues });

  const times: Time[] = [];
  const doctors: Doctor[] = [];

  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [time, setTime] = useState<Time | null>(null);
  const search = (data: SearchForm) => {
    console.log(data);
  };

  return (
    <>
      <Grid container direction="column">
        <Grid item xs={12}>
          <Typography className="schedule__title" variant="h5">
            Журнал записи
          </Typography>
        </Grid>
      </Grid>

      <form onSubmit={handleSubmit(search)}>
        <Grid container item xs={12} spacing={1}>
          <Grid item>
            <TextField variant="outlined" label="Доктор" size="small" name="doctor" inputRef={register} />
          </Grid>
          <Grid item>
            <TextField variant="outlined" label="Дата" size="small" name="date" inputRef={register} />
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" type="submit">
              Найти
            </Button>
          </Grid>
        </Grid>
      </form>
      <TableContainer className="schedule__table" component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Пациент</TableCell>
              <TableCell>Время</TableCell>
              <TableCell>Жалобы</TableCell>
              <TableCell align="center">Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.patient_name}
                </TableCell>
                <TableCell>{row.time}</TableCell>
                <TableCell>{row.complaints}</TableCell>
                <TableCell align="center">
                  <IconButton>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export { Schedule };
