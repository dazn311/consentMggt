import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import HomeWorkIcon from '@material-ui/icons/HomeWork';
import {useStyles} from "../cardUserComponents/ElemObj";

const styleObjs = { marginLeft: 4, borderLeft: '1px solid grey', paddingLeft: 4,
    transform: 'rotate(-90deg)', position: 'absolute', left: 25, top: 150 }

////////////////////////////////////
const ObjsCard = ({length = null, objectsOfCurOrg}) => {
    const classes = useStyles();
    // console.log('155 objectsOfCurOrg', objectsOfCurOrg)

    return (
        <React.Fragment>
        <ListItem>
            <ListItemAvatar>
                <Avatar className={classes.MuiAvatarRoot}>
                    <HomeWorkIcon/>
                    <ListItemText style={{position: 'absolute', color: 'yellowgreen', bottom: -24}}
                                  secondary={length}/>
                </Avatar>
                <div style={styleObjs} >Объекты</div>
            </ListItemAvatar>
            <ListItemText style={{maxHeight: 280, overflow: 'auto'}} // primary="Объекты"
                          secondary={objectsOfCurOrg}/>
        </ListItem>
        </React.Fragment>
    );
}

export default ObjsCard
