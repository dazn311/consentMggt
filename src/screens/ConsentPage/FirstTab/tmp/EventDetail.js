import React,{ useEffect} from 'react';


import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import Slide from '@material-ui/core/Slide';
// import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemAvatar from '@material-ui/core/ListItemAvatar';
// import ListItemText from '@material-ui/core/ListItemText';
// import Text from '@material-ui/core/TextField';
// import PersonIcon from '@material-ui/icons/Person';

import { useTheme } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

import { selectObjRectPage } from '../../../store/adminPanelTrest/objsPage.selectors';  
import { fetchObjRectListAsync } from '../../../store/adminPanelTrest/adminPanelTrest.actions'; 
//fetchObjRectListAsync

import './eventDetail.styles.scss';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
  dialog: {
    position:'absolute',
    left: '50%',
    transform:'translateX(-50%)',
    minWidth: 1000,
    width: 600,
  },
  textField: {
    minWidth:300,
    borderLeft: '1px solid grey',
    marginLeft: 5,
    paddingLeft: 10,
  }
});

const formatDate = (dateStr='2021-03-02T20:23:10.000Z') => {
  //2021-03-12T20:23:10.000Z
  if(typeof dateStr === 'string' ){
    if(dateStr.split('T').length){
    return  dateStr.split('T')[1].slice(0,5) + '  (' + dateStr.split('T')[0] + ')';
  }
  }
  
  // return  dateStr.split('T')[1].slice(0,5) + '  (' + dateStr.split('T')[0] + ')';
  // console.log('dateStr',dateStr);
  return  '2021-03-12T20:23:10.000Z';
}
  
