import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { blue, green, red } from '@material-ui/core/colors';
import Radio from '@material-ui/core/Radio';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  root: {
    width: 'fit-content',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    '& svg': {
      margin: theme.spacing(1.5),
    },
    '& hr': {
      margin: theme.spacing(0, 0.2),
    },
    minWidth:330,
    margin: '4px 8px'
  },
  amObjs:{alignSelf: 'center',marginLeft:4, padding: '2px 0px'},
   
}));

const GreenRadio = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
    padding:0,
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const RedRadio = withStyles({
  root: {
    color: red[400],
    '&$checked': {
      color: red[600],
    },
    padding:0,
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

const BlueRadio = withStyles({
  root: {
    color: blue[400],
    '&$checked': {
      color: blue[600],
    },
    padding:0,
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

export default function RadioBtnIW({setRadioValue,setRadioValueIW, valueForButtons,defaultVal, flagM}) {
//   const [selectedValue, setSelectedValue] = React.useState('m');
  const [selectedValue, setSelectedValue] = React.useState(defaultVal);

  const classes = useStyles();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setRadioValueIW(event.target.value);
  };

  return (
    <div style={{padding: '0px 0px'}}> 

        <Grid container alignItems="center" className={classes.root}>
          <div className={classes.amObjs}>Нов</div>
          <BlueRadio
              checked={selectedValue === valueForButtons.newIW}
              onChange={handleChange}
              value={valueForButtons.newIW}
              // value="o"
              color="primary"
              name="Other objs"
              size='small'
              inputProps={{ 'aria-label': valueForButtons.newIW }}
            />
        <Divider orientation="vertical" flexItem />
         <div className={classes.amObjs}>Раб</div>
            <RedRadio
              checked={selectedValue === valueForButtons.rabIW}
              onChange={handleChange}
              value={valueForButtons.rabIW}
              name="MGGT objs"
              size='small'
              inputProps={{ 'aria-label': valueForButtons.rabIW }}
            />
        <Divider orientation="vertical" flexItem />
          <div className={classes.amObjs}>Завр</div>
          <GreenRadio
            checked={selectedValue === valueForButtons.endIW}
            onChange={handleChange}
            value={valueForButtons.endIW}
            color="default"
            name="All objs"
            size='small'
            inputProps={{ 'aria-label': valueForButtons.endIW }}
          />  
        <Divider style={{padding:0, margin:0}} orientation="vertical" flexItem />
          <div className={classes.amObjs}>Все</div>
          <Radio
            style={{padding:0, margin:0}}
            checked={selectedValue === valueForButtons.all}
            onChange={handleChange}
            value={valueForButtons.all}
            color="default"
            name="All objs"
            size='small'
            inputProps={{ 'aria-label': valueForButtons.all }}
          />
        
      </Grid>
      
      
      
      
      
    </div>
  );
}
