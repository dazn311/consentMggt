import React, {useEffect, useState} from 'react';
import EventsListPanel from "./EventsListPanel";
import {
    activeObjAndRelSelector,
    activeRelIdSelector,
    curObjIdSelector, visibleEventsObjSelector
} from "../../../../../../store/consent/cons.selectors";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import axios from "axios";

import ClearIcon from '@material-ui/icons/Clear';
import CallMergeIcon from '@material-ui/icons/CallMerge';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import {Tooltip} from "@material-ui/core";
import {eventsObjList} from "../../../../../../api/eventsObj-api";
// import SendIcon from '@material-ui/icons/Send';

const EventsObj = ({actObjAndRelS, visibleEventsObjS, switchVisibleLstA, fetchEventsObjByIdA}) => {
    const [eventsList, setEventsList] = useState([])
    const [filterEvnLst, setFilterEvnLst] = useState([])
    const [eventsFilterID, setEventsFilterID] = useState(0)
    const [visibleListS, setVisibleListS] = useState(true)
    // console.log('3735 actObjAndRelS', actObjAndRelS)
    let objId = actObjAndRelS[0].id
    let relId = actObjAndRelS[1].id

    useEffect(() => {
        if (objId > 1 && relId > 1) {
            axios.post('https://ismggt.ru/query/object/recs/list', {"objectID": objId, "limit": 110, "offset": 0})
                .then(data => {
                    let newList = data.data.data.recs
                    setEventsFilterID(0)
                    setEventsList(newList)
                })

            fetchEventsObjByIdA(objId,relId);
        }


    }, [actObjAndRelS])

    const switchVisibleLst = () => {
        // console.log('switch')
        switchVisibleLstA(visibleListS)
        // switchVisibleLst(true)
        setVisibleListS(prev => prev = !prev)
    }

    const filterLst = (eventStartList) => {
        let objID = actObjAndRelS[0].id
        let relID = actObjAndRelS[1].id
        let newList = eventStartList
        if (eventsFilterID === 1) {// события из списка событий и rel
            newList = eventsList.filter(ev => {
                let receipSend = [ev.sender.objectID, ev.receip.objectID].join(',')
                return receipSend.includes(objID.toString()) && receipSend.includes(relID.toString())
            })
            setFilterEvnLst(newList)

        } else if (eventsFilterID === 2) {// события завершенные
            // console.log('66 eventsFilterID === 2', eventsFilterID)

            newList = eventStartList.filter(ev => ev.rec_status === 5)
            setFilterEvnLst(newList)
        } else {
            // console.log('66 else', eventsFilterID)
            setFilterEvnLst(eventsList)
        }
    }

    useEffect(() => {
        filterLst(eventsList)
    }, [eventsFilterID, eventsList, actObjAndRelS[1]])

    const setEvFilter = (evt) => {
        setEventsFilterID(evt)
    }

    // console.log('3737 eventsList',eventsList)

    return (
        <div
            // style={{opacity: .7, maxWidth: visibleEventsObjS ? 90 : 300}}
        >


            <EventsListPanel visibleList={visibleListS} switchVisibleLst={switchVisibleLst}  eventsList={filterEvnLst}/>

            {/*buttons group*/}
            <div style={{marginLeft: 74, display: visibleListS ? 'flex': 'none', position: 'relative'}}>
                <div style={{
                    marginLeft: -30,
                    bottom: 33,
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'absolute'
                }}>

                    <Tooltip title={'Все события выбранного объекта'}>
                        <ClearIcon style={{color: eventsFilterID === 0 ? 'greenyellow' : 'grey', cursor: 'pointer'}}
                                   onClick={() => setEvFilter(0)}/>
                    </Tooltip>
                    <Tooltip title={'События относятся к текущему и смежн. объекту'}>
                        <CallMergeIcon style={{color: eventsFilterID === 1 ? 'greenyellow' : 'grey', cursor: 'pointer'}}
                                       onClick={() => setEvFilter(1)}/>
                    </Tooltip>
                    <Tooltip title={'Согласованные все события выделенного объекта'}>
                        <DoneAllIcon style={{color: eventsFilterID === 2 ? 'greenyellow' : 'grey', cursor: 'pointer'}}
                                     onClick={() => setEvFilter(2)}/>
                    </Tooltip>
                </div>


                <div style={{marginLeft: 4, borderLeft: '1px solid grey', paddingLeft: 4, backgroundColor: '#00008b78'}}>Вы
                    инициировали
                </div>
                <div style={{
                    marginLeft: 4,
                    borderLeft: '1px solid grey',
                    paddingLeft: 4,
                    backgroundColor: 'rgb(255 152 0 / 38%)'
                }}>Смежник
                </div>
                <div style={{marginLeft: 4, borderLeft: '1px solid grey', paddingLeft: 4, backgroundColor: 'rgb(255 0 0 / 27%)'}}>Вы сами
                    себе
                </div>
            </div>
            {/*<button>С текущим Смеж.</button>*/}
        </div>
    )
};

const mapStateToProps = createStructuredSelector({
    curObjIdS: curObjIdSelector,
    activeRelIdS: activeRelIdSelector,
    actObjAndRelS: activeObjAndRelSelector,
    visibleEventsObjS: visibleEventsObjSelector,
});


const mapDispatchToProps = (dispatch) => ({
    // fetchObjByIdToObjsData: (objId) => dispatch(fetchObjByIdToObjsDataAsync(objId)),
    switchVisibleLstA: (yn) => dispatch(eventsObjList.switchVisibleLst(yn)),
    fetchEventsObjByIdA: (objId, relId) => dispatch(eventsObjList.fetchEventsObjById(objId, relId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(EventsObj)