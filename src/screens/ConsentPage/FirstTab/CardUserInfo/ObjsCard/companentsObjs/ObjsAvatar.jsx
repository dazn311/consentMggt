import React from 'react';

import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import HomeWorkIcon from '@material-ui/icons/HomeWork';

import {useStyles} from "../ObjsCard.styles";

////////////////////////////////////
const ObjsAvatar = ({ amount}) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <ListItemAvatar>
                <React.Fragment>
                    <Avatar className={classes.MuiAvatarRoot}>
                        <HomeWorkIcon/>
                        <ListItemText className={classes.styleObjsAmount}  secondary={amount}/>
                    </Avatar>
                    <div className={classes.styleObjs}  >Объекты</div>
                </React.Fragment>
            </ListItemAvatar>
        </React.Fragment>
    )
}

export default ObjsAvatar
