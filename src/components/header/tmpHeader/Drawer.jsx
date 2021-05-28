import React from "react";
import {
    BrowserRouter as
        // eslint-disable-next-line no-unused-vars
        Switch, useLocation
} from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import List from '@material-ui/core/List';


import MainListItems from './listItems';

// import { Link } from "react-router-dom";

import { connect } from 'react-redux';



// import { setCurrentUser } from '../../store/user/user.actions';

import { selectCurrentUser } from '../../store/user/user.selectors';

import './header.styles.scss';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
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
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        height: '100vh',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
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
    },news: {
        '&:hover': {
            background: "#f00",
        },
    },
    fixedHeight: {
        height: 240,
    },
}));
 
const Header = ({currentUser}) => {
    const [open, setOpen] = React.useState(false);
    const [headerTitle, setHeaderTitle] = React.useState(false);
    const classes = useStyles();

    let location = useLocation();
    // const winWidth = window.innerWidth;

    React.useEffect(() => {
        // ga.send(["pageview", location.pathname]);
        // console.log('dsssss',location.pathname.split('/').pop());
        const headTitleCur2 = location.pathname.split('/')[2];
        const headTitleCur = location.pathname.split('/').pop();

        // console.log('headTitleCur2',headTitleCur2);

        if (headTitleCur2 === 'ogh'){
            setHeaderTitle('События')
        }else if (headTitleCur2 === 'objs'){
            setHeaderTitle('Объекты')
        }else if (headTitleCur2 === 'users'){
            setHeaderTitle('Пользователи')
        }else if (headTitleCur2 === 'gen'){
            setHeaderTitle('Общая статистика')
        }else if (headTitleCur2 === 'user'){
            setHeaderTitle('Карточка пользователя')
        }else if (headTitleCur2 === 'obj'){
            setHeaderTitle('Карточка объекта')
        }else if (headTitleCur === 'stats'){
            setHeaderTitle('Главная страница')
        }

        setOpen(false);

    }, [location]);


    const handleDrawerOpen = () => {
        setOpen(true);
        setTimeout(() => {
            setOpen(false);},3000);
        console.log('handleDrawerOpen'); };
    const handleDrawerClose = () => { setOpen(false); };

    const sssd = () => {};

    let user = currentUser ? currentUser : 'Пользователь';
    // let user = '';

    // console.log('render header');
    return (
        <div className="Admin-header">

            <AppBar position="fixed" className={clsx(classes.appBar, open && classes.appBarShift)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        // style={{display:'none'}}
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
                        {headerTitle}
                        {/* -({winWidth}) */}
                    </Typography>
                    {/* <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
                </Toolbar>
            </AppBar>
            <Drawer 
                style={{display:!open && 'none'}}
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    // paper: clsx(classes.toolbarIcon, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                {/* <div className={classes.toolbarIcon}> */}
                <div className={classes.toolbarIcon}>
                    <div style={{marginLeft: '5px', display:'flex'}}>
                        <Avatar className={classes.avatar}>
                            <PersonIcon />
                        </Avatar>
                        <div style={{marginLeft: '15px', lineHeight:'40px'}}>{user}</div></div>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List >
                    <MainListItems sssd={sssd} open={open} drawerClose={handleDrawerClose} />
                </List>
                <Divider />
                {/* <List>{secondaryListItems}</List> */}
            </Drawer>
        </div>
    )

}


// const mapDispatchToProps = dispatch => ({
//     logOutUser: () => dispatch(setCurrentUser(null))
//   });

const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state),
});

// export default connect(mapStateToProps, mapDispatchToProps)(Header);
export default connect(mapStateToProps)(Header);

// export default Header;