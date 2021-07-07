import React, { useState }  from 'react';

import List from '@material-ui/core/List';
import { Slide} from "@material-ui/core"; 
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

import {useStyles} from "./CardUserInfo.style";

import OrgCardConsent from "./OrgCard/OrgCardConsent";
import ObjsCard from "./ObjsCard/ObjsCard";
import RelCard from "./RelCard/RelCard";

const CardUserInfo = ( ) => {
    const [isOpened, setIsOpened] = useState({obj: true, rel: true, org: true})
    const classes = useStyles();
 
    return (
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <div className='card-user-info' >
            <List className={classes.root} style={{maxHeight: isOpened.org ? 400 : 74}} >
                    <IconButton  onClick={switchOpenOrg}  color="primary"  style={{position: 'absolute', top: 0,left: 0, padding: 4,cursor: 'pointer',zIndex: 1}}>
                        {isOpened.org ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    </IconButton> 
                    <OrgCardConsent/>
                </List> 
                <List className={classes.root} style={{maxHeight: isOpened.obj ? 300 : 40}} >  
                    <IconButton  onClick={switchOpenObj}  color="primary"  style={{position: 'absolute', top: 4,left: 0, padding: 4,cursor: 'pointer',zIndex: 1}}>
                        {isOpened.obj ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    </IconButton> 
                    <ObjsCard  />
                </List>
                <List className={classes.root} style={{maxHeight: isOpened.rel ? 300 : 40}} >  
                    <IconButton  onClick={switchOpenRel}  color="primary"  style={{position: 'absolute', top: 4,left: 0, padding: 4,cursor: 'pointer',zIndex: 1}}>
                        {isOpened.rel ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                    </IconButton> 
                    <RelCard />

                </List>
            </div>
        </Slide>
    );

    function switchOpenOrg () { setIsOpened({...isOpened, org : !isOpened.org }) } 
    function switchOpenObj () { setIsOpened({...isOpened, obj : !isOpened.obj }) }
    function switchOpenRel () { setIsOpened({...isOpened, rel : !isOpened.rel }) }
    
}

export default  CardUserInfo
