import React, { useState } from 'react';
import { Typography, Card, CardContent, TextField, FormControl } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import '../styles/Registration.scss';

export type Doctor = {
  id: number;
  full_name: string;
};

const Registration = () => {
  const doctors: Doctor[] = [
    {
      full_name: 'Иванов Иван Иванович',
      id: 1,
    },
  ];
  const [value, setValue] = useState<Doctor | null>(null);

  return (
    <Card className="reg">
      <CardContent>
        <Typography className="reg__title" variant="h5">
          Запись на прием
        </Typography>

        <form noValidate autoComplete="off">
          <FormControl fullWidth>
            <TextField label="ФИО пациента" placeholder="Введите сюда ваше ФИО" variant="outlined" />
          </FormControl>
          <FormControl fullWidth margin="normal">
            <Autocomplete
              value={value}
              onChange={(event, val) => setValue(val)}
              getOptionSelected={(val, option) => val.id === option.id}
              options={doctors}
              getOptionLabel={(option: Doctor) => option.full_name}
              renderInput={(params) => <TextField {...params} label="ФИО доктора" variant="outlined" />}
            />
          </FormControl>
        </form>
      </CardContent>
    </Card>
  );
};

export { Registration };
