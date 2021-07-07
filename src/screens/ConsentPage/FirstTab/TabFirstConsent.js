import React from "react";

import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";

import CardUserInfo from "./CardUserInfo/CardUserInfo";
import EventsObj from "./eventsObj/index";
//
import ChatEvents from "./ChatEvents/index";
import CardMapInfo from "./CardMapInfo/index";

import {
    styleConsent,
    styleOrg,
    styleCardMapInfo,
    styleEventsObj,
    styleChatEvents,
    styleIconButton
} from "./tabFirstConsent.styles";

////////////////////////////////////////////////////////
const TabFirstConsent = () => {
    const [isOpened, setIsOpened] = React.useState({
        lPanel: true,
        obj: true,
        rel: true,
        org: true,
        evn: true,
    });

    return (
        <div className="tab-first-consent" style={styleConsent}>
            <div className="tab1__user-info" style={{...styleOrg, maxWidth: isOpened.lPanel ? 400 : 74, border: isOpened.lPanel ? 0 : '1px solid #607d8b'}} >
                {/*иконки переключения видимости*/}
                <IconButton onClick={switchOpenLPanel} color="primary" style={styleIconButton}>
                    {isOpened.lPanel ? <ExpandMoreIcon/> : <ExpandLessIcon/>}
                </IconButton>
                <div style={{opacity: isOpened.lPanel ? 1: .1}} >

                <CardUserInfo/>
                </div>
            </div>

            <div className="CardMapInfo" style={styleCardMapInfo}>
                <CardMapInfo/>
            </div>

            <div className="EventsObj" style={{...styleEventsObj, maxWidth: isOpened.evn ? 400 : 78,minWidth: isOpened.evn ? 390 : 76}} >
                <IconButton onClick={switchOpenEvn} color="primary" style={styleIconButton}>
                    {isOpened.evn ? <ExpandMoreIcon/> : <ExpandLessIcon/>}
                </IconButton>

                <EventsObj visableBtn={isOpened.evn} />
            </div>

            <div className="ChatEvents" style={styleChatEvents}>
                <ChatEvents/>
            </div>
        </div>
    );

    function switchOpenLPanel() {
        setIsOpened({...isOpened, lPanel: !isOpened.lPanel});
    }

    function switchOpenEvn() {
        setIsOpened({...isOpened, evn: !isOpened.evn});
    }
};

export default TabFirstConsent;
