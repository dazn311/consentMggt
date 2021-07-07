import React from "react";
import {connect} from "react-redux";
import {useStyles} from "../ElemObj";


import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import HomeWorkIcon from "@material-ui/icons/HomeWork";
import ListItemText from "@material-ui/core/ListItemText";


import RelObjItemsWrapper from "./RelObjItemsWrapper";


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
                    <div>
                        <Avatar className={classes.MuiAvatarRoot}>
                            <HomeWorkIcon/>
                            <ListItemText className={classes.ListItemTextRelObjs}
                                          secondary={relListShortDataS && relListShortDataS.length}/>
                        </Avatar>
                        <div style={{
                            marginLeft: 4,
                            borderLeft: '1px solid grey',
                            paddingLeft: 4,
                            transform: 'rotate(-90deg)',
                            position: 'absolute',
                            left: -10,
                            top: 100,
                        }}>Смежные объекты
                        </div>
                    </div>
                </ListItemAvatar>
                <ListItemText style={{maxHeight: 200, overflow: 'auto'}}
                    // primary="Смежные объекты"
                              secondary={<RelObjItemsWrapper/>}/>
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