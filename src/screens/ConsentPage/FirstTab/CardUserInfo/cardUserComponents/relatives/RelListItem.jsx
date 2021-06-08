import React from "react";
import {connect} from "react-redux";
import {useStyles} from "../objStatus";


import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import ListItemText from "@material-ui/core/ListItemText";



import RelObjItemsWrapper from "./relObjItemsWrapper";


import {createStructuredSelector} from "reselect";
import {
    relListShortDataSelector // отобразить количество смежных объектов
} from "../../../../../../store/consent/cons.selectors";


const RelListItem = ({relListShortDataS}) => {
    const classes = useStyles()
    return (
        <>
            <ListItem>
                <ListItemAvatar>
                    <Avatar className={classes.MuiAvatarRoot}>
                        <HomeWorkIcon/>
                         <ListItemText className={classes.ListItemTextRelObjs}
                            secondary={relListShortDataS && relListShortDataS.length}/>
                    </Avatar>
                </ListItemAvatar>
                <ListItemText style={{maxHeight: 200, overflow: 'auto'}} primary="Смежные объекты" secondary={<RelObjItemsWrapper />}/>
            </ListItem>
        </>
    );
};

const mapStateToProps = createStructuredSelector({
    relListShortDataS: relListShortDataSelector,
});


const mapDispatchToProps = (dispatch) => ({
    // fetchObjByIdToObjsData: (objId) => dispatch(fetchObjByIdToObjsDataAsync(objId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(RelListItem);