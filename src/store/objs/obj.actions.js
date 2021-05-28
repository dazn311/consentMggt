import { objData } from './obj.types';
import {FetchData} from '../adminPanelTrest/adminPanelTrest.types';
// import axios from "axios";

export const putDataUsersOnlineError = (errorMessage) => ({
  type: FetchData.GET_USERS_ONLINE_FAILURE,
  payload: errorMessage
});

export const setCurrentObj = obj => ({
  type: objData.SET_OBJ_CURRENT_FOR_OBJ_CARD_PAGE,
  payload: obj
}); 
///// for User Card Page 050521 //////////////////////////


export const setCurrentFilterSender = filter => ({
  type: objData.SET_FILTER_SENDER_FOR_OBJ_CARD_PAGE,
  payload: filter
});

export const setCurrentFilterOwn = filter => ({
  type: objData.SET_FILTER_OWN_FOR_OBJ_CARD_PAGE,
  payload: filter
});

export const setCurrentDateStart = date => ({
  type: objData.SET_FILTER_DATE_START_FOR_OBJ_CARD_PAGE,
  payload: date
});

export const setCurrentDateEnd = date => ({
  type: objData.SET_FILTER_DATE_END_FOR_OBJ_CARD_PAGE,
  payload: date
});




/////////////// for Obj Card Page 170521 ///////////////////////////////////

export const setCurObjAsync = (obj)  => {
  // console.log('👉 setCurUserShortAsync start:' );
  return (dispatch) => { 
          dispatch(setCurrentObj(obj));
  };
};

export const setCurFilterSenderAsync = (filter)  => {
  // console.log('👉 setCurUserShortAsync start:' );
  return (dispatch) => {
          dispatch(setCurrentFilterSender(filter));
  };
};

export const setCurFilterOwnAsync = (filter)  => {
  // console.log('👉 setCurUserShortAsync start:' );
  return (dispatch) => {
          dispatch(setCurrentFilterOwn(filter));
  };
};

export const setCurDateStartAsync = (date)  => {
  // console.log('👉 setCurUserShortAsync start:' );
  return (dispatch) => {
          dispatch(setCurrentDateStart(date));
  };
};

export const setCurDateEndAsync = (date)  => {
  // console.log('👉 setCurUserShortAsync start:' );
  return (dispatch) => {
          dispatch(setCurrentDateEnd(date));
  };
};

/////////////////////////

// async function postData(url = '', userID = '') {
//
//   try {
//     axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
//     const response = await axios.post(url,
//       { userID: userID },
//       {'Content-Type': 'application/x-www-form-urlencoded', 'mode': 'cors'});
//
//     return response.data;
//   } catch (e) {
//     console.log(`😱 Axios request failed: ${e}`);
//   }
//
//   return  'demo'; // parses JSON response into native JavaScript objects
// }

// fetch for App.js get logined user in this app
// export const fetchCurrentUserAsync = (id)  => {
  // console.log('👉 fetchCurrentUserAsync start:' );
  // return (dispatch) => {
  //   postData('http://localhost:3003/api/users', {'id':id})
  //     .then((user) => {
  //         dispatch(setCurrentUser(user.name))
  //       })
  //     .catch(error => dispatch(putDataUsersOnlineError(error.message)));
  // };
// };

// fetch for App.js get logined user in this app
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



