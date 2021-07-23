import { makeStyles  } from '@material-ui/core/styles';

const drawerWidth = 240;
const drawerMinWidth = 57;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    avatar: {
        marginRight: 8,
    },
    drawer: {
        width: drawerMinWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        color: theme.palette.primary.main,
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(7) + 1,
        },
        [theme.breakpoints.down('sm')]: {
            width: 0,
            display: 'none',
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: theme.palette.primary.main,
        // padding: theme.spacing(0, 1),
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },

        marginLeft: drawerMinWidth,
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        '@media (min-width: 600px)': {
            minHeight: "32px"
        }

    },
    toolbar2: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        ...theme.mixins.toolbar,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    main: {
        // width: '100%',
        marginLeft: drawerMinWidth,
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
            width: '100%'
        },
        width: `calc(100% - ${drawerMinWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
        // [theme.breakpoints.up('lg')]: {
        //   display: 'none',
        // },
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        // width: theme.spacing(0),
        [theme.breakpoints.down('sm')]: {
            width: 0,
            display: 'none',
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
        color: theme.palette.primary.main,
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: theme.palette.primary.main,
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

 
export default useStyles;
 