import React, {useEffect} from "react";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";

import OrgBlockInfo from "./OrgBlockInfo/OrgBlockInfo";
import EventsBlock from "./EventsBlock/index";

import ChatEvents from "./ChatEvents/index.tsx";
import CardMapInfo from "./MapBlockInfo/index";

import {
    styleConsent,
    styleCardMapInfo,
    styleEventsObj,
    styleChatEvents,
    styleIconButton
} from "./tabFirstConsent.styles";

import stateObjsMobx from "../../../store/consent/objsConsent/objsCons.mobx";
import styleOrgBy from "./TabFirstConsent.activeStyles";

const initialState = { lPanel: true, obj: true, rel: true,  org: true,  evn: false, chat: false, }

const IconBnt = (props) => (<IconButton {...props} > {props.isOpened ? <ExpandMoreIcon/> : <ExpandLessIcon/>} </IconButton>)

////////////////////////////////////////////////////////
const TabFirstConsent = () => {
    const [isOpened, setIsOpened] = React.useState(initialState);

    useEffect(() => {
        stateObjsMobx.fetchOrgData(531);
    }, [])

    return (
        <div className="tab-first-consent-f" style={styleConsent}>
            <div className="tab1__org-block" style={ styleOrgBy(isOpened) }>
                <IconBnt isOpened={isOpened.lPanel} onClick={switchOpenLPanel} color="primary" style={styleIconButton} />
                <div style={{opacity: isOpened.lPanel ? 1 : .1}}>  <OrgBlockInfo/> </div> </div>

            <div className="tab1__card-map-info" style={styleCardMapInfo}> <CardMapInfo/> </div>

            <div className="tab1__events-obj" style={{...styleEventsObj, maxWidth: isOpened.evn ? 500 : 78, minWidth: isOpened.evn ? 390 : 76, overflow: 'hidden'}}>
                <IconBnt isOpened={isOpened.evn} onClick={switchOpenEvn} color="primary" style={styleIconButton} />
                <EventsBlock visibleBtn={isOpened.evn}/>
            </div>

            <div className="tab1__chat-events"  style={{...styleChatEvents, maxWidth: isOpened.chat ? 400 : 78, minWidth: isOpened.chat ? 390 : 76}}>
                <IconBnt isOpened={isOpened.chat} onClick={switchOpenChat} color="primary" style={styleIconButton} />
                <div style={{opacity: isOpened.chat ? 1 : 0}}> <ChatEvents/>  </div>
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
