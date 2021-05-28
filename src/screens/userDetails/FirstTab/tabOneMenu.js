import React, { useEffect } from 'react'; 
 

import { useHistory, useRouteMatch } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
   

import { selectCurrentUserShort, selectCurrentUserAllData, selectUserAllStatsData } from '../../../store/user/user.selectors';
import { fetchUserStatsAsyncLocal } from '../../../store/user/user.actions';

import './tabOneMenu.styles.scss';
import CartGenInfo from './CardGenInfo';
import CardUserDetails from './CardUserDetails';
import { id } from 'date-fns/locale';
 
 
  
const TabOneMenu =  ({ selectCurrentUserShort, selectCurrentUserAllData,  orgRow,  isOpen=false, fetchUserStat, selectUserAllStats }) => {
    const match = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        if (selectCurrentUserShort && selectCurrentUserShort.user_id){
                fetchUserStat(selectCurrentUserShort.user_id);
        }

        history.push({
            pathname: `${match.url}/info`
        })

    },[])

    // console.log('333 selectCurrentUserAllData',selectCurrentUserAllData)
    //org_name: "ГБУ \"Жилищник района Чертаново Северное\""
    // user_email: "reno731mega@yandex.ru"
    // user_end_date: "2022-03-09T13:30:42.882Z"
    // user_id: 677
    // user_last_seen: "2021-05-25T07:18:35.114Z"
    // user_name: "Абдуллин Дамир Ильдарович"
    // user_org_id: 164
    // user_post: "Специалист"
    // user_reg_date: "2021-03-09T13:30:42.882Z"
    // user_role: "Пользователь"
    // user_shortname: "Абдуллин Д.И."
    // user_status: "Аккаунт активен"
    // user_tel: "8-985-912-23-39"

    return (
        <div style={{display:'flex',flexDirection: window.innerWidth < 500 ? 'column' : 'row', justifyContent:'start'}} >
            <div  style={{boxShadow: '1px solid #e4dfdf2e',margin: window.innerWidth < 500 ? '0' :'10px', minWidth: 300, width: window.innerWidth < 500 ? '100%': 400,  border: '1px solid #e2e2e2',
                height: 'fit-content'}} >
                <CartGenInfo curUser={selectCurrentUserShort} allData={selectCurrentUserAllData}  ></CartGenInfo>
            </div>
            <div  style={{boxShadow: '1px solid #e4DFDF2e',margin: window.innerWidth < 500 ? '0' : '5px', minWidth: 300, width: window.innerWidth < 500 ? '100%': 500}} >
                <CardUserDetails curUser={selectCurrentUserShort} allData={selectCurrentUserAllData} selectUserAllStats={selectUserAllStats} ></CardUserDetails>
            </div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector ({
  selectCurrentUserShort: selectCurrentUserShort, // события короткие данные для таблицы  
    selectUserAllStats: selectUserAllStatsData, // события короткие данные для таблицы
    selectCurrentUserAllData: selectCurrentUserAllData, // события короткие данные для таблицы
});

const mapDispatchToProps = (dispatch) => ({
    fetchUserStat: (userId) => dispatch(fetchUserStatsAsyncLocal(userId)),
});
 
export default connect(mapStateToProps, mapDispatchToProps)(TabOneMenu);