import React  from 'react';
 

import {makeStyles, useTheme} from '@material-ui/core/styles';
 
const useStyles = makeStyles((theme) => ({
  root: {
    // width: '95%',
    // maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    maxHeight: 500,
    overflow: 'auto',
    border: '1px solid #8080802e',
    margin: '4px 8px',
  },
  span: {
    color: '#1976d2'
  },
  panelTitle: {
    color: '#FFF'
  },
  red: {
    color: 'red'
  },
}));

const CardUserDetails = ({ curUser, selectUserAllStats }) => {
    const classes = useStyles();
    const themess =  useTheme();

 
  return (
    <div className="row">
        <div className="col-md-5">
            <div className="panel">
                <div className="panel-heading">
                    {/* <span className="panel-icon"> <i className="fa fa-star"/> </span> */}
                    <span className={classes.panelTitle}> Статистика по  объектам</span>
                </div>
                <div className="panel-body pn">
                    <table className="table mbn tc-icon-1 tc-med-2 tc-bold-last">
                        <thead>
                            <tr className="hidden">
                                <th className="mw30"></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td> <span className="fa fa-newspaper-o text-info"></span></td>
                                <td style={{minWidth: 174, color: themess.palette.type === 'dark' && 'bisque' }} >Все объектов</td>
                                <td> <i className="fa fa-caret-up text-info pr10" style={{paddingRight:10}}/>{selectUserAllStats && (selectUserAllStats.userAmObjs || '42(*)')}</td>
                            </tr>
                            <tr>
                                <td>
                                    <span className="fa fa-desktop text-warning"></span>
                                </td>
                                <td style={{minWidth: 120, color: themess.palette.type === 'dark' && 'bisque' }} >Объектов в работе</td>
                                <td> <i className="fa fa-caret-up text-info pr10" style={{paddingRight:10}}/>{selectUserAllStats ? (selectUserAllStats.userAmObjs || '14(*)') : '14(*)'}</td>
                            </tr>
                            <tr>
                                <td> <span className="fa fa-microphone text-primary"></span></td>
                                <td style={{minWidth: 120, color: themess.palette.type === 'dark' && 'bisque' }} >Согласованных объектов</td>
                                <td> <i className="fa fa-caret-down text-danger pr10"  style={{paddingRight:10}}/>{selectUserAllStats ? (selectUserAllStats.userAmObjs || '8(*)') : '8(*)'}</td>
                            </tr>
                            
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="panel">
                <div className="panel-heading">
                    {/* <span className="panel-icon"> <i className="fa fa-star"/> </span> */}
                    <span className={classes.panelTitle}> Статистика по  сообщениям</span>
                </div>
                <div className="panel-body pn">
                    <table className="table mbn tc-icon-1 tc-med-2 tc-bold-last">
                        <thead>
                            <tr className="hidden">
                                <th className="mw30"></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <span className="fa fa-desktop text-warning"></span>
                                </td>
                                <td style={{minWidth: 120, color: themess.palette.type === 'dark' && 'bisque' }} >За все время</td>
                                <td> <i className="fa fa-caret-up text-info pr10" style={{paddingRight:10}}/>{selectUserAllStats && (selectUserAllStats.userAmAllMes || '23(*)')}</td>
                            </tr>
                            <tr>
                                <td> <span className="fa fa-microphone text-primary"></span></td>
                                <td  style={{minWidth: 120, color: themess.palette.type === 'dark' && 'bisque', borderBottom: '1px solid #ffe4c469', paddingBottom: 4}}  >Вложений файлов</td>
                                <td style={{minWidth: 140, borderBottom: '1px solid #7c985b', paddingBottom: 4}}> <i className="fa fa-caret-up text-info pr10" style={{paddingRight:10}}/>{selectUserAllStats ? (selectUserAllStats.userAmMesFile || '2(*)') : '2(*)'}</td>
                            </tr>
                            <tr  >
                                <td> <span className="fa fa-newspaper-o text-info"></span></td>
                                <td  style={{minWidth: 120, color: themess.palette.type === 'dark' && 'bisque' }} >Соощений за сутки</td>
                                <td> <i className="fa fa-caret-up text-info pr10" style={{paddingRight:10}}/>{selectUserAllStats ? (selectUserAllStats.mesOfDay || '22(*)') : '22(*)'}</td>
                            </tr>
                            <tr>
                                <td> <span className="fa fa-newspaper-o text-info"></span></td>
                                <td style={{minWidth: 174, color: themess.palette.type === 'dark' && 'bisque' }} >Вложений за сутки</td>
                                <td> <i className="fa fa-caret-up text-info pr10" style={{paddingRight:10}}/>{selectUserAllStats ? (selectUserAllStats.mesOfDayFile || '2(*)') : '2(*)'}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="panel">
                <div className="panel-heading">
                    {/* <span className="panel-icon"> <i className="fa fa-star"/> </span> */}
                    <span className={classes.panelTitle}>Статистика по Событиям</span>
                </div>
                <div className="panel-body pn">
                    <table className="table mbn tc-icon-1 tc-med-2 tc-bold-last">
                        <thead>
                            <tr className="hidden">
                                <th className="mw30"></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <span className="fa fa-desktop text-warning"></span>
                                </td>
                                <td style={{minWidth: 174, color: themess.palette.type === 'dark' && 'bisque' }} >Всего созданных</td>
                                <td> <i className="fa fa-caret-up text-info pr10" style={{paddingRight:10}}/>{selectUserAllStats ? (selectUserAllStats.resUserEvents || '25(*)') : '25(*)'}</td>
                            </tr>
                            <tr>
                                <td> <span className="fa fa-microphone text-primary"></span></td>
                                <td style={{minWidth: 120, color: themess.palette.type === 'dark' && 'bisque' }} >Участников</td>
                                <td> <i className="fa fa-caret-down text-danger pr10"  style={{paddingRight:10}}/>28(*)</td>
                            </tr>
                            <tr>
                                <td> <span className="fa fa-newspaper-o text-info"></span></td>
                                <td  style={{minWidth: 174, color: themess.palette.type === 'dark' && 'bisque', borderBottom: '1px solid #ffe4c469', paddingBottom: 4}}  >Закрытых собственных</td>
                                <td style={{minWidth: 140, borderBottom: '1px solid #7c985b', paddingBottom: 4}}> <i className="fa fa-caret-up text-info pr10" style={{paddingRight:10}}/>21(*)</td>
                            </tr>
                            <tr>
                                <td> <span className="fa fa-newspaper-o text-info"></span></td>
                                <td  style={{minWidth: 120, color: themess.palette.type === 'dark' && 'bisque' }} >Внутри своего объекта</td>
                                <td> <i className="fa fa-caret-up text-info pr10" style={{paddingRight:10}}/>2(*)</td>
                            </tr>
                            <tr>
                                <td> <span className="fa fa-newspaper-o text-info"></span></td>
                                <td  style={{minWidth: 120, color: themess.palette.type === 'dark' && 'bisque', borderBottom: '1px solid #ffe4c469', paddingBottom: 4}}  >К смежному объекту</td>
                                <td style={{minWidth: 140, borderBottom: '1px solid #7c985b', paddingBottom: 4}}><i className="fa fa-caret-up text-info pr10" style={{paddingRight:10}}/>9(*)</td>
                            </tr>
                            <tr>
                                <td> <span className="fa fa-newspaper-o text-info"></span> </td>
                                <td  style={{minWidth: 120, color: themess.palette.type === 'dark' && 'bisque' }} >За сутки созданных</td>
                                <td> <i className="fa fa-caret-up text-info pr10" style={{paddingRight:10}}/>5(*)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
             
        </div>
    </div>
  );
}

 

export default  CardUserDetails ;
