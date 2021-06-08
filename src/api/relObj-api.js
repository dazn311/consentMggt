import {
    fetchRelObjById,
    setActiveRelObjIdForConsentPage
} from '../store/consent/cons.actions'

import axios from "axios";


export const relObjsList = {

    fetchRelById(relId) {
        console.log('fetchRelById start', relId)
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
    }

}
