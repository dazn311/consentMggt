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

export const activeObjDataOfAuthUserSelector = createSelector(
  [consentSelector],
    consRed => consRed.activeObjDataOfAuthUser
);
export const updateObjsDataOfAuthUserSelector = createSelector(
  [consentSelector],
    consRed => consRed.updateObjsDataOfAuthUser
);











// export const selectCurrentObj2 = createSelector(
//     [selectAdmin, selectObjFilterSender],
//     selectAdmin => selectAdmin.objRect.data.recs.filter(rec => rec.sender.orgname.includes(selectObjFilterSender))
// );
//
//
// export const selectObjList = createSelector(
//     [selectAdmin, selectFilterFieldObjs],
//     (selectAdmin, selectFilterFieldObjs) => selectAdmin.obj.objs.filter(obj => obj.obj_name.includes(selectFilterFieldObjs))
// );

//
// export const selectCurrentObj = createSelector(
//     [selectAdmin, selectObj],
//     (selectAdmin, selectObj) => {
//         if (selectAdmin.objRect.data ){
//             if ( selectAdmin.objRect.data.recs && selectAdmin.objRect.data.recs.length  ) {
//                     let filter01 = [];
//                     let filter02 = [];
//                     const filter0 = selectAdmin.objRect.data.recs.filter(elem => {
//                         const recDate = new Date(elem.rec_date);
//                         const startDate = new Date(selectObj.curObjFilterDateStart);
//                         const endDate = new Date(selectObj.curObjFilterDateEnd + 'T23:23');
//
//                         return recDate >= startDate && recDate <= endDate && elem
//                     });
//
//                     const filter11 = filter0.filter(elem => (elem.sender.objname || '').toLowerCase().includes(selectObj.curObjFilterSender));
//                     const filter12 = filter0.filter(elem => (elem.sender.orgname || '').toLowerCase().includes(selectObj.curObjFilterSender));
//                     const filter13 = filter0.filter(elem => (elem.sender.username || '').toLowerCase().includes(selectObj.curObjFilterSender));
//
//                     if (filter11.length) {
//                         filter01 = filter11;
//                     } else if (filter12.length) {
//                         filter01 = filter12;
//                     } else if (filter13.length) {
//                         filter01 = filter13
//                     }
//
//                     if (filter01.length) {
//                         const filter21 = filter01.filter(elem => (elem.receip.objname || '').toLowerCase().includes(selectObj.curObjFilterOwn));
//                         const filter22 = filter01.filter(elem => (elem.receip.orgname || '').toLowerCase().includes(selectObj.curObjFilterOwn));
//                         const filter23 = filter01.filter(elem => (elem.receip.username || '').toLowerCase().includes(selectObj.curObjFilterOwn));
//
//                         if (filter21.length) {
//                             filter01 = filter21;
//                         } else if (filter22.length) {
//                             filter01 = filter22;
//                         } else if (filter23.length) {
//                             filter01 = filter23
//                         }
//
//                         if (filter21.length === 0 && filter22.length === 0 && filter23.length === 0) {
//                             return []
//                         } else {
//                             return filter01
//                         }
//                     }
//         }
//         }else { return []; }
//     }
// )





