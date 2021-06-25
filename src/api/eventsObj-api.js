import {
    putEventsObjToStatsForConsentPage, switchEventsObjForConsentPage
} from '../store/consent/cons.actions'

import axios from "axios";


export const eventsObjList = {

    fetchEventsObjById(objId, relId) {
        console.log('345 fetchEventsObjById start', objId, relId)
        if (objId < 1 && relId < 1) {  return 0  }

        // let relId = actObjAndRelS[1].id
        const url = 'https://ismggt.ru/query/object/recs/list'
        return async (dispatch) => {
            try {
                const {data} = await axios.post(url, {"objectID": objId, "limit": 110, "offset": 0})
                console.log('fetchEventsObjById then', data)
                dispatch(putEventsObjToStatsForConsentPage(data))
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }

        }
    },
    switchVisibleLst(yn) {
        return dispatch => {
            return dispatch(switchEventsObjForConsentPage(yn));
        }
    },

}
