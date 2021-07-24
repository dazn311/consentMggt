import INITIAL_STATE_GEN_PAGE from './gen.data'
import {ActionTypesGenPage, IAction, SelectStateTransform} from './gen.types'

type dataEntre = SelectStateTransform[]

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
