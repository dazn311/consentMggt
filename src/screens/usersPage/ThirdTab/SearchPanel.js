import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
// import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    minWidth: 185,
  },
}));

export default function SearchPanel({setSearchText, setField}) {
  const classes = useStyles();
  const [searchType, setSearchType] = React.useState('nameEvent');
  const [filter, setFilter] = React.useState('');
  // console.log('rerender SearchPanel');
  const handleChange = (event) => {
    setSearchType(event.target.value);
    setField(event.target.value);
    // console.log('event.target.value',event.target.value);
  };
  const handleFilter = (event) => {
    setFilter(event.target.value);
    setSearchText(event.target.value);
    // console.log('event.target.value',event.target.value);
  };
  return (
    <div>
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="input-textbox">??????????</InputLabel>
        <BootstrapInput id="input-textbox" placeholder='??????????..' value={filter} onChange={handleFilter}/>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel id="input-select-label">?????? ????????????</InputLabel>
        <Select
          labelId="input-select-label"
          id="input-select"
          value={searchType}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
          <MenuItem value='nameEvent'>???????????????? ??????????????</MenuItem>
          <MenuItem value='userName'>????????????????????????</MenuItem>
          <MenuItem value='type'>?????? ??????????????????</MenuItem>
        </Select>
      </FormControl>
      
    </div>
  );
}
