import { createSelector } from 'reselect';

const selectUser = state => state.curUser;
const selectCurUserShort = state => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  curUser => curUser
);

export const selectErrorFetchUserData = createSelector(
  [selectCurUserShort],
  user => user.errorFetchUserData
);


export const selectCurrentUserShort = createSelector(
  [selectCurUserShort],
  user => user.curUserShort
);

export const selectCurrentUserAllData = createSelector(
  [selectCurUserShort],
  user => user.curUserAllData[0]
);


export const selectFilterRecStatus = createSelector(
    [selectCurUserShort],
    user => user.filterRecStatus
);

export const selectFilterFieldRecObj = createSelector(
    [selectCurUserShort],
    user => user.filterFieldObj
);

export const selectFilterRecDateStart = createSelector(
    [selectCurUserShort],
    user => user.filterRecDateStart
);

export const selectFilterRecDateEnd = createSelector(
    [selectCurUserShort],
    user => user.filterRecDateEnd
);

export const selectUserAllStatsData = createSelector(
  [selectCurUserShort],
  user => user.curUserStatsData
);

export const selectUserActiveStatsData = createSelector(
  [selectCurUserShort],
  user => user.curUserStatsData.resUserActives
);

export const selectUserActiveData = createSelector(
  [selectUserActiveStatsData, selectFilterRecStatus,selectFilterFieldRecObj, selectFilterRecDateStart, selectFilterRecDateEnd],
    (selectUserActiveStatsData, selectFilterRecStatus, selectFilterFieldRecObj, selectFilterRecDateStart, selectFilterRecDateEnd) => {

      if (!selectUserActiveStatsData) {
          return []
      }

      const formatDate = (data) => {
          let newDate = data.split('-');
          return newDate[2] + '.' + newDate[1] + '.' + newDate[0];
      }

        let endDate = new Date(selectFilterRecDateEnd).toISOString();
        endDate = endDate.split('T')[0] + 'T23:23:23.296Z';
        let endDatePlusEndDay = new Date(endDate);

        let selectUserActiveStatsData2 = []

        const newFilterDateStart = selectUserActiveStatsData.filter(rec =>
            ((new Date(rec.rec_date)) >= (new Date(selectFilterRecDateStart)  )
                && (new Date(rec.rec_date)) <= endDatePlusEndDay )    );
        // console.log('778 8 newFilterDateStart',newFilterDateStart);

        if (newFilterDateStart.length){
            selectUserActiveStatsData2 =  newFilterDateStart;
        } else {
            return [{
                rec_date: selectFilterRecDateStart + 'T01:01:01.296Z',
                rec_date_interval: formatDate(selectFilterRecDateStart) + ' - ' + formatDate(selectFilterRecDateEnd),
                rec_descrip: "Нет данных в этот период",
                rec_name: "Нет данных в этот период",
                rec_obj_name: "Нет данных в этот период",
                rec_recip_fio: "Нет данных в этот период",
                rec_send_id: 0,
                rec_status: 0}]
        }


      const newFilterFieldRec = selectUserActiveStatsData2.filter(rec => rec.rec_obj_name.toLowerCase().includes(selectFilterFieldRecObj.toLowerCase()));
        console.log('778 8 newFilterFieldRec',newFilterFieldRec);
        if (newFilterFieldRec.length === 0){
            return [{
                rec_date: selectFilterRecDateStart + 'T01:01:01.296Z',
                rec_date_interval: formatDate(selectFilterRecDateStart) + ' - ' + formatDate(selectFilterRecDateEnd),
                rec_descrip: "Нет данных по фильтру",
                rec_name: "Нет данных по фильтру",
                rec_obj_name: "Нет данных по фильтру",
                rec_recip_fio: "Нет данных по фильтру",
                rec_send_id: 0,
                rec_status: 0}]
        }


      if (selectFilterRecStatus === '0' || selectFilterRecStatus === 0){
          return newFilterFieldRec
      }else {
          const newFilter = newFilterFieldRec.filter(rec => rec.rec_status.toString() === selectFilterRecStatus);
          // console.log('newFilter',newFilter);
          if (newFilter.length){
              return newFilter;
          }else {
             return [{rec_date: "2021-01-01T01:01:01.000Z",
                 rec_descrip: "Нет данных по фильтру",
                 rec_name: "Нет данных по типу",
                 rec_obj_name: "Нет данных по фильтру",
                 rec_recip_fio: "Нет данных по типу",
                 rec_send_id: 0,
                 rec_status: 0}]
          }

      }

  }
);

