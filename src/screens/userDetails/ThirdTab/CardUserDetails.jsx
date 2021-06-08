import React, { useEffect }  from 'react';

import { useHistory } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import generator from 'generate-password';

import { makeStyles, useTheme } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Fab from '@material-ui/core/Fab';
import Switch from '@material-ui/core/Switch';

import EditIcon from '@material-ui/icons/Edit';

import CheckBox from '../../../components/checkBox/CheckBox'; 
import DialogSetDate from '../../../components/dialogSetDate/DialogSetDate'; 
import { LoginField, PostField, TxtField, MailField, PhoneField, RoleField, PasswordField } from '../../../components/tabcells/TabCells';
import { refPhoneNumber } from '../../../hoc/refPhoneNumber';

import { selectAllOrgFromUsersDb } from '../../../store/adminPanelTrest/adminPanelTrest.selectors';
import { updateCurUserFullData } from '../../../store/user/user.actions';

const useStyles = makeStyles((theme) => ({
  root: {
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
  input: {
    "&::selection": {
      backgroundColor: "lightgreen",
      color: "red"
    }
  }
}));
// curUser={curUser} objRect={selectObjRect}


const EditBtn = () => (<Fab color="secondary" size='small' aria-label="edit">
<EditIcon fontSize='small' />
</Fab>);



const SwitchBtn = ({handleChange, state}) => (<Switch
    checked={state.checkedA}
    onChange={handleChange}
    name="checkedA"
    inputProps={{ 'aria-label': 'secondary checkbox' }}
  />);

const userLoginInitial = (userName) => {
    return userName ? userName.split(' ')[0]: 'Пользователь'

}

/////////////////////////////////////////////////////

const CardUserDetails = ({ curUser, selectAllOrgFromUsers, userData, updateCurUserData, userAllStatsData }) => {
    const [state, setState] = React.useState(selectAllOrgFromUsers);


    const [userID, setUserID] = React.useState(curUser.user_id);
    const [userName, setUserName] = React.useState(curUser.user_name);
    const [userShortName, setUserShortName] = React.useState(curUser.user_name);

    const [orgID, setOrgID] = React.useState(0);
    const [org, setOrg] = React.useState(selectAllOrgFromUsers[0]);

    const [userRole, setUserRole] = React.useState(curUser.user_role);
    const [userPost, setUserPost] = React.useState(curUser.user_post);
    const [userLogin, setUserLogin] = React.useState(userLoginInitial(curUser.user_shortname));
    const [userPassword, setUserPassword] = React.useState('');
    const [userTel, setUserTel] = React.useState('+7 (925) 789-12-25');
    const [userMail, setUserMail] = React.useState('ShmidtDU@mos.ru');
    const [userStatus, setUserStatus] = React.useState('false');
    const [userLastSeen, setUserLastSeen] = React.useState("2021-01-01T10:29:21.916Z");

    const [ userEndDate, setUserEndDate] = React.useState('2021-09-28'); // дата окончания регистрации

    // const [textS, setTextS] = React.useState('');
    const [checkS, setCheckS] = React.useState({checkedA: false, checkedB: true, });

    const classes = useStyles();
    const curTheme = useTheme();
    const history = useHistory();
    //   curTheme.palette.primary.main

    const updateUserData = () => {


        setTimeout(() => {
            const newData = [
                {
                    "user_id": userID,
                    "user_name": userName,
                    "user_login": userLogin,
                    "user_password": userPassword,
                    "user_status": userStatus ? 'Аккаунт активен': 'Аккаунт не активен',
                    "user_shortname": userShortName,
                    "user_org_id": orgID,
                    "org_name": org,
                    "user_role": userRole,
                    "user_post": userPost,
                    "user_email": userMail,
                    "user_tel": userTel,
                    "user_reg_date": userData.user_reg_date || "2021-01-01T13:13:48.537Z",
                    "user_end_date": userEndDate + "T19:19:48.537Z",
                    "user_last_seen": userLastSeen
                }
            ];
            updateCurUserData(newData)
        },500);


    }
    
      const setUserDateActive = (event) => {
          setUserEndDate( event.toLocaleString().split(',')[0] );
      };

      const changeUserName = (event) => {
          setUserName( event.target.value );
      };

      const changeUserShortName = (event) => {
          setUserShortName( event.target.value );
      };

      const changeUserRole = (event) => {
          setUserRole( event.target.value );
      };


      const changeUserPost = (event) => {
          setUserPost( event.target.value );
      };
      const changeUserLogin = (event) => {
          setUserLogin( event.target.value );

      };
      const changeUserPassword = (event) => {
          setUserPassword( event.target.value );
      };

      const changeUserTel = (event) => {
          setUserTel( event.target.value );
      };
      const changeUserMail = (event) => {
          setUserMail( event.target.value );
      };


      const handleChangeOrg = (event) => {
        const name = event.target.name;
        setOrg( event.target.value );
      };

      const handleChange = (event) => {
        const name = event.target.name;
        setState({
          ...state,
          [name]: event.target.value,
        });
      };

      const handleChangeCheck = (event) => {
        setCheckS({ ...state, [event.target.name]: event.target.checked });
          // console.log('event.target.name',event.target.checked)
          if (!event.target.checked){
              updateUserData();
          }

      };

      // const changeText = (event) => {
      //   setTextS( event.target.value );
      // };

      const genPassWord = (event) => {
          let password2 = generator.generate({
              length: 10,
              numbers: true
          });
          setUserPassword(password2);
      };
   
    let password = generator.generate({
        length: 10,
        numbers: true
    });

    const setChecked = (status) => {
        setUserStatus(status);
    }




    useEffect(() => {

        if (userData && userData !== {}){
            // console.log('9999 userData',userData)
            const {  user_role, user_status, user_email, user_tel, user_reg_date, user_end_date, user_last_seen, user_org_id, org_name, user_shortname } = userData ;
            setUserShortName(user_shortname);
            setUserTel(refPhoneNumber(user_tel));
            setUserMail(user_email);
            setOrgID(user_org_id);
            setOrg(org_name);
            setUserEndDate((user_end_date || '2021-01-01T15:15').split('T')[0]);
            if ( user_status === 'Аккаунт активен'){
                setUserStatus(true);
            }
            setUserLastSeen(user_last_seen);
            setUserRole(user_role);
        }else {
            history.push({
                pathname: '/stats/users'
            })
        }

    },[userData]);

    useEffect(() => {

        if (userData && userData !== {}){
            // console.log('9999 userData',userData)
            const {  user_role, user_status, user_email, user_tel, user_reg_date, user_end_date, user_last_seen, user_org_id, org_name, user_shortname } = userData ;
            setUserShortName(user_shortname);
            if(userAllStatsData && userAllStatsData.user){
                setUserLogin(userAllStatsData.user.login)
            }

            setUserTel(refPhoneNumber(user_tel));
            setUserMail(user_email);
            setOrgID(user_org_id);
            setOrg(org_name);
            setUserEndDate((user_end_date || '2021-01-01T15:15').split('T')[0]);
            if ( user_status === 'Аккаунт активен'){
                setUserStatus(true);
            }
            setUserLastSeen(user_last_seen);
            setUserRole(user_role);
        }else {
            history.push({
                pathname: '/stats/users'
            })
        }

    },[userAllStatsData]);


    let newArr = [];

    function onlyUnique(value, index, self) {
        if(self.indexOf(value) < index){
            newArr.push(value);
        }
        return self.indexOf(value) === index;
    }

    // if (state){
    //     let lenOrg = state.length;
    //     console.log('lenOrg',lenOrg)
    //
    //     let unique = state.filter(onlyUnique);
    //     console.log('unique',unique);
    // }

  return (
    <div className="row">
        <div className="col-md-5">
            <div className="panel">
                <div className="panel-heading">
                    <span className={classes.panelTitle}> Редактировать организацию</span>
                </div>
                <div className="panel-body pn">
                    <table >
                        <thead>
                            <tr  className="hidden">
                                <th className="mw30"></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>Организация</td>
                                <td> 
                                <Select
                                    native
                                    value={org}
                                    onChange={handleChangeOrg}
                                    >
                                    {state.filter(onlyUnique).map((el, index) => <option key={index} value={el}>{el}</option>)}
                                    </Select>
                                </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Вышесоящия</td>
                                <td>
                                    <Select
                                    native
                                    disabled
                                    value={org}
                                    onChange={handleChangeOrg}
                                    >
                                    {state.map((el, index) => <option key={index} value={el}>{el}</option>)}
                                    </Select>
                                </td>
                            </tr> 
                             
                            
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="panel">
                <div className="panel-heading">
                    <span className={classes.panelTitle}> Редактировать общие данные <SwitchBtn handleChange={handleChangeCheck} state={checkS} /> </span>
                </div>
                <div className="panel-body pn">
                    <table >
                        <thead>
                            <tr className="hidden">
                                <th className="mw30"></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>Ф.И.О.</td>
                                <td> 
                                    <TxtField changeText={changeUserName} dis={!checkS.checkedA} txt={userName} />
                                    </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>ФИО</td>
                                <td>
                                    <TxtField changeText={changeUserShortName} dis={!checkS.checkedA} txt={userShortName} />
                                    </td>
                            </tr>
                             <tr>
                                <td></td>
                                <td>Должность</td>
                                <td> 
                                    <PostField changeText={changeUserPost} dis={!checkS.checkedA} txt={userPost} />
                                    </td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Логин: </td>
                                <td> <LoginField changeText={changeUserLogin} dis={!checkS.checkedA} txt={userLogin} /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Пароль: </td>
                                <td style={{display:'flex'}} >
                                    <PasswordField changeText={changeUserPassword} dis={!checkS.checkedA} txt={userPassword} genPassWord={genPassWord} />
                                </td>
                            </tr>
                            <tr >
                                <td></td>
                                <td style={{borderTop:'1px solid #5f5f5f'}}>телефон</td>
                                <td>  <PhoneField changeText={changeUserTel} dis={!checkS.checkedA} txt={userTel} /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Почта</td>
                                <td>  <MailField changeText={changeUserMail} dis={!checkS.checkedA} txt={userMail} /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>Роль</td>
                                <td>  <RoleField changeText={changeUserRole} dis={!checkS.checkedA} txt={userRole} /></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="panel">
                <div className="panel-heading">
                    <span className={classes.panelTitle}>Продление подписки</span>
                </div>
                <div className="panel-body pn">
                    <table >
                        <thead>
                            <tr className="hidden">
                                <th className="mw30"></th>
                                <th></th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td></td>
                                <td>Активировать</td>
                                <td> <CheckBox checked={userStatus} setChecked={setChecked} /></td>
                            </tr>
                            <tr>
                                <td>  </td>
                                <td>Действует до: </td>
                                <td>  <DialogSetDate selectedDate={userEndDate} setSelectedDate={setUserDateActive} caption={userEndDate} /> </td>
                            </tr> 
                        </tbody>
                    </table>
                </div>
            </div>
             
        </div>
    </div>
  );
}

 
const mapStateToProps = createStructuredSelector ({
    selectAllOrgFromUsers: selectAllOrgFromUsersDb, // события короткие данные для таблицы
  });


const mapDispatchToProps = (dispatch) => ({
  updateCurUserData: (start,end) => dispatch(updateCurUserFullData(start,end)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardUserDetails);