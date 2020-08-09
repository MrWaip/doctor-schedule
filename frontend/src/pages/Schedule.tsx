import React from 'react';
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
import { useForm, Controller } from 'react-hook-form';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { client } from '../plugins/axios';
import { SearchForm, Date, Doctor, ScheduleRecord } from '../types';

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

  const { control, errors, handleSubmit } = useForm<SearchForm>({ defaultValues });

  const dates: Date[] = [
    {
      value: 'www',
      humanVariant: 'wqweq',
    },
  ];
  const doctors: Doctor[] = [
    {
      full_name: '222',
      id: 1,
    },
  ];

  const search = async (data: SearchForm) => {
    await client.get('schedule', {
      params: {
        date: data.date?.value,
        doctor: data.doctor?.id,
      },
    });
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
          <Grid item xs={6} md={3}>
            <Controller
              name="doctor"
              rules={{ required: true }}
              control={control}
              render={(props) => (
                <Autocomplete
                  {...props}
                  onChange={(_, doctor) => props.onChange(doctor)}
                  getOptionSelected={(val, option) => val.id === option.id}
                  options={doctors}
                  getOptionLabel={(option) => option.full_name}
                  size="small"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors.doctor}
                      helperText={errors.doctor && 'Вы должы указать доктора'}
                      label="Доктор"
                      variant="outlined"
                    />
                  )}
                  renderOption={(option, { inputValue }) => {
                    const matches = match(option.full_name, inputValue);
                    const parts = parse(option.full_name, matches);

                    return (
                      <div>
                        {parts.map((part, index) => (
                          <span key={`highlight_${index}`} style={part.highlight ? { background: '#faea2d' } : {}}>
                            {part.text}
                          </span>
                        ))}
                      </div>
                    );
                  }}
                />
              )}
            />
          </Grid>
          <Grid item xs={6} md={3}>
            <Controller
              name="date"
              rules={{ required: true }}
              control={control}
              render={(props) => (
                <Autocomplete
                  {...props}
                  onChange={(_, date) => props.onChange(date)}
                  getOptionSelected={(date, option) => date.value === option.value}
                  options={dates}
                  getOptionLabel={(option) => option.humanVariant}
                  size="small"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      error={!!errors.date}
                      helperText={errors.date && 'Вы должы указать дату'}
                      label="Дата"
                      variant="outlined"
                    />
                  )}
                  renderOption={(option, { inputValue }) => {
                    const matches = match(option.humanVariant, inputValue);
                    const parts = parse(option.humanVariant, matches);

                    return (
                      <div>
                        {parts.map((part, index) => (
                          <span key={index} style={part.highlight ? { background: '#faea2d' } : {}}>
                            {part.text}
                          </span>
                        ))}
                      </div>
                    );
                  }}
                />
              )}
            />
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
