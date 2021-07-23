import { UserActionTypes, userData } from './user.types'; 
import {FetchData} from '../adminPanelTrest/adminPanelTrest.types';
import axios from "axios";

export const putDataUsersOnlineError = (errorMessage) => ({
  type: FetchData.GET_USERS_ONLINE_FAILURE,
  payload: errorMessage
});

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
}); 
///// for User Card Page 050521 //////////////////////////


export const setCurUserShort = user => ({
  type: userData.SET_USER_SHORT_CUR_FOR_USER_CARD_PAGE,
  payload: user
});

export const setCurUserAllData = user => ({
  type: userData.FETCH_USER_CURRENT_FOR_USER_CARD_DETAILS_PAGE,
  payload: user
});

export const setCurUserStatData = user => ({
  type: userData.FETCH_USER_STATS_FOR_USER_CARD_DETAILS_PAGE,
  payload: user
});

////////////////  for User Card Details Page Tab2 Active 210521 ///////////////////////////////////////

export const setErrorFetchUserData = erStr => ({
  type: userData.ERROR_FETCH_USER_DATA_CUR_FOR_USER_DETAILS_PAGE,
  payload: erStr
});

export const setRecTypeActive = type => ({
  type: userData.FILTER_USER_REC_TYPE_FOR_USER_ACTIVE_CARD_DETAILS_PAGE,
  payload: type
});

export const setFilterFieldObjActive = txt => ({
  type: userData.FILTER_USER_FIELD_FOR_USER_ACTIVE_CARD_DETAILS_PAGE,
  payload: txt
});

export const setFilterDateStartActive = date => ({
  type: userData.FILTER_USER_DATE_START_FOR_USER_ACTIVE_CARD_DETAILS_PAGE,
  payload: date
});

export const setFilterDateEndActive = date => ({
  type: userData.FILTER_USER_DATE_END_FOR_USER_ACTIVE_CARD_DETAILS_PAGE,
  payload: date
});

/////////////// for User Details Card Tab2 Actives 210521 ///////////////////////////////////

export const setErrorFetchUserDataAsync = (data)  =>   (dispatch) => {
          dispatch(setErrorFetchUserData(data));
};

export const setRecTypeActiveAsync = (data)  =>  (dispatch) => {
          dispatch(setRecTypeActive(data));
};

export const setFilterFieldObjActiveAsync = (data)  =>  (dispatch) => {
    dispatch(setFilterFieldObjActive(data));
};

export const setFilterDateStartActiveAsync = (data)  =>   (dispatch) => {
          dispatch(setFilterDateStartActive(data));
};


export const setFilterDateEndActiveAsync = (data)  =>  (dispatch) => {
          dispatch(setFilterDateEndActive(data));
};


/////////////// for User Card Page 050521 ///////////////////////////////////
export const setCurUserShortAsync = (data)  => (dispatch) => {
          dispatch(setCurUserShort(data));
};


/////////////////////////

async function postData(url = '', userID = '') {
  try {
    axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
    const response = await axios.post(url,{ userID: userID } );
    return response.data;
  } catch (e) {
    console.log(`😱 Axios request failed: ${e}`);
    return  'demo'; // parses JSON response into native JavaScript objects
  }

}


//290421 UsersPage page - TabOneMenu
export const fetchUserById = (userID)  => async (dispatch) => {
    try {
        let user = await postData('https://ismggt.ru/query/user/info', userID,'post') //work
        dispatch(setCurUserAllData(user));
        dispatch(setErrorFetchUserDataAsync(null));
    }catch (e) {
        dispatch(setErrorFetchUserDataAsync('no data user by id'));
    }

};


//180521 UsersPage page - TabOneMenu
export const fetchUserStatsAsyncLocal = (userId)  =>  async (dispatch) => {
    try {
        let userData = await postData('http://89.108.88.125:3005/query/user', userId,'post') //work
        // let userData = await postData('http://localhost:3005/query/user', userId,'post') //work
        if (userData === 'demo'){
            dispatch(setErrorFetchUserDataAsync('нет данных с сервера'));
        }else {
            dispatch(setCurUserStatData(userData));
            dispatch(setErrorFetchUserDataAsync(null));
        }
    }catch (e) {
        dispatch(setErrorFetchUserDataAsync('no data user by id'));
    }
};


//290421 UsersPage page - TabOneMenu
export const updateCurUserFullData = (userData)  =>  (dispatch) => {
          dispatch(setCurUserAllData(userData));
};








// Для страницы 2 отчетов "tab 3"
export const fetchCurrentUserAsyncOld = (id)  => {
  
  // return (dispatch) => {
  //   // postData(`http://localhost:3003/api/users/${id}`, {id:id})
  //   console.log('fetchCurrentUserAsync start',id);
  //   postData('http://localhost:3003/api/users', {'id':id})
  //     .then((user) => {
  //       return user.text();
  //       // console.log('fetchCurrentUserAsync user',js);
  //         // dispatch(setCurrentUser(user.name))
  //       })
  //       .then(data => dispatch(setCurrentUser(data.name)))
  //     .catch(error => dispatch(putDataUsersOnlineError(error.message)));
  // };
};


// fetch for App.tsx get logined user in this app
export const fetchCurrentUserAsync = (id)  => {
    // console.log('👉 fetchCurrentUserAsync start:' );
    // return (dispatch) => {
    //   postData('http://localhost:3003/api/users', {'id':id})
    //     .then((user) => {
    //         dispatch(setCurrentUser(user.name))
    //       })
    //     .catch(error => dispatch(putDataUsersOnlineError(error.message)));
    // };
};

// fetch for App.tsx get logined user in this app
// export const fetchCurrentUserAllDataAsync = (id)  => {
//   console.log('👉 fetchCurrentUserAllDataAsync start:' );
//   return (dispatch) => {
//     postData('http://localhost:3004/api/users', {'id':id})
//       .then((user) => {
//           dispatch(setCurUserAllData(user))
//         })
//       .catch(error => dispatch(putDataUsersOnlineError(error.message)));
//   };
// };
