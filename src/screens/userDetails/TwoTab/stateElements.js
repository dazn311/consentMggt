import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';




const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    flexDirection: window.innerWidth < 500 ? 'column': 'row',
    width: '100%',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    '& svg': {
      margin: theme.spacing(1.5),
    },
    '& hr': {
      margin: theme.spacing(0, 0.5),
    },
    // minWidth:1400,
  },
  amObjs:{alignSelf: 'center', padding: '4px 16px', width: window.innerWidth <500 ? '100%' : 350},
  btnUpdateAll: {backgroundColor: 'bisque'},
  
}));
     


///////////////////////////////////////////
export default function StateElements({curUser}) { 

  const classes = useStyles();

  return ( 
    <React.Fragment>
      <div className={classes.root}>
          <div className={classes.amObjs}> {curUser.user_name}</div>
        <Divider orientation="vertical" flexItem  />
          <div className={classes.amObjs}> {curUser.org_name}</div>
        <Divider orientation="vertical" flexItem />
          <div className={classes.amObjs}>статус: <span style={{color:'#efecec'}}>Активный</span> </div>
          
      </div>
    </React.Fragment> 
  );
}
