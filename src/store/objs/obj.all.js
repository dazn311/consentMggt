import { createSelector } from 'reselect';

/// obj.types //////////////////////
export const objData = {
  SET_OBJ_CURRENT_FOR_OBJ_CARD_PAGE: 'SET_OBJ_CURRENT_FOR_OBJ_CARD_PAGE',
};

/// obj.action //////////////////////
export const setCurrentObj = obj => ({
  type: objData.SET_OBJ_CURRENT_FOR_OBJ_CARD_PAGE,
  payload: obj
});

export const setCurObjAsync = (obj)  => {
  return (dispatch) => { 
          dispatch(setCurrentObj(obj));
  };
};

/// obj.reducer //////////////////////
const INITIAL_STATE = {
  curObjAllData: {}, // for user page info
};

const testReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case objData.SET_OBJ_CURRENT_FOR_OBJ_CARD_PAGE:
      return {
        ...state,
        curObjAllData: action.payload
      };

    default:
      return state;
  }
};

/// obj.selectors //////////////////////
const selectObj = state => state.obj;

export const selectObjFilterSender = createSelector(
    [selectObj],
    obj => obj.curObjFilterSender
);





