import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { blue, green, grey } from '@material-ui/core/colors';
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
    minWidth: 260,
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
const GreyRadio = withStyles({
  root: {
    color: grey[400],
    '&$checked': {
      color: grey[600],
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

export default function RadioButtons({setRadioValue,setRadioValueIW, valueForButtons,defaultVal}) {
//   const [selectedValue, setSelectedValue] = React.useState('m');
  const [selectedValue, setSelectedValue] = React.useState(defaultVal);

  const classes = useStyles();

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setRadioValue(event.target.value);
  };

  return (
    <>
    <div style={{padding: '0px 0px'}} >

        <Grid container alignItems="center" className={classes.root}>
          <div className={classes.amObjs}>Смеж</div>
          <BlueRadio
              checked={selectedValue === valueForButtons.other}
              onChange={handleChange}
              value={valueForButtons.other}  
              name="Other objs"
              size='small'
              inputProps={{ 'aria-label': valueForButtons.other }}
            />
        <Divider orientation="vertical" flexItem />
        <div className={classes.amObjs}>МГГТ</div>
          <GreenRadio
              checked={selectedValue === valueForButtons.mggt}
              onChange={handleChange}
              value={valueForButtons.mggt}
              name="MGGT objs"
              inputProps={{ 'aria-label': valueForButtons.mggt }} 
              size='small' 
            />
        <Divider orientation="vertical" flexItem />
        <div className={classes.amObjs}>Все</div>
          <GreyRadio
              checked={selectedValue === valueForButtons.all}
              onChange={handleChange}
              value={valueForButtons.all}
              name="All objs"
              inputProps={{ 'aria-label': valueForButtons.all }}
              color="primary" 
              size='small' 
            /> 
          </Grid>
      
    </div>
    </>
  );
}
