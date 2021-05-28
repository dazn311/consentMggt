import { createSelector } from 'reselect';

const selectTheme = state => state.theme; 

// export const selectCurrentUser = createSelector(
//   [selectUser],
//   curUser => curUser
// );

export const selectCurTheme = createSelector(
  [selectTheme],
  theme => theme.curTheme
);
