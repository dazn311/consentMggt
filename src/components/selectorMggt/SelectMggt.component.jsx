import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    marginLeft: window.innerWidth < 500 ? 4 : theme.spacing(2),
    marginRight: window.innerWidth < 500 ? 4 : theme.spacing(2),
    minWidth: 105,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const valueForBtnType = {'Закрытые':'5','Новые':'2','Все':'0'};


export default function SelectMggt({caption, defaultVal, valueItems, setType}) {
  const classes = useStyles();
  const handleChange = (event) => {

      setType(event.target.value);
  };

    return (
    <div>
       <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="filter-select-filled-label">{caption}</InputLabel>
        <Select
          labelId="filter-select-filled-label"
          id="filter-select-filled"
          defaultValue={valueItems}
          value={valueItems}
          onChange={handleChange}
        >
          { Object.keys(valueForBtnType).map((key) => {
            return <MenuItem value={valueForBtnType[key]}>{ key }</MenuItem>
          })}
        </Select>
      </FormControl>
    </div>
  );
}
