import { createSelector } from 'reselect';

const getSelectPoints = (state: any) => state.genRed;

export const selectGenStats = createSelector(
    getSelectPoints,
    genRed => genRed.genStats // {total_objects: null,...}
)

export const errorMessageSelect = createSelector(
    getSelectPoints,
    genRed => genRed.errorMessage // null
)

export const successFetchSelect = createSelector(
    getSelectPoints,
    genRed => genRed.successFetch // false
)

//genStats{
//         "total_objects": null,
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
//     }

 