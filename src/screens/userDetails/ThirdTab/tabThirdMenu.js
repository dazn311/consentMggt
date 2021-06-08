import React, {useEffect, useState} from 'react';
 

import { useHistory, useRouteMatch } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
   

// import { selectObjRectPage } from '../../../store/adminPanelTrest/objsPage.selectors';
// import { selectUserById } from '../../../store/adminPanelTrest/adminPanelTrest.selectors';
import { selectCurrentUserShort, selectCurrentUserAllData, selectUserAllStatsData } from '../../../store/user/user.selectors';

import './tabOneMenu.styles.scss';
import CartGenInfo from './CardGenInfo';
// import CardEventInfo from './CardEventInfo';
import CardUserDetails from './CardUserDetails';
// import { id } from 'date-fns/locale';
 
 
  
const TabThirdMenu = ({ idUser,selectCurrentUserShort, allData ,   orgRow,  isOpen=false, userAllStatsData }) => {

    const [userData, setUserData] = useState({});

    useEffect(() => {
        // console.log(' allData', allData);
        setUserData(allData);


    },[allData])


    const match = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        history.push({
            pathname: `${match.url}/edit`
        })
    },[])

    // console.log('allData',allData)
    // console.log('userAllStatsData',userAllStatsData)
    return (
        <div style={{display:'flex',flexDirection: window.innerWidth < 500 ? 'column' : 'row', justifyContent:'start', maxWidth: window.innerWidth < 500 ? 380: 700 }} >
            <div  style={{boxShadow: '1px solid #e4dfdf2e',margin: window.innerWidth < 500 ? '0' :'10px', minWidth: 360, width: window.innerWidth < 500 ? '100%': 400,  border: '1px solid #e2e2e2',
                height: 'fit-content'}} >
                <CartGenInfo curUser={selectCurrentUserShort} userData={userData} ></CartGenInfo>
            </div>

            <div  style={{boxShadow: '1px solid #e4DFDF2e',margin: window.innerWidth < 500 ? '0' : '5px' , width: window.innerWidth < 500 ? '100%': 600}} >
                <CardUserDetails curUser={selectCurrentUserShort} userData={userData} userAllStatsData={userAllStatsData} ></CardUserDetails>
            </div>


        </div>
    );
}

const mapStateToProps = createStructuredSelector ({
  selectCurrentUserShort: selectCurrentUserShort, // события короткие данные для таблицы
  allData: selectCurrentUserAllData, // события короткие данные для таблицы
    userAllStatsData: selectUserAllStatsData, // события короткие данные для таблицы
});

export default connect(mapStateToProps)(TabThirdMenu);



 
