import { createSelector } from 'reselect';

const consentSelector = state => state.consRed;

///////////// FOR OBJ Card Details page//////////////
export const errorFetchUserDataSelector = createSelector(
  [consentSelector],
    consRed => consRed.errorFetchUserData
);
export const errorFetchObjsDataSelector = createSelector(
  [consentSelector],
    consRed => consRed.errorFetchObjsData
);

export const userOfAuthDataSelector = createSelector(
  [consentSelector],
    consRed => consRed.userOfAuthData
);
export const orgDataOfAuthUserSelector = createSelector(
  [consentSelector],
    consRed => consRed.orgDataOfAuthUser
);
export const objsDataOfAuthUserSelector = createSelector(
  [consentSelector],
    consRed => consRed.objsDataOfAuthUser
);

export const curObjIdSelector = createSelector(
  [consentSelector],
    consRed => consRed.curObjId
);

export const activeRelIdSelector = createSelector(
  [consentSelector],
    consRed => consRed.activeObjAndRel[1].id
);
//
// export const activeRelIdSelector = createSelector(
//   [consentSelector],
//     consRed => consRed.activeRelId
// );

export const activeObjAndRelSelector = createSelector(
  [consentSelector],
    consRed => consRed.activeObjAndRel
);

//
// export const fullDataOfActiveObForMapForRelativesSelector = createSelector(
//   [consentSelector,curObjIdSelector],
//     (consRed,curObjId) => {
//       if(consRed.objsData){
//           if (consRed.objsData.length) {
//               return consRed.objsData[curObjId]
//           }
//       }else {
//           return null
//       }
//
//     }
// );

export const fullDataOfActiveObForMapForRelativesSelector = createSelector(
  [consentSelector,activeObjAndRelSelector],
    (consRed,curObjId) => {
      if(consRed.objsData){
          if (consRed.objsData.length) {
              return consRed.objsData[curObjId[0].id ]
          }
      }else {
          return null
      }

    }
);

export const relFullDataOfActiveObjSelector = createSelector(
  [consentSelector,activeObjAndRelSelector],
    (consRed,curObjId) => {
      if(consRed.objsData){
          if (consRed.objsData.length) {
              return consRed.objsData[curObjId[1].id ]
          }
      }else {
          return null
      }

    }
);
//
// export const relFullDataOfActiveObjSelector = createSelector(
//   [consentSelector,activeRelIdSelector],
//     (consRed,curObjId) => {
//       if(consRed.objsData){
//           if (consRed.objsData.length) {
//               return consRed.objsData[curObjId]
//           }
//       }else {
//           return null
//       }
//
//     }
// );

export const bndRelActiveObjSelector = createSelector(
  [consentSelector,activeRelIdSelector],
    (consRed,curObjId) => {
      if(consRed.objsData){
          if (consRed.objsData.length) {
              return consRed.objsData[curObjId].obj_bounds
          }
      }else {
          return null
      }

    }
);

/// for Rel list items For Consent page
export const relListShortDataSelector = createSelector(
    [consentSelector,curObjIdSelector],
    (consRed,curObjId) => {
        if(consRed.objsData){
            if (consRed.objsData.length) {
                // console.log('22 consRed...obj_relatives',consRed.objsData[curObjId].obj_relatives)
                return consRed.objsData[curObjId] ? consRed.objsData[curObjId].obj_relatives : []
            }
        }else {
            return null
        }

    }
);

export const relDataArrSelector = createSelector(
    [consentSelector],
    consRed => consRed.relData
);
///////////////////////////////////////

export const dataOfObjsForListSelector = createSelector(
  [consentSelector],
    consRed => consRed.dataOfObjsForList
);

//activeRelIdSelector
export const objsDataSelector = createSelector(
  [consentSelector],
    consRed => consRed.objsData
);

export const objDataFromLocalAPISelector = createSelector(
  [consentSelector],
    consRed => consRed.objDataFromLocalAPI
);

export const objRelativesSelector = createSelector(
  [consentSelector],
    consRed => consRed.objRelatives
);


export const eventsActiveObjSelector = createSelector(
  [consentSelector],
    (consRed) => consRed.eventsActiveObj //activeObj.objID
);

export const recsDataSelector = createSelector(
  [consentSelector],
    (consRed) => {

      return consRed.eventsActiveObj ? consRed.eventsActiveObj.data.recs : []
    } //activeObj.objID
);

export const visibleEventsObjSelector = createSelector(
  [consentSelector],
    (consRed) => consRed.visibleEventsObj //activeObj.objID
);


//////////////for event block /////////////

//curObjId: null, // выделенный объект - выбранный пользователем /consent page 270521
//     activeRelId: null, // выделенный объект - выбранный пользователем /consent page 270521


