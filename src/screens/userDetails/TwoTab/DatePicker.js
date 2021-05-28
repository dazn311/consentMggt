import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


import { selectFilterRecDateStart } from '../../../store/user/user.selectors';

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    // border:'1px solid rgb(228 228 228)',
    borderRadius: 4,
    padding: 6,
    marginRight: theme.spacing(1),
    marginTop: theme.spacing(1),
    // width: '45%',
    minWidth: 160,
    maxWidth: 185
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '100%',
    // width: 200,
  },
}));

// 
// const initional = () => {
//     return '2021-01-01'
// }



const DatePickers =({setDateStart, filterRecDateStart}) => {
  const [Data, setData] = useState(filterRecDateStart);
  const classes = useStyles();

  const setDateOnBlur = async(e) => {
    setDateStart(e.target.value) ;
  }

  useEffect(() => {setData(filterRecDateStart)},[filterRecDateStart])
 
  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datestart"
        // label="От"
        type="date"
        defaultValue={Data}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        
        onBlur={setDateOnBlur}
      />
    </form>
  );
}

const mapStateToProps = createStructuredSelector ({
  filterRecDateStart: selectFilterRecDateStart,
  });

// const mapDispatchToProps = (dispatch) => ({
//
//
//
// });
export default connect(mapStateToProps)(DatePickers);