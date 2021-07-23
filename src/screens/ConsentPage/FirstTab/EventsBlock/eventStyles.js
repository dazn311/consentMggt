import {makeStyles} from "@material-ui/core/styles";
import ElemEventObj from "./ElemEventObj";

export const useStyles = makeStyles((theme) => ({
    root: {
        // width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        border: '1px solid #8080802e',
        margin: window.innerWidth < 500 ? 0 : theme.spacing(1),
        padding: window.innerWidth < 500 ? 0 : theme.spacing(1),
    },
    span: {
        color: '#1976d2'
    },
    red: {
        color: 'red',

    },
    customWidth: {
        maxWidth: 500,
        backgroundColor: 'black'

    },
    burlywood: {backgroundColor: "burlywood"},
    purple: {
        color: theme.palette.purple //'#a4a5d8'
    },
    MuiAvatar: {
        root: {
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
        }

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
    CaptionStyles: {
        marginLeft: 4,
        borderLeft: "1px solid grey",
        paddingLeft: 4,
        color: "darkgrey",
        transform: "rotate(-90deg)",
        position: "absolute",
        left: 8,
        top: 20,
        fontSize: "initial",
    },
    listItemText:{ maxHeight: 420, overflow: "auto", maxWidth: 420, transition: "all 0.5s ease-out", border: '1px solid darkslategrey' },
    elemEventObjWrap: {display: "flex", cursor: 'pointer'},
    elemEventObjFirstElem: {width: 4, backgroundColor: ""},
    elemEventObjSecondElem: {paddingLeft: 4, paddingTop: 4,  borderBottom: "1px solid grey",  maxWidth: 350, width: "-webkit-fill-available" },
    ListItemTextRelObjs: {position: 'absolute', color: 'yellowgreen', bottom: -24, left: 16},
    ListItemTextButtonOpen: {position: 'absolute', color: 'yellowgreen', bottom: 34},
}));
