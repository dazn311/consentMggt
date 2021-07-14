import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 90,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  // MuiFilledInput: {
  //     root: {
  //         backgroundColor: 'red'
  //     }
  // }
}));

let idCount = 0
export default function SelectMggt({caption, defaultVal, valueItems, setType}) {
  const classes = useStyles();
  // const [age, setAge] = React.useState(30);

    idCount += 1
  const handleChange = (event) => {
    // setAge(event.target.value);
    
      setType(event.target.value);
    
    
  };

  return (
    <div>
       
       <FormControl variant="filled" className={classes.formControl}>
        <InputLabel id="simple-select-filled-label">{caption}</InputLabel>
        <Select
          labelId="simple-select-filled-label"
          id={`select-filled-${idCount}`}
          defaultValue={defaultVal}
          value={defaultVal}
          onChange={handleChange}
          style={{height:40}}
        >
           {/* {valueItems, setType, type=30}// valueItems 10 Смежные МГГТ  Все*/}
           {/* valueForBtnMggt = {other:'0',mggt:'1',all:'2'}; */}
            
          {/* <MenuItem value={valueItems.other}>Смежные</MenuItem>
          <MenuItem value={valueItems.mggt}>МГГТ</MenuItem>
          <MenuItem value={valueItems.all}>Все</MenuItem> */}
          {/* Object.keys(myObject).map(function(key, index) {
            myObject[key] *= 2;
          }); */}

          {valueItems && Object.keys(valueItems).map((key,index) => {
            return <MenuItem value={valueItems[key]}>{key}</MenuItem>
          })}
        </Select>
      </FormControl>
    </div>
  );
}
