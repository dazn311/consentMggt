import React  from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
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
  formControl: {
    margin: theme.spacing(1),
    marginLeft: window.innerWidth < 500 ? 0 : theme.spacing(1),
    marginRight: window.innerWidth < 500 ? 0 : theme.spacing(2),
    minWidth: 300,
  },
}));



///////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function SearchPanel({setSearchTextObj, setSearchTextOrg}) {
  const classes = useStyles();
  // const [filterObj, setFilterObj] = React.useState('');
  const [filterOrg, setFilterOrg] = React.useState('');

  // const handleFilterObj = (event) => {
  //   setFilterObj(event.target.value);
  //   setSearchTextObj(event.target.value);
  // };

  const handleFilterOrg = (event) => {
    setFilterOrg(event.target.value);
    setSearchTextOrg(event.target.value); 
  };

  return (
      <FormControl className={classes.formControl}>
        <BootstrapInput style={{minWidth: 250}} id="input-org" placeholder='поиск  по Объектов' value={filterOrg} onChange={handleFilterOrg}/>
      </FormControl>
  );
}
