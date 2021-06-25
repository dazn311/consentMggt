import {
    fetchRelObjById, setActiveObjAndRelForConsentPage,
    setActiveRelObjIdForConsentPage
} from '../store/consent/cons.actions'

import axios from "axios";


export const relObjsList = {

    fetchRelById(relId) {
        console.log('345 fetchRelById start', relId)
        const url = 'https://ismggt.ru/query/object/data'
        return async (dispatch) => {
            try {
                const {data} = await axios.post(url, {objID: relId})
                console.log('fetchRelById then', data)
                dispatch(fetchRelObjById(data))
            } catch (err) {
                // Handle Error Here
                console.error(err);
            }

        }
    },
    setActiveRelIdAsync(relId) {
        return dispatch => {
            return dispatch(setActiveRelObjIdForConsentPage(relId));
        }
    },
    //activeObjAndRel: [{id: 0, objName: 'FistObj'},{id: 1, relName: 'SecondObj'}],
    setActiveObjAndRelAsync(objData) {
        return dispatch => {
            return dispatch(setActiveObjAndRelForConsentPage(objData));
        }
    }

}
