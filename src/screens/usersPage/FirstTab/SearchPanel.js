import React  from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';
// import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
// import Button from '@material-ui/core/Button';

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
    border: '1px solid #6aa4de',
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
    minWidth: 285,
    width: window.innerWidth < 756 ? '100%' : '40%'
  },
}));







///////////////////////////////////////////////////////////////////////////////////////////////////////////////

export default function SearchPanel({setSearchTextUser, setSearchTextOrg}) {
  const classes = useStyles();

  const [filterObj, setFilterUser] = React.useState('');
  const [filterOrg, setFilterOrg] = React.useState('');

  // console.log('rerender SearchPanel');

  const handleFilterObj = (event) => { 
    setFilterUser(event.target.value);
    setSearchTextUser(event.target.value); 
  };

  const handleFilterOrg = (event) => {
    setFilterOrg(event.target.value);
    setSearchTextOrg(event.target.value); 
  };

  // const fetchSearchObjHandle = useCallback(() => {fetchSearchObj()},[fetchSearchObj]);

  // const fetchSearchObjHandle = () => {fetchSearchObj()};

  return (
    <div style={{ display:'flex', flexWrap:'wrap', alignItems:'start-flex' , width: window.innerWidth < 756 ? '100%' : 'unset' }}>
      <FormControl className={classes.margin}>
        <BootstrapInput   id="input-obj" placeholder='Поиск по пользователям' value={filterObj} onChange={handleFilterObj}/>
       
      </FormControl>
      
      <FormControl className={classes.margin}>
        <BootstrapInput style={{minWidth: 250}} id="input-org" placeholder='поиск  по организациям' value={filterOrg} onChange={handleFilterOrg}/>
      </FormControl>
      
        {/* <Button onClick={fetchSearchObjHandle} style={{height: '43px'}} variant="contained" color="primary">
          Запрос в бд
        </Button> */}
    </div>
  );
}
