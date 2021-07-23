import INITIAL_STATE_GEN_PAGE from './gen.data'
import {ActionTypesGenPage, IAction} from './gen.types'


// interface dataEntreInterface {
//     total_objects: string;// for Gen Page //220721
//     total_mggt_objects: string;// for Gen Page //220721
//     total_users: string;// for Gen Page //220721
// }

interface SelectState {
     daily_messages: number;
     daily_recs: number;
     daily_sogl_recs: number;
     total_messages: number;
     total_mggt_objects: number;
     total_objects: number;
     total_recs: number;
     total_rel_objects: number;
     total_sogl_objects: number;
     total_sogl_recs: number;
     total_users: number;
}

type dataEntre = SelectState
// type dataEntre = dataEntreInterface

interface Initial_state {
    genStats: dataEntre;// for Gen Page //220721
    errorMessage: string | null; //220721
    successFetch: boolean; //220721
}


const INITIAL_STATE: Initial_state = {
    genStats: INITIAL_STATE_GEN_PAGE.genStats,// for Gen Page //220721
    errorMessage: 'null', //220721
    successFetch: false, //220721
};


const genPageReducer = (state = INITIAL_STATE, action: IAction):Initial_state => {
    switch (action.type) {
        case ActionTypesGenPage.error: //220721
            return {...state, errorMessage: action.payload};
        case ActionTypesGenPage.success: //220721
            return {...state, successFetch: action.payload};
        case ActionTypesGenPage.genStates:  //220721
            return {...state, genStats: action.payload};
        default:
            return state;
    }
}

export default genPageReducer;


// genStats: {  //290421 dashboard page
//     "total_objects": null,
//         "total_mggt_objects": null,
//         "total_rel_objects": null,
//         "total_sogl_objects": null,
//         "total_recs": null,
//         "total_sogl_recs": null,
//         "daily_recs": null,
//         "daily_sogl_recs": null,
//         "total_messages": null,
//         "daily_messages": null,
//         "total_users": null
// },