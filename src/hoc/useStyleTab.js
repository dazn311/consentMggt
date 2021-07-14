import {makeStyles} from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
    root: {
        width: 'fit-content',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.secondary,
        '& svg': {
            margin: theme.spacing(1.5),
        },
        '& hr': {
            margin: theme.spacing(0, 0.5),
        },
        // minWidth:1400,
    },
    // amObjs:{alignSelf: 'center',marginLeft:10, padding: '4px 16px'},
    seeMore: {
        marginTop: theme.spacing(1),
        width: window.innerWidth > 500 ? 'calc(100% - 8px)' : '100%'

    },
    btnSearch: {alignSelf:  'center', marginLeft: 2, backgroundColor: theme.palette.primary.main},
    btnSearchMobile: {height:  '43px', marginLeft: 0, marginTop: 8, width: '100%', backgroundColor: theme.palette.primary.main},
    datePick: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        // color: theme.palette.primary.main,
        // color: 'rgba(0, 0, 0, 0.87)',
        transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        // backgroundColor: theme.palette.background.paper,
        padding: '5px',
        borderRadius: '4px',
        margin: '5px 0px',
        boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
    }
}));
