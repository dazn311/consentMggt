import React from 'react';
import {makeStyles} from "@material-ui/core/styles";


export const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    },
    styleObjsAmount: {position: 'absolute', color: 'yellowgreen', bottom: -24},
    styleObjs: {
        marginLeft: 4, borderLeft: '1px solid grey', paddingLeft: 4 , whiteSpace: 'nowrap',
        transform: 'rotate(-90deg)', position: 'absolute', left: 4, top: 100
    },
    MuiAvatarRoot: {
        width: 40,
        height: 40,
        display: 'flex',
        overflow: 'unset',
        position: 'relative',
        fontSize: '1.25rem',
        alignItems: 'center',
        flexShrink: 0,
        fontFamily: ' "Roboto", "Helvetica", "Arial, sans-serif" ',
        lineHeight: 1,
        userSelect: 'none',
        borderRadius: '50%',
        justifyContent: 'center'
    },
    ListItemTextRelObjs: {position: 'absolute', color: 'yellowgreen', bottom: -24},
    ListItemTextButtonOpen: {position: 'absolute', color: 'yellowgreen', bottom: 34},
}));
export default useStyles
