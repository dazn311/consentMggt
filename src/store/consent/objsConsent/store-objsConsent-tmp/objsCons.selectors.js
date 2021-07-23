import { createSelector } from 'reselect';

const stateCons = state => state.consRed;

///////////// FOR OBJ Card Details page//////////////
export const errorFetchUserDataSelector = createSelector(
  [stateCons],
    consRed => consRed.errorFetchUserData
);
export const errorFetchObjsDataSelector = createSelector(
  [stateCons],
    consRed => consRed.errorFetchObjsData
);

export const userOfAuthDataSelector = createSelector(
  [stateCons],
    consRed => consRed.userOfAuthData
);
export const orgDataOfAuthUserSelector = createSelector(
  [stateCons],
    consRed => consRed.orgDataOfAuthUser
);
export const objsDataOfAuthUserSelector = createSelector(
  [stateCons],
    consRed => consRed.objsDataOfAuthUser
);

export const curObjIdSelector = createSelector(
  [stateCons],
    consRed => consRed.curObjId
);

export const activeRelIdSelector = createSelector(
  [stateCons],
    consRed => consRed.activeObjAndRel[1].id
);
//
// export const activeRelIdSelector = createSelector(
//   [stateCons],
//     consRed => consRed.activeRelId
// );

export const activeObjAndRelSelector = createSelector(
  [stateCons],
    consRed => consRed.activeObjAndRel
);

//
// export const fullDataOfActiveObForMapForRelativesSelector = createSelector(
//   [stateCons,curObjIdSelector],
//     (consRed,curObjId) => {
//       if(consRed.objectsData){
//           if (consRed.objectsData.length) {
//               return consRed.objectsData[curObjId]
//           }
//       }else {
//           return null
//       }
//
//     }
// );

export const fullDataOfActiveObForMapForRelativesSelector = createSelector(
  [stateCons,activeObjAndRelSelector],
    (consRed,curObjId) => {
      if(consRed.objectsData){
          if (consRed.objectsData.length) {
              return consRed.objectsData[curObjId[0].id ]
          }
      }else {
          return null
      }

    }
);

//// 29.06.21 ////
export const selectedObjSelector = createSelector(
    [stateCons],
    consRed => consRed.activeObjAndRel[0].id)

const getListObjects = createSelector(
    [stateCons,selectedObjSelector],
    (consRed,selectedObj) => {
        if(consRed.objectsData){
            if (consRed.objectsData.length) {
                return consRed.objectsData[selectedObj]
            }
        }else {
            return null
        }

    }
);

export default getListObjects;
//// end 29.06.21 ////


export const relFullDataOfActiveObjSelector = createSelector(
  [stateCons,activeObjAndRelSelector],
    (consRed,curObjId) => {
      if(consRed.objectsData){
          if (consRed.objectsData.length) {
              return consRed.objectsData[curObjId[1].id ]
          }
      }else {
          return null
      }

    }
);

//
// export const relFullDataOfActiveObjSelector = createSelector(
//   [stateCons,activeRelIdSelector],
//     (consRed,curObjId) => {
//       if(consRed.objectsData){
//           if (consRed.objectsData.length) {
//               return consRed.objectsData[curObjId]
//           }
//       }else {
//           return null
//       }
//
//     }
// );

export const bndRelActiveObjSelector = createSelector(
  [stateCons,activeRelIdSelector],
    (consRed,curObjId) => {
      if(consRed.objectsData){
          if (consRed.objectsData.length) {
              return consRed.objectsData[curObjId].obj_bounds
          }
      }else {
          return null
      }

    }
);

/// for Rel list items For Consent page
export const relListShortDataSelector = createSelector(
    [stateCons,curObjIdSelector],
    (consRed,curObjId) => {
        if(consRed.objectsData){
            if (consRed.objectsData.length) {
                // console.log('22 consRed...obj_relatives',consRed.objectsData[curObjId].obj_relatives)
                return consRed.objectsData[curObjId] ? consRed.objectsData[curObjId].obj_relatives : []
            }
        }else {
            return null
        }
    }
);

export const relDataArrSelector = createSelector(
    [stateCons],
    consRed => consRed.relData
);
///////////////////////////////////////

export const dataOfObjsForListSelector = createSelector(
  [stateCons],
    consRed => consRed.dataOfObjsForList
);

//activeRelIdSelector
export const objsDataSelector = createSelector(
  [stateCons],
    consRed => consRed.objectsData
);

export const objDataFromLocalAPISelector = createSelector(
  [stateCons],
    consRed => consRed.objDataFromLocalAPI
);

export const objRelativesSelector = createSelector(
  [stateCons],
    consRed => consRed.objRelatives
);


export const eventsActiveObjSelector = createSelector(
  [stateCons],
    (consRed) => consRed.eventsActiveObj //activeObj.objID
);

export const recsDataSelector = createSelector(
  [stateCons],
    (consRed) => {
      return consRed.eventsActiveObj ? consRed.eventsActiveObj.data.recs : []
    } //activeObj.objID
);

export const visibleEventsObjSelector = createSelector(
  [stateCons],
    (consRed) => consRed.visibleEventsObj //activeObj.objID
);


//////////////for event block /////////////

//curObjId: null, // выделенный объект - выбранный пользователем /consent page 270521
//     activeRelId: null, // выделенный объект - выбранный пользователем /consent page 270521


