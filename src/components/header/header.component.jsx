import React from "react";
import {
    BrowserRouter as
        // eslint-disable-next-line no-unused-vars
        Switch, useLocation
} from "react-router-dom";
// import { Link } from "react-router-dom";

import { connect } from 'react-redux';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { makeStyles, useTheme, withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';

import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';


import MainListItems  from './listItems';
import   ThemeItem   from './ThemeItems';
import BlackDrop from '../blackDrop/BlackDrop.component';




// import { setCurrentUser } from '../../store/user/user.actions';

import { selectCurrentUser } from '../../store/user/user.selectors';

import './header.styles.scss';

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
        // padding: theme.spacing(0, 1),
        [theme.breakpoints.down('sm')]: {
            marginLeft: 0,
        },

        marginLeft: drawerMinWidth,
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,

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
        color: theme.palette.primary.dark,
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
}));

const Header = React.memo(({ currentUser, children, window, setTheme }) => {
    const [open, setOpen] = React.useState(false);
    const [headerTitle, setHeaderTitle] = React.useState('Главная страница');
    const classes = useStyles();

    // const { window } = props;
    const theme = useTheme();
    // const [mobileOpen, setMobileOpen] = React.useState(false);

    let location = useLocation();
    // const winWidth = window.innerWidth;

    React.useEffect(() => {
        // ga.send(["pageview", location.pathname]);
        // console.log('dsssss',location.pathname.split('/').pop());
        const headTitleCur2 = location.pathname.split('/')[2];
        const headTitleCur = location.pathname.split('/').pop();

        // console.log('headTitleCur2',headTitleCur2);

        if (headTitleCur2 === 'ogh') {
            setHeaderTitle('События')
        } else if (headTitleCur2 === 'objs') {
            setHeaderTitle('Объекты')
        } else if (headTitleCur2 === 'users') {
            setHeaderTitle('Пользователи')
        } else if (headTitleCur2 === 'gen') {
            setHeaderTitle('Общая статистика')
        } else if (headTitleCur2 === 'user') {
            setHeaderTitle('Карточка пользователя')
        } else if (headTitleCur2 === 'obj') {
            setHeaderTitle('Карточка объекта')
        } else if (headTitleCur === 'stats') {
            setHeaderTitle('Главная страница')
        }

        setOpen(false);

    }, [location]);


    const handleDrawerOpen = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);
        }, 33000); 
    };

    const handleDrawerClose = () => { setOpen(false); };

    const sssd = () => { };

    let user = currentUser ? currentUser : 'Пользователь';



    // console.log('render header');
    return (
        <div className={classes.root} >

            <AppBar position="fixed" className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
            })}>
                <Toolbar className={classes.toolbar}>
                    <IconButton 
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" noWrap   >
                        {headerTitle}
                    </Typography>
                </Toolbar>

            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, { [classes.drawerOpen]: open, [classes.drawerClose]: !open, })}
                classes={{ paper: clsx({ [classes.drawerOpen]: open,  [classes.drawerClose]: !open, }), }}
            >
                <div className={classes.toolbar2}>
                    <div style={{ marginLeft: '5px', display: 'flex' }}>
                        <Avatar alt="Daz" className={classes.avatar}>
                            <PersonIcon className={classes.small} />
                        </Avatar>
                        <div style={{ marginLeft: '15px', lineHeight: '40px', display: open ? 'block' : 'none' }}>{user}</div>
                    </div>
                    <IconButton onClick={handleDrawerClose} style={{ display: open ? 'block' : 'none' }}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List >
                    <MainListItems sssd={sssd} open={open} drawerClose={handleDrawerClose} />
                </List>
                <Divider />
                {/* <IconButton ><WbSunnyIcon /></IconButton> */}
                {/* <List>{secondaryListItems}</List> */}
                {/* <List>{themeItem}</List> */}
                <List><ThemeItem  setTheme={setTheme} /> </List>
            </Drawer>

            <main className={clsx(classes.main, open && classes.appBarShift)}>
                <BlackDrop isOpen={open} />
                {children}
            </main>


        </div>
    )

})


// const mapDispatchToProps = dispatch => ({
//     logOutUser: () => dispatch(setCurrentUser(null))
//   });

const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state),
});
 
export default connect(mapStateToProps)(withStyles(useStyles)(Header));
 