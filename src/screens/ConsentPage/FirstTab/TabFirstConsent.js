import React, {useEffect} from "react";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";

import OrgBlockInfo from "./OrgBlockInfo/OrgBlockInfo";
import EventsBlock from "./EventsBlock/index";

import ChatEvents from "./ChatEvents/index";
import CardMapInfo from "./MapBlockInfo/index";

import {
    styleConsent,
    styleOrg,
    styleCardMapInfo,
    styleEventsObj,
    styleChatEvents,
    styleIconButton
} from "./tabFirstConsent.styles";
import stateObjsMobx from "../../../store/consent/objsConsent/objsCons.mobx";

const initialState = { lPanel: true, obj: true, rel: true,  org: true,  evn: true, chat: true, }

////////////////////////////////////////////////////////
const TabFirstConsent = () => {
    const [isOpened, setIsOpened] = React.useState(initialState);

    useEffect(() => {
        stateObjsMobx.fetchOrgData(531);
    }, [])

    return (
        <div className="tab-first-consent-f" style={styleConsent}>
            <div className="tab1__org-block" style={{
                ...styleOrg,
                maxWidth: isOpened.lPanel ? 400 : 98,
                border: isOpened.lPanel ? '1px solid rgb(77, 88, 77)' : '1px solid #607d8b'
            }}>
                {/*иконки переключения видимости*/}
                <IconButton onClick={switchOpenLPanel} color="primary" style={styleIconButton}>
                    {isOpened.lPanel ? <ExpandMoreIcon/> : <ExpandLessIcon/>}
                </IconButton>
                <div style={{opacity: isOpened.lPanel ? 1 : .1}}>
                    <OrgBlockInfo/>
                </div>
            </div>

            <div className="tab1__card-map-info" style={styleCardMapInfo}>
                <CardMapInfo/>
            </div>

            <div className="tab1__events-obj"
                 style={{...styleEventsObj, maxWidth: isOpened.evn ? 400 : 78, minWidth: isOpened.evn ? 390 : 76}}>
                <IconButton onClick={switchOpenEvn} color="primary" style={styleIconButton}>
                    {isOpened.evn ? <ExpandMoreIcon/> : <ExpandLessIcon/>}
                </IconButton>

                <EventsBlock visibleBtn={isOpened.evn}/>
            </div>

            <div className="tab1__chat-events"  style={{...styleChatEvents, maxWidth: isOpened.chat ? 400 : 78, minWidth: isOpened.chat ? 390 : 76}}>
                <IconButton onClick={switchOpenChat} color="primary" style={styleIconButton}>
                    {isOpened.chat ? <ExpandMoreIcon/> : <ExpandLessIcon/>}
                </IconButton>
                <div style={{opacity: isOpened.chat ? 1 : 0}}>
                    <ChatEvents/>
                </div>
            </div>
        </div>
    );

    function switchOpenLPanel() {
        setIsOpened({...isOpened, lPanel: !isOpened.lPanel});
    }

    function switchOpenEvn() {
        setIsOpened({...isOpened, evn: !isOpened.evn});
    }

    function switchOpenChat() {
        setIsOpened({...isOpened, chat: !isOpened.chat});
    }
};

export default TabFirstConsent;


// useEffect(() => {
//     if (stateObjsMobx.successFetchOrg && !stateObjsMobx.successFetchObj) {
//         stateObjsMobx.fetchObjData(stateObjsMobx.orgData.org_name)
//     }
// }, [stateObjsMobx.successFetchOrg])