import 'date-fns';
import React, {useEffect} from 'react';

import Grid from '@material-ui/core/Grid';
// import DateFnsUtils from '@date-io/date-fns';
// import {
//     MuiPickersUtilsProvider,
//     KeyboardDatePicker,
// } from '@material-ui/pickers';

// import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Popper from "@material-ui/core/Popper";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";
import CardContent from "@material-ui/core/CardContent";
import {formatDateISO} from "../../hoc/formatDate";
import CardActions from "@material-ui/core/CardActions";
import clsx from "clsx";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Card from "@material-ui/core/Card";
import {makeStyles, useTheme} from "@material-ui/core/styles";


const useStyles = makeStyles((theme) => ({
    root: {
        // width: '100%',
        maxWidth: 612,
        position: 'relative'
        // minWidth: 360
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    divider: {
        height: 2,
        marginTop: 4,
    },
    expand: {
        transform: 'rotate(0deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    expandOpen: {
        transform: 'rotate(180deg)',
    },
    avatar: {
        backgroundColor: theme.palette.grey,
    },
}));

///////////////////////
export default function RectData({recData, setEmptyRecData, curUser }) {
    const [expanded, setExpanded] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [openMenu, setOpenMenu] = React.useState(false);

    const anchorRef = React.useRef(null);
    const themess = useTheme();
    const classes = useStyles();


    console.log('recData',recData);
    //rec_date: "2021-03-10T13:59:19.000Z"
    // rec_descrip: "Описание заявки"
    // rec_id: 493
    // rec_name: "Согласование: границ 2855->2858"
    // rec_obj_name: "Высоцкого ул."
    // rec_recip_fio: "ГБУ \"Автомобильные Дороги\""
    // rec_recip_post: null
    // rec_send_fio: "Осипова Анна Александровна"
    // rec_send_id: 228
    // rec_send_post: "ведущий специалист"
    // rec_status: 2

    useEffect(() => {
        if (recData){
            setOpen(true)
        }
    },[recData])

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleToggle = () => {
        setOpenMenu((prevOpen) => !prevOpen);
        // setEmtyRecData();
    };


    // const handleClickOpen = () => {
    //     setOpen(true);
    // };

    const handleClose = () => {
        setOpenMenu(false);
        setEmptyRecData();
        setOpen(false);
    };
    const handleCloseMenu = () => {
        setOpenMenu(false);
    };

    function handleListKeyDown(event) {
        console.log('event',event)
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpenMenu(false);
            // setEmtyRecData();
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;

    }, [open]);

    console.log(curUser);
    //org_name: "Администрация поселения Кокошкино"
    // user_id: 473
    // user_last_seen: null
    // user_name: "Агуреев Николай Юрьевич"
    // user_org_id: 70
    // user_post: "Главный специалист"
    // user_role: 2
    // user_shortname: "Агуреев Н.Ю."

    return (
        <div>
            {/*<Button onClick={handleClickOpen}>{caption}</Button>*/}
            <Dialog
                // disableBackdropClick
                    // disableEscapeKeyDown
                    open={open}
                    onClose={handleClose}
            >
                <DialogTitle>{curUser && curUser.org_name}</DialogTitle>
                <DialogContent>
                    {/*<MuiPickersUtilsProvider utils={DateFnsUtils}>*/}
                        <Grid container justify="space-around">
                            <Card className={classes.root}>
                                <CardHeader
                                    avatar={
                                        <Avatar aria-label="recipe" className={classes.avatar}>
                                            N
                                        </Avatar>
                                    }
                                    action={
                                        <IconButton aria-label="settings">
                                            <MoreVertIcon ref={anchorRef}
                                                          aria-controls={open ? 'menu-list-grow' : undefined}
                                                          aria-haspopup="true"
                                                          onClick={handleToggle}/>

                                            <Popper open={openMenu} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                                {({TransitionProps, placement}) => (
                                                    <Grow
                                                        {...TransitionProps}
                                                        style={{
                                                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                                            marginRight: 38
                                                        }}
                                                    >
                                                        <Paper>
                                                            <ClickAwayListener onClickAway={handleCloseMenu}>
                                                                <MenuList autoFocusItem={open} id="menu-list-grow"
                                                                          onKeyDown={handleListKeyDown}>
                                                                    <MenuItem onClick={handleCloseMenu}>Сохранить</MenuItem>
                                                                    <MenuItem onClick={handleCloseMenu}>Печать</MenuItem>
                                                                    <MenuItem onClick={handleCloseMenu}>Удалить</MenuItem>
                                                                </MenuList>
                                                            </ClickAwayListener>
                                                        </Paper>
                                                    </Grow>
                                                )}
                                            </Popper>
                                        </IconButton>
                                    }
                                    title={recData ? recData.rec_name : 'нет данных'}
                                    subheader={recData ? recData.rec_id : 'recId'}
                                />
                                {/* <CardMedia
            className={classes.media}
            image="/static/images/avatar/1.png"
            title={user_name}
        /> */}
                                <CardContent>
                                    <div className="">
                                        <table>
                                            <thead>
                                            <tr className="hidden">
                                                <th className="mw30"></th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td></td>
                                                <td style={{
                                                    minWidth: 120,
                                                    color: themess.palette.type === 'dark' && 'bisque',
                                                    borderBottom: '1px solid #ffe4c469',
                                                    paddingBottom: 4
                                                }}>Описание
                                                </td>
                                                <td style={{minWidth: 140, borderBottom: '1px solid #7c985b', paddingBottom: 4}}>
                                                    {recData ? recData.rec_descrip : 'нет данных'}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td style={{
                                                    minWidth: 120,
                                                    color: themess.palette.type === 'dark' && 'bisque',
                                                    borderBottom: '1px solid #ffe4c469',
                                                    paddingBottom: 4
                                                }}>Объект
                                                </td>
                                                <td style={{
                                                    minWidth: 140,
                                                    borderBottom: '1px solid #7c985b',
                                                    paddingBottom: 4
                                                }}> {recData ? recData.rec_obj_name : 'нет данных'}</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td style={{
                                                    minWidth: 120,
                                                    color: themess.palette.type === 'dark' && 'bisque'
                                                }}>Инициатор
                                                </td>
                                                <td style={{minWidth: 140}}> {recData ? recData.rec_send_fio : 'нет данных'}</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td style={{
                                                    minWidth: 120,
                                                    color: themess.palette.type === 'dark' && 'bisque',
                                                    borderBottom: '1px solid #ffe4c469',
                                                    paddingBottom: 4
                                                }}>Должность
                                                </td>
                                                <td style={{
                                                    minWidth: 140,
                                                    borderBottom: '1px solid #7c985b',
                                                    paddingBottom: 4
                                                }}> {recData ? recData.rec_send_post : 'нет данных'}</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td style={{
                                                    minWidth: 120,
                                                    color: themess.palette.type === 'dark' && 'bisque'
                                                }}>Ответчик
                                                </td>
                                                <td style={{minWidth: 140}}> {recData && (recData.rec_recip_fio ? recData.rec_recip_fio:'нет данных')  }</td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td style={{
                                                    minWidth: 120,
                                                    color: themess.palette.type === 'dark' && 'bisque',
                                                    borderBottom: '1px solid #ffe4c469',
                                                    paddingBottom: 4
                                                }}>Должность
                                                </td>
                                                <td style={{
                                                    minWidth: 140,
                                                    borderBottom: '1px solid #7c985b',
                                                    paddingBottom: 4
                                                }}> {recData && (recData.rec_recip_post ? recData.rec_recip_post : 'нет данных')  }</td>
                                            </tr>

                                            <tr>
                                                <td></td>
                                                <td style={{minWidth: 120, color: themess.palette.type === 'dark' && 'bisque'}}>
                                                    Статус.
                                                </td>
                                                <td><span
                                                    style={{color: themess.palette.type === 'dark' && 'white'}}> {recData ?  (recData.rec_status === 2 ?'в работе':'завершен' )  :'нет данных'}</span>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td></td>
                                                <td style={{minWidth: 120, color: themess.palette.type === 'dark' && 'bisque'}}>
                                                    Дата рег.
                                                </td>
                                                <td><span style={{color: themess.palette.type === 'dark' && 'white'}}>
                                                    {recData
                                                        ? formatDateISO(recData.rec_date)
                                                        : '01.01.21'}
                                                </span>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>

                                </CardContent>
                                <CardActions disableSpacing>
                                    {/* <IconButton aria-label="add to favorites">
            <FavoriteIcon color={'disabled'} />
          </IconButton> */}
                                    {/* <IconButton aria-label="share">
            <ShareIcon />
          </IconButton> */}
                                    <IconButton
                                        className={clsx(classes.expand, {
                                            [classes.expandOpen]: expanded,
                                        })}
                                        onClick={handleExpandClick}
                                        aria-expanded={expanded}
                                        aria-label="показать.."
                                    >
                                        <ExpandMoreIcon/>
                                    </IconButton>
                                </CardActions>
                                <Collapse in={expanded} timeout="auto" unmountOnExit>
                                    <CardContent>
                                        <Typography paragraph>Последние изменения:</Typography>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Добавлен в систему
                                        </Typography>
                                        <Divider className={classes.divider}/>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Приостановлен.
                                        </Typography>
                                        <Divider className={classes.divider}/>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Смена контактов.
                                        </Typography>
                                        <Divider className={classes.divider}/>
                                        <Typography variant="body2" color="textSecondary" component="p">
                                            Изменение в должности
                                        </Typography>
                                    </CardContent>
                                </Collapse>
                            </Card>
                        </Grid>
                    {/*</MuiPickersUtilsProvider>*/}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}
