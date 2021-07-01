import React, {useCallback, useEffect, useState} from 'react';
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

const InfoPanel = () => {
    return (
        <div style={{borderLeft: '1px solid grey', marginLeft: 4, paddingLeft: 4}}>
            <div style={{ backgroundColor: '#00008b78', paddingLeft: 4,
                paddingRight: 4, marginBottom: 3}}>
                Вы иниц-ли
            </div>
            <div
                style={{
                    // borderLeft: '1px solid grey',
                    paddingLeft: 4,
                    paddingRight: 4,
                    backgroundColor: 'rgb(255 152 0 / 38%)',
                    marginBottom: 3
                }}>
                Смежник
            </div>
            <div
                style={{
                    // borderLeft: '1px solid grey',
                    backgroundColor: 'rgb(255 0 0 / 27%)',
                    paddingLeft: 4,
                    paddingRight: 4,
                }}
            >Вы сами
                себе
            </div>
        </div>
    )
}
const FilterBnt = ({eventsFilterID, setEvFilter}) => {
    return (
        <div style={{
            marginLeft: -30,
            bottom: 33,
            display: 'flex',
            flexDirection: 'column',
            // position: 'absolute'
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
    )
}

const filterLst = ({eventsFilterID, actObjAndRelS, eventsList, setFilterEvnLst}) => {
    let objID = actObjAndRelS[0].id
    let relID = actObjAndRelS[1].id
    let newList = eventsList
    if (eventsFilterID === 1) {// события из списка событий и rel
        newList = eventsList.filter(ev => {
            let receipSend = [ev.sender.objectID, ev.receip.objectID].join(',')
            return receipSend.includes(objID.toString()) && receipSend.includes(relID.toString())
        })
        setFilterEvnLst(newList)

    } else if (eventsFilterID === 2) {// события завершенные
        // console.log('66 eventsFilterID === 2', eventsFilterID)

        newList = eventsList.filter(ev => ev.rec_status === 5)
        setFilterEvnLst(newList)
    } else {
        // console.log('66 else', eventsFilterID)
        setFilterEvnLst(eventsList)
    }
}

const EventsObj = ({actObjAndRelS, visibleEventsObjS, switchVisibleLstA, fetchEventsObjByIdA}) => {
    const [eventsList, setEventsList] = useState([])
    const [eventsFilterID, setEventsFilterID] = useState(0)
    const [filterEvnLst, setFilterEvnLst] = useState([])
    const [visibleListS, setVisibleListS] = useState(true)
    // console.log('3735 actObjAndRelS', actObjAndRelS)
    // let relId = actObjAndRelS[1].id

    useEffect( () => {
        let objId = actObjAndRelS[0].id
        // if (objId > 1 && relId > 1) {
        if (objId > 1 ) {
            let fetchData = async () => {
                let {data} = await axios.post('https://ismggt.ru/query/object/recs/list', {"objectID": objId, "limit": 110, "offset": 0})
                if(data.amount){
                    let newList = data.data.recs //.data.recs
                    // console.log(newList)
                    setEventsFilterID(0)
                    setEventsList(newList)
                }
            }
            fetchData()

            // fetchEventsObjByIdA(objId, relId);
        }
    }, [actObjAndRelS])

    const switchVisibleLst = useCallback(() => {
        switchVisibleLstA(visibleListS)
        setVisibleListS(prev => prev = !prev)
    }, [visibleListS,switchVisibleLstA,setVisibleListS])

    useEffect(() => {
        filterLst({eventsFilterID, actObjAndRelS, eventsList, setFilterEvnLst})
    }, [eventsFilterID, eventsList, actObjAndRelS,setFilterEvnLst])

    const setEvFilter = useCallback((evt) => {
        setEventsFilterID(evt)
    }, [])

    // console.log('3737 eventsList',eventsList)

    return (
        <>
            <EventsListPanel visibleList={visibleListS} switchVisibleLst={switchVisibleLst} eventsList={filterEvnLst}/>
            <div style={{marginLeft: 74, display: visibleListS ? 'flex' : 'none', position: 'relative'}}>
                <FilterBnt eventsFilterID={eventsFilterID} setEvFilter={setEvFilter}/>
                <InfoPanel/>
            </div>
        </>
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