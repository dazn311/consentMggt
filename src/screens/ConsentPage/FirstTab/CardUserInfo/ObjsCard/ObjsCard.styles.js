
import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    styleObjs: {
        marginLeft: 4, borderLeft: '1px solid grey', paddingLeft: 4,
        transform: 'rotate(-90deg)', position: 'absolute', left: 25, top: 150
    },
    styleObjsAmount : {position: 'absolute', color: 'yellowgreen', bottom: -24},
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
}));