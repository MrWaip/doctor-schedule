import React, { useEffect, useState } from 'react';
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
  Snackbar,
  LinearProgress,
} from '@material-ui/core';
import '../styles/Schedule.scss';
import { Delete } from '@material-ui/icons';
import { useForm, Controller } from 'react-hook-form';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import Autocomplete from '@material-ui/lab/Autocomplete';
import MuiAlert from '@material-ui/lab/Alert';
import { client } from '../plugins/axios';
import { SearchForm, Date, Doctor, ScheduleRecord } from '../types';

const defaultValues: SearchForm = {
  doctor: null,
  date: null,
};

const Schedule = () => {
  const { control, errors, handleSubmit } = useForm<SearchForm>({ defaultValues });
  const [dates, setDates] = useState<Date[]>([]);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [results, setResults] = useState<ScheduleRecord[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const search = async (payload: SearchForm) => {
    setLoading(true);
    const { data } = await client.get<ScheduleRecord[]>('schedule', {
      params: { date: payload.date?.value, doctor: payload.doctor?.id },
    });
    setResults(data);
    setLoading(false);
  };

  const deleteSchedule = async (id: number) => {
    setLoading(true);
    await client.delete(`schedule/${id}`);
    setLoading(false);
    const newResults = results.filter((i) => i.id != id);
    setResults(newResults);
    setOpen(true);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await client.get<Doctor[]>('doctors');
      setDoctors(data);
    };

    const fetchDates = async () => {
      const { data } = await client.get<Date[]>('dates');
      setDates(data);
    };

    fetchDoctors();
    fetchDates();
  }, []);

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
        {loading && <LinearProgress color="secondary" />}
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
                  <IconButton onClick={() => deleteSchedule(row.id)}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar open={open} autoHideDuration={6000} onClose={() => setOpen(false)}>
        <MuiAlert onClose={() => setOpen(false)} severity="success">
          Вы успешно записались к врачу!
        </MuiAlert>
      </Snackbar>
    </>
  );
};

export { Schedule };
