import React,{ useState,useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect'; 

import { makeStyles } from '@material-ui/core/styles';

import DatePicker from './DatePicker.thirdTab';
import DatePickerEnd from './DatePickerEnd.thirdTab';
import ColumnsChart from './ColumnsChart';


import { fetchNewOGHThirdTabStaticPageGraphicAsync } from '../../../store/adminPanelTrest/adminPanelTrest.actions';

import { selectAmountNewOGH } from '../../../store/adminPanelTrest/StatisticPage.selectors';
import { selectObjRectPage } from '../../../store/adminPanelTrest/objsPage.selectors';

const initionalDateStart = () => {
  let newDate = new Date();//.toISOString().split('T')[0];
  newDate.setDate(newDate.getDate() - 7);
  return newDate.toISOString().split('T')[0];
}

const initionalDateEnd = () => {
  let newDate = new Date();//.toISOString().split('T')[0];
  return newDate.toISOString().split('T')[0];
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  datePick: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    color: 'rgba(0, 0, 0, 0.87)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '4px',
    margin: '10px 0px',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
  }
}));



const TabThirdMenu = ({ fetchNewOGH, selectAmountNewOGH, selectObjRect })=> {
  const [graphicValue, setGraphicValue] = useState('');
  const [dateStart, setDateStart] = useState(initionalDateStart);
  const [dateEnd, setDateEnd] = useState(initionalDateEnd);
  const classes = useStyles();

  const setDateStartFromPicker = useCallback((date) => {setDateStart(date)},[]);
  const setDateEndFromPicker = useCallback((date) => {setDateEnd(date)},[]);

  useEffect(() => {
    // console.log('deltaDate',deltaDate);
    const dateEndPlus = dateEnd + 'T18:00:00.000Z';
    fetchNewOGH('new_obj', dateStart, dateEndPlus);
  }, [dateStart, dateEnd, fetchNewOGH]);

  // for one day ///////////////////////////////////

  useEffect(() => {
    const newOGH = selectAmountNewOGH.data.objMgtt;
    const newOGHRelatives = selectAmountNewOGH.data.objRelatives;
    const DataOGH = [newOGH,newOGHRelatives];
    setGraphicValue(DataOGH);

  },[selectAmountNewOGH])

  return (
    <React.Fragment>
      {/* <Title>Статистика по ОГХ за период</Title> */}
      <div className={classes.seeMore}>
            <div className={classes.datePick}>
                <DatePicker setDataStart={setDateStartFromPicker}/>
                <DatePickerEnd setDataEndforFetchEvents={setDateEndFromPicker}/>
            </div>
        <div style={{ display: 'flex', justifyContent: 'center' , position: 'relative', height:'95vh', width:'80vw'}} >
          <div style={{position: 'relative', height:'50%', width:'50%'}} >
            <ColumnsChart  dataArr={graphicValue} />
          </div>

        </div>

      </div>
    </React.Fragment>
  );
}

const mapStateToProps = createStructuredSelector ({
  selectObjRect: selectObjRectPage, // события короткие данные для таблицы
  selectAmountNewOGH: selectAmountNewOGH, // 
});
 
const mapDispatchToProps = (dispatch) => ({
  fetchNewOGH: (type, startDate, endDate) => dispatch(fetchNewOGHThirdTabStaticPageGraphicAsync(type, startDate, endDate)),
  
});

export default connect(mapStateToProps, mapDispatchToProps)(TabThirdMenu);