const EventDetail = ({ orgRow, fetchObjRectList,selectObjRect, isOpen, closeDetail }) => {
  // const [open, setOpen] = React.useState(false);
  const [userDataS, setUserDataS] = React.useState([]);
  const [currentIdEvent, setCurrentIDEvent] = React.useState(0);


  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const classes = useStyles();

 
  

  const selectEvent =(id) => {
    // console.log('select sss', id);
    setCurrentIDEvent(id);
  }
  const handleClose = () => {
    // setOpen(false);
    setUserDataS([]);
    setCurrentIDEvent(0);
    closeDetail();
  };
   
  const handleSave = () => {
    setUserDataS([]);
    setCurrentIDEvent(0);
    closeDetail();
    // handleClose();
  }; 

  // console.log('rere -- EventDetail -- selectObjRect'.selectObjRect); // undefined

  useEffect(() => {
    // console.log('orgRow.objID', orgRow.objID);
    if (orgRow.objID ){
      fetchObjRectList(orgRow.objID);
    }
     

  },[orgRow.objID,fetchObjRectList])

  useEffect(() => {
    setUserDataS(selectObjRect); 
    
  },[selectObjRect])
   


  //  if( !selectObjRect ) {
  //   console.log('!selectObjRect');
  //   return (<span>loading</span>)
  //  } 
  //  if( !orgRow ) {
  //   console.log('!orgRow');
  //   return (<span>loading</span>)
  //  } 

   let orgN = '';
   let objN = '';
   if (orgRow){
    // console.log('orgRow 222');
     if(orgRow.objName){
      // console.log('orgRow.objName');
      objN = orgRow.objName;
     }
     
     if(orgRow.organization){
      // console.log('orgRow.organization');
       if(orgRow.organization.orgname){
        orgN = orgRow.organization.orgname;
       }
     }
     
   }

   

  return (
    <div>
      {/* <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        dssdsd
      </Button> */}
      <Dialog
        classes={{ paper: classes.dialog}}
        fullScreen={fullScreen}
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
        aria-labelledby="responsive-dialog-title"
        style={{ marginLeft: 'auto',
          marginRight: 'auto',
          left: 0,
          right: 0}}
      >
        <DialogTitle id="responsive-dialog-title">{"Карточка объекта"}</DialogTitle>
        <DialogContent style={{ width: '100%'}}>
            <DialogContentText>
              <div style={{display:'flex',width:'100%'}}><div style={{width:200}}>объект:</div><div style={{color:'#f44336'}}>{objN}</div></div>
              <div style={{display:'flex',width:'100%'}}><div style={{width:200}}>Балансодержатель:</div><div style={{color:'blue'}}>{orgN}</div></div>
              {/* <div style={{display:'flex',width:'100%'}}><div style={{width:500, textAlign: 'center', borderTop:'1px solid red'}}>Таблица:</div></div> */}
            </DialogContentText>

            <div className="wrap-form">
            <div className="admin-list">

                <div className="admin-list__header header-tab">События объектов</div>
                    <List className="list-group"  style={{paddingLeft: '0px'}}>
                      {userDataS && userDataS
                      // .filter(userKey => (userKey !== 'id' && userKey !== 'password'))
                      .map((rec,index) => (
                        <ListItem  button onClick={() => selectEvent(index)} key={index}   style={{borderBottom:'1px solid grey', backgroundColor: index === currentIdEvent && 'rgb(123 119 119 / 11%)', color: rec.rec_taken ? 'blue':'red'}}   > {rec.rec_name}</ListItem>
                        // <li key={rec.rec_id} id={index} data-objectID={rec.rec_id}  className="list-group-item">{rec.rec_name} onClick={selectEvent} </li>
                      ))} 
                    </List>
                
            </div>
            <div data-detailID="1" className="admin-list-detail">

                <div className="admin-list-detail-activeCompany">
                    <div className="admin-list__header header-tab">Общие сведения по событию</div>

                    <table className="table table-hover" data-smegTabID="0">

                        <tbody>
                            {/* <tr>
                                <td>Комментарий</td>
                                <td data-objectDetails="comments">Проблемы пересечения границ</td>
                            </tr> */}
                            <tr>
                                <td  style={{color:'grey'}}>Дата создания</td>
                                {selectObjRect ? <td data-objectDetails="dataInit">{userDataS[currentIdEvent] ? formatDate(userDataS[currentIdEvent].rec_date) : '16.01.21'}</td>:'нет данных'}
                                
                            </tr>
                            <tr>
                                <td  style={{color:'grey'}}>Статус</td>
                                {selectObjRect ? <td data-objectDetails="dataInit">{userDataS[currentIdEvent] ? userDataS[currentIdEvent].rec_status : '2'}</td>:'нет данных'}
                                {/* <td data-objectDetails="dataInit">{userDataS[currentIdEvent] ? userDataS[currentIdEvent].rec_status : '2'}</td> */}
                            </tr>
                            <tr>
                                <td  style={{color:'grey'}}>Тип объекта</td>
                                {selectObjRect ? <td data-objectDetails="dataInit">{userDataS[currentIdEvent] ? userDataS[currentIdEvent].objType : '2'}</td> :'нет данных'}
                                {/* <td data-objectDetails="dataInit">{userDataS[currentIdEvent] ? userDataS[currentIdEvent].objType : '2'}</td> */}
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="admin-list-detail-activeCompany">
                    <div className="admin-list__header header-tab">Организация инициировала событие</div>

                    <table className="table table-hover" data-smegTabID="1">

                        <tbody>
                            <tr>
                                <td  style={{color:'grey'}}>организация</td>
                                {selectObjRect ? <td data-objectAccess="organization">{userDataS[currentIdEvent] ? userDataS[currentIdEvent].sender.orgname : 'УК Хорошовская'}</td> :'нет данных'}
                                {/* <td data-objectAccess="organization">{userDataS[currentIdEvent] ? userDataS[currentIdEvent].sender.orgname : 'УК Хорошовская'}</td> */}
                            </tr>
                            <tr>
                                <td  style={{color:'grey'}}>статус</td>
                                <td data-objectAccess="status">Представитель Балансодержателя</td>
                            </tr>
                            <tr>
                                <td  style={{color:'grey'}}>Адрес</td>
                                {selectObjRect ? <td data-objectAccess="contacts">{userDataS[currentIdEvent] ? userDataS[currentIdEvent].sender.username : 'УК Хорошовская'}</td> :'нет данных'}
                                {/* <td data-objectAccess="adres">ул. Хорошовское ш. 22</td> */}
                            </tr>
                            {/* <tr> */}
                                {/* <td  style={{color:'grey'}}>Контакты</td> */}
                                {/* <td data-objectAccess="adres">ул. Хорошовское ш. 22</td> */}
                                {/* {selectObjRect ? <td data-objectAccess="adres">ул. Хорошовское ш. 22</td> :'нет данных'} */}
                                {/* <td data-objectAccess="contacts">{userDataS[currentIdEvent] ? userDataS[currentIdEvent].sender.username : 'УК Хорошовская'}</td> */}
                            {/* </tr> */}
                        </tbody>
                    </table>
                </div>
 

                <div className="admin-list-detail-activeCompany">
                    <div className="admin-list__header header-tab">Организация ответчик события</div>

                    <table className="table table-hover" data-smegTabID="2">

                        <tbody>
                            <tr>
                                <td  style={{color:'grey'}}>организация</td>
                                {selectObjRect ? <td data-objectDetailsOtvetchikOrganization="organization">{userDataS[currentIdEvent] ? userDataS[currentIdEvent].receip.orgname : 'УК Хорошовская'}</td> :'нет данных'}
                                {/* <td data-objectDetailsOtvetchikOrganization="organization">{userDataS[currentIdEvent] ? userDataS[currentIdEvent].receip.orgname : 'УК Хорошовская'}</td> */}
                            </tr>
                            <tr>
                                <td  style={{color:'grey'}}>Объект</td>
                                {selectObjRect ? <td data-objectDetailsOtvetchikOrganization="adres">{userDataS[currentIdEvent] ? userDataS[currentIdEvent].receip.objname : 'УК Хорошовская'}</td> :'нет данных'}
                                {/* <td data-objectDetailsOtvetchikOrganization="adres">{userDataS[currentIdEvent] ? userDataS[currentIdEvent].receip.objname : 'УК Хорошовская'}</td> */}
                            </tr>
                            <tr>
                                <td  style={{color:'grey'}}>Контакты</td>
                                {selectObjRect ? <td data-objectDetailsOtvetchikOrganization="contacts">{userDataS[currentIdEvent] ? userDataS[currentIdEvent].receip.username : 'нет данных'}</td> :'нет данных'}
                                {/* <td data-objectDetailsOtvetchikOrganization="contacts">{userDataS[currentIdEvent] ? userDataS[currentIdEvent].receip.username : 'нет данных'}</td> */}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>


        </div>
        
        </DialogContent>
        <DialogActions style={{marginRight:15, justifyContent:'space-between'}} >
          {/* <Button autoFocus onClick={handleClose}  color="primary">
            Отмена
          </Button> */}
          <div style={{display:'flex',flexDirection:'column', alignItems:'flex-start', padding:'4px 15px'}} >
            <p>* красным цветом текст – заявка не взята ни одним оператором МГГТ. синим цветом – заявка была взята в разработку оператором МГГТ</p> 
          </div>
          <Button onClick={handleSave} color="primary" autoFocus style={{backgroundColor:'#3f51b5',color: '#fff' }} >
            Закрыть
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
  
const mapStateToProps = createStructuredSelector ({
  selectObjRect: selectObjRectPage, // события короткие данные для таблицы 
});

const mapDispatchToProps = (dispatch) => ({
  fetchObjRectList: (start,end) => dispatch(fetchObjRectListAsync(start,end)),
}); 
 
export default connect(mapStateToProps,mapDispatchToProps)(EventDetail);  