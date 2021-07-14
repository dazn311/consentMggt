import React from "react";
import { connect } from 'react-redux';
import { useLocation, useHistory } from "react-router-dom";

import AppBar from '@material-ui/core/AppBar';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import List from '@material-ui/core/List';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import { useTheme, withStyles } from '@material-ui/core/styles';

import clsx from 'clsx';

import useStyles  from './header.styles';
import MainListItems  from './listItems';
import   ThemeItem   from './ThemeItems';
import BlackDrop from '../blackDrop/BlackDrop.component';

import { selectCurrentUser } from '../../store/user/user.selectors';

import './header.styles.scss';

const Header = ({ currentUser, children, setTheme }) => {
    const [open, setOpen] = React.useState(false);
    const [headerTitle, setHeaderTitle] = React.useState('Главная страница');
    const classes = useStyles();

    let history = useHistory();
    const theme = useTheme();
    let location = useLocation();

    React.useEffect(() => {
        const headTitleCur2 = location.pathname.split('/')[2];
        const headTitleCur = location.pathname.split('/').pop();

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
        } else if (headTitleCur === 'dash') {
            setHeaderTitle('Основная статистика')
        }else if (headTitleCur === 'consent') {
            setHeaderTitle('Согласование объектов')
        }else if (!headTitleCur2) {
            setHeaderTitle('Согласование объектов')
            history.push('/stats/consent')
        }

        setOpen(false);

    }, [location,history]);


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
                <Toolbar className={classes.toolbar}  >
                    <IconButton   edge="start"  color="inherit" aria-label="open drawer" onClick={handleDrawerOpen}
                        className={clsx(classes.menuButton, { [classes.hide]: open  })}  >
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

}


// const mapDispatchToProps = dispatch => ({
//     logOutUser: () => dispatch(setCurrentUser(null))
//   });

const mapStateToProps = (state) => ({
    currentUser: selectCurrentUser(state),
});
 
export default connect(mapStateToProps)(withStyles(useStyles)(Header));
 