import React from 'react';
import { Typography, Card, CardContent, TextField, FormControl, Button } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../styles/Registration.scss';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import { useForm, Controller } from 'react-hook-form';
import { client } from '../plugins/axios';

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

interface IRegForm {
  doctor: Doctor | null;
  time: Time | null;
  patient: string;
  complaints: string;
}

const defaultValues: IRegForm = {
  complaints: '',
  doctor: null,
  time: null,
  patient: '',
};

const Registration = () => {
  const doctors: Doctor[] = [
    {
      full_name: 'Иванов Иван Иванович',
      id: 1,
    },
  ];

  const times: Time[] = [
    {
      id: 1,
      start: 'iso-format',
      humanVariant: '02.07.2020 9:00',
      allowed: true,
    },
    {
      id: 2,
      start: 'iso-format',
      humanVariant: '02.07.2020 9:30',
      allowed: false,
    },
  ];

  const { register, handleSubmit, errors, control } = useForm<IRegForm>({ defaultValues });

  const onSubmit = async (data: IRegForm) => {
    await client.post('schedule', data);
  };

  return (
    <>
      <Typography className="reg__title" variant="h5">
        Запись на прием
      </Typography>
      <Card className="reg">
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl fullWidth>
              <TextField
                label="ФИО пациента"
                placeholder="Введите сюда ваше ФИО"
                variant="outlined"
                name="patient"
                helperText={errors.patient && 'Поле ФИО обязательно к заполнению'}
                inputRef={register({ required: true })}
                error={!!errors.patient}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
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
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.doctor}
                        helperText={errors.doctor && 'Вы должы указать к кому хотите записаться'}
                        label="ФИО доктора"
                        variant="outlined"
                      />
                    )}
                    renderOption={(option, { inputValue }) => {
                      const matches = match(option.full_name, inputValue);
                      const parts = parse(option.full_name, matches);

                      return (
                        <div>
                          {parts.map((part, index) => (
                            <span key={`highlight_${index}`} style={part.highlight ? { fontWeight: 600, background: '#faea2d' } : {}}>
                              {part.text}
                            </span>
                          ))}
                        </div>
                      );
                    }}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth margin="normal">
              <Controller
                name="time"
                rules={{ required: true }}
                control={control}
                render={(props) => (
                  <Autocomplete
                    {...props}
                    onChange={(_, doctor) => props.onChange(doctor)}
                    getOptionSelected={(val, option) => val.id === option.id}
                    options={times}
                    getOptionLabel={(option) => option.humanVariant}
                    getOptionDisabled={(option) => !option.allowed}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={!!errors.time}
                        helperText={errors.time && 'Вы должы указать время на которое хотите записаться'}
                        label="Дата и время записи на прием"
                        variant="outlined"
                      />
                    )}
                    renderOption={(option, { inputValue }) => {
                      const matches = match(option.humanVariant, inputValue);
                      const parts = parse(option.humanVariant, matches);

                      return (
                        <div>
                          {parts.map((part, index) => (
                            <span key={index} style={part.highlight ? { fontWeight: 600, background: '#faea2d' } : {}}>
                              {part.text}
                            </span>
                          ))}
                        </div>
                      );
                    }}
                  />
                )}
              />
            </FormControl>

            <FormControl fullWidth margin="normal">
              <TextField label="Жалобы" variant="outlined" name="complaints" inputRef={register} multiline rows={4} />
            </FormControl>

            <FormControl margin="normal">
              <Button variant="contained" color="secondary" type="submit">
                Записаться на прием
              </Button>
            </FormControl>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export { Registration };
