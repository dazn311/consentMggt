import {makeStyles} from "@material-ui/core/styles";
 
export const useStyles = makeStyles((theme) => ({
    root: {
        // width: '100%',
        // maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
        border: '1px solid #8080802e',
        margin: window.innerWidth < 500 ? 0 : theme.spacing(1),
        padding: window.innerWidth < 500 ? 0 : theme.spacing(1),
        transition: 'all .5s ease-in-out'
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
    ListItemTextRelObjs: {position: 'absolute', color: 'yellowgreen', bottom: -24},
    ListItemTextButtonOpen: {position: 'absolute', color: 'yellowgreen', bottom: 34},
}));

// export default useStyles