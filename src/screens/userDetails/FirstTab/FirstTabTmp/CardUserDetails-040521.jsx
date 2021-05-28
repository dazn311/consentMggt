import React  from 'react';
 

import { makeStyles } from '@material-ui/core/styles'; 
 
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
// curUser={curUser} objRect={selectObjRect}
const CardUserDetails = ({ curUser }) => {
    const classes = useStyles();

  console.log('curUser', curUser); 

 
 
  // const formatDate = (data) => {
  //   // console.log('999 data',data);
  //   return new Intl.DateTimeFormat('ru-Ru').format(new Date(data))
  // }

  return (
    <div className="row">
        <div className="col-md-5">
            <div className="panel">
                <div className="panel-heading">
                    <span className="panel-icon"> <i className="fa fa-star"/> </span>
                    <span className={classes.panelTitle}> Активность пользователя</span>
                </div>
                <div className="panel-body pn">
                    <table className="table mbn tc-icon-1 tc-med-2 tc-bold-last">
                        <thead>
                            <tr className="hidden">
                                <th className="mw30">#</th>
                                <th>Имя</th>
                                <th>Revenue</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <span className="fa fa-desktop text-warning"></span>
                                </td>
                                <td>Объектов в работе</td>
                                <td> <i className="fa fa-caret-up text-info pr10" style={{paddingRight:10}}/>14(*)</td>
                            </tr>
                            <tr>
                                <td> <span className="fa fa-microphone text-primary"></span></td>
                                <td>Все событий</td>
                                <td> <i className="fa fa-caret-down text-danger pr10"  style={{paddingRight:10}}/>108(*)</td>
                            </tr>
                            <tr>
                                <td> <span className="fa fa-newspaper-o text-info"></span></td>
                                <td>Был в системе</td>
                                <td> <i className="fa fa-caret-up text-info pr10" style={{paddingRight:10}}/>2.05.21(*)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <div className="panel">
                <div className="panel-heading">
                    <span className="panel-icon"> <i className="fa fa-trophy"/> </span>
                    <span className="panel-title"> Мои объекты</span>
                </div>
                <div className="panel-body" style={{ display: 'flex', flexWrap: 'wrap', padding: 5, maxWidth:'100%', overflowX: 'hidden'}} >
                    <span style={{margin: 2}} className="label label-warning mr5 mb10 ib lh15">Мненивки</span>
                    <span style={{margin: 2}} className="label label-primary mr5 mb10 ib lh15">Фили</span>
                    <span style={{margin: 2}} className="label label-info mr5 mb10 ib lh15">Головинское</span>
                    <span style={{margin: 2}} className="label label-success mr5 mb10 ib lh15">Панфилова</span>
                    <span style={{margin: 2}} className="label label-alert mr5 mb10 ib lh15">Варшавское</span>
                    <span style={{margin: 2}} className="label label-system mr5 mb10 ib lh15">Бутово</span>
                    <span style={{margin: 2}} className="label label-info mr5 mb10 ib lh15">Краснопресненская</span>
                    <span style={{margin: 2}} className="label label-success mr5 mb10 ib lh15">Масловка</span>
                    <span style={{margin: 2}} className="label label-primary mr5 mb10 ib lh15">Зорге</span>
                </div>
            </div> */}

            <div className="panel">
                <div className="panel-heading">
                    <span className="panel-icon"> <i className="fa fa-pencil"/>
                    </span> <span className={classes.panelTitle}>В работе</span>
                </div>
                <div className="panel-body pb5">
                    <h6>Объект</h6>

                    <h4>ГБУ Жилищник Мненивки</h4>

                    <p className="text-muted" > Начало работы - 21.03 <br/> Согласованно - 24.03 </p>

                    <hr className="short br-lighter"/>

                    <h6>Объект</h6>

                    <h4>ГБУ Жилищник Фили</h4>

                    <p className="text-muted" > Начало работы - 22.03 <br/> Согласованно - 24.03 </p>
                    <hr className="short br-lighter"/>
                    <h6>Объект</h6>

                    <h4>ГБУ Жилищник Головинское</h4>

                    <p className="text-muted" > Начало работы - 23.03 <br/> Согласованно - 24.03 </p>
                </div>
            </div>
        </div>
    </div>
  );
}

 

export default  CardUserDetails ;
