import React, {  useEffect, useRef, useState} from 'react';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import L
    // , {LatLngExpression, Control}
    from "leaflet";
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import {
    TileLayer,
    // Popup,
    // Circle,
    CircleMarker,
    // Polyline,
    Polygon,
    // Rectangle,
    Map
    // , Marker, SVGOverlay
} from 'react-leaflet'

import "leaflet/dist/leaflet.css";

// import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';

// import {selectObjCurrObj} from '../../../../../store/adminPanelTrest/objspages.selectors';
// import {
//     activeObjAndRelSelector, eventsActiveObjSelector,
//     fullDataOfActiveObForMapForRelativesSelector, recsDataSelector
// } from '../../../../../store/consent/cons.selectors';
// import {Dialog} from "@material-ui/core";
import DialogMarkerMap from "../../../../../components/dialogMarkerMap/DialogMarkerMap";


import {  center, positionInit } from "./constants";
import {setCurrentEventOfObjAsync} from "../../../../../store/consent/events/evt.actions";
import {currentEventObjSelector} from "../../../../../store/consent/events/evt.selectors";
import {Slide} from "@material-ui/core";


let DefaultIcon = L.icon({
    iconUrl: 'https://static1.squarespace.com/static/58c9e16237c5813452abfd18/t/5ad62def352f53ede18773ba/1622151102743/',
    // iconUrl: 'https://www.pngfind.com/pngs/m/108-1083153_icon-event-notification-hd-png-download.png',
    // iconUrl: 'https://www.svgrepo.com/show/109933/election-event-on-a-calendar-with-star-symbol.svg',
    // iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: 40,
    iconAnchor: [0, 24]
});



// let greenIcon = new L.Icon({
//     iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41]
// });


///////////////////////////////////////////////////objAddress = 'Зорге, 1', objBnd = '', id = 0, setCurObj///////////////////////////////
const CardMapInfo = ({objAddress, objBnd = [], relBnd = [],  recsDataP,recsBnd, setCurrentEventOfObj,currentEventObjS}) => {
    const [openMarkerS, setOpenMarkerS] = useState(false)
    const [captionDialogS ] = useState('Задать название события')
    const [bodyMarketDialogS, setBodyMarketDialogS] = useState(objAddress)
    // const [draggable, setDraggable] = useState(true)
    const [position ] = useState(center)


    const [markers, setMarkers] = useState([])
    const [markersData, setMarkersData] = useState([])


    // const [objBndS, setObjBndS] = useState([])
    // const [eventObj, setEventObj] = useState([])
    const [purpleOptions] = useState({shapeOptions: {color: '#f00'}})
    const [yellowOptions] = useState({fillOpacity: .1, color: "orange", fill: 'red'})

    // const pathOptions= {fillOpacity: 1, color: "orange"};
    // const purpleOptions = {color: 'purple'}
    // const yellowOptions = {color: 'yellow'}


    const localMapRef = useRef(null)
    const markerRef = useRef(null)
    const markerRef1 = useRef(null)

    useEffect(() => {
        return () => {
            setCurrentEventOfObj(null)
        };
    }, [setCurrentEventOfObj]);

    useEffect(() => {
            reMapRecsDataS(recsDataP)

    },[recsDataP])

    // useEffect(() => {
    //     console.log('currentEventObjS',currentEventObjS)
    //
    // },[currentEventObjS])

    // useEffect(() => {
    //     if(markerRef.current){
    //         markerRef.current.setStyle({color:'red'})
    //     }
    //
    // },[localMapRef.current])





    const reMapRecsDataS = (evArr) => {
        //   console.log('reMapRecsDataS')
        let mapCenter = localMapRef.current.props.center
        let evArrTmp = evArr.map((evt,idx) => {
            let lat = mapCenter.lat + (idx / 3000.0)
            // let lat = 55.7450 + (idx / 3000.0)
            // console.log('idx * 0.0',idx / 10000.0)
            let newPoint = {lat: lat , lng: 37.8187 }
            return {...evt, rec_bnd: newPoint}

        })


        setMarkersData(evArrTmp)


    }

    // console.log('333 markersData',markersData)
    // console.log('recsDataS',recsDataS)


    const addMarker = (e) => {
        // console.log('addMarker latlng',e.latlng)
        const newMarkersValue = [...markers, e.latlng]
        setMarkers(newMarkersValue)
    }

    // const addEventObj = (e) => {
    //     // console.log('e.latlng',e.latlng)
    //     const newEventValue = [...eventObj, e.latlng]
    //     setEventObj(newEventValue)
    // }
    //
    // const eventHandlers =
    //     () => ({
    //         dragend() {
    //             console.log('eventHandlers dragend')
    //             const marker = markerRef.current
    //             if (marker != null) {
    //                 setPosition(marker.getLatLng())
    //                 console.log('setPosition(marker.getLatLng',marker.getLatLng())
    //             }
    //         },
    //     })

    // const eventHandlersEventMarker =
    //     (e,idx) => ({
    //         dragend() {
    //             // console.log('eventHandlersEventMarker dragend',e,idx)
    //             const marker = markerRef.current
    //             if (marker != null) {
    //                 setPosition(marker.getLatLng())
    //                 // console.log('setPosition(marker.getLatLng',marker.getLatLng())
    //             }
    //         },
    //     })

    // const toggleDraggable = useCallback(() => {
    //     setDraggable((d) => !d)
    // }, [])


    L.Marker.prototype.options.icon = DefaultIcon;

    // const bounds = [
    //     [55.7757, 37.5102],
    //     [55.7768, 37.5148],
    // ];


    // const changeCoordinate = (e, index) => {
    //     //SVGOverlay
    //     // console.log('changeCoordinate',e.nativeEvent.coordinate)
    //
    //     let newCoord = e.nativeEvent.coordinate;
    //     let newEditing = Object.assign({}, this.state.editing);
    //     let newCoordinates = Object.assign({}, newEditing.coordinates);
    //     newCoordinates[index] = newCoord;
    //     newEditing.coordinates = newCoordinates;
    //     let transformedCoords = Object.keys(newEditing.coordinates).map(function (key) {
    //         return newEditing.coordinates[key];
    //     });
    //     newEditing.coordinates = transformedCoords;
    //     // console.log('newEditing', newEditing);
    //     // this.setState({
    //     //   editing: newEditing
    //     // })
    // }

    // const updateMarker = () => {
    //     //   console.log('updateMarker')
    //
    // }

    const setBodyTxtMarker = (txt) => {
        setBodyMarketDialogS(txt)
        // console.log('setBodyTxtMarker',txt)
        //   console.log('updateMarker')

    }


    const handleMarkerClick = (e, eventPoint) =>{
        // this.setState({ currentPos: e.latlng });//
        // console.log( ' -latlng',e.latlng)
        console.log( 'eventPoint rec_id', eventPoint.rec_id)
        setCurrentEventOfObj(eventPoint.rec_id)
        setOpenMarkerS(true)
    }


    // console.log(currentEventObjS) //rec_id: 15561
    // console.log(markersData) //rec_id: 15561

    // lg('markersData')

    return (
        <Slide direction="down" in={true} mountOnEnter unmountOnExit>
            <DialogMarkerMap bodyTxt={bodyMarketDialogS} caption={captionDialogS} openMarker={openMarkerS} isOpen={false} newBodyTxt={setBodyTxtMarker} />
            <Map
                dragging={true}
                // center={centerForMap}
                center={position}
                // zoom={15}
                scrollWheelZoom={false}
                onClick={addMarker}
                bounds={objBnd}
                ref={localMapRef}
            >
                {relBnd.length  && <Polygon
                    key={1}
                    lineCap={'butt'}
                    // lineCap={'round'}
                    color={'#ff9800'}
                    opacity={0.5}
                    draggable={true}
                    pathOptions={yellowOptions}
                    positions={relBnd.length ? relBnd : objBnd}
                />}
                {Array.isArray(objBnd[0]) && <Polygon key={2} draggable={true} pathOptions={purpleOptions} positions={objBnd}/>}

                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">MosGeoTrest</a> '
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />



                {markersData.length && markersData.map((evt, idx) => {
                    let markerRefTmp = idx === 0 ? markerRef : markerRef1
                    return(<CircleMarker
                            ref={markerRefTmp}
                            opacity={evt.rec_id === currentEventObjS  ? 1 : 0.7}
                            fillColor={evt.rec_id === currentEventObjS ? 'blue' : 'green'}
                            weight={evt.rec_id === currentEventObjS ? 4 : 2}
                            radius={evt.rec_id === currentEventObjS ? 15 : 10}
                            // center={localMapRef.current.props.center}
                            center={  recsBnd.length > idx ? recsBnd[idx] : positionInit}
                            // center={evt.rec_bnd}
                            onClick={(e) => {handleMarkerClick(e, evt)}}
                            color={evt.rec_status === 5 ? 'green' : 'blue'}
                            // onClick={() => console.log('click marker')}
                            draggable={true}
                            // eventHandlers={eventHandlers}
                            // eventHandlers={(e) => eventHandlersEventMarker(e, idx)}
                            key={`markerEvt-${idx}`}
                            // position={evt.rec_bnd}
                        >
                            {/*<Popup>*/}
                            {/*    <span>({evt.rec_id}) {evt.rec_name}</span>*/}
                            {/*</Popup>*/}
                        </CircleMarker>)
                    }
                )}

            </Map>
        </Slide>

    );
}

const mapStateToProps = createStructuredSelector({
    currentEventObjS: currentEventObjSelector,
    // eventsActiveObjS: eventsActiveObjSelector,
    // selectObjCurr: selectObjCurrObj, // события короткие данные для таблицы
    // fullDataOfActiveObForMapForRelatives: fullDataOfActiveObForMapForRelativesSelector, // события короткие данные для таблицы
    // recsDataS: recsDataSelector, // события короткие данные для таблицы
    //setCurrentEventOfObjAsync
});

const mapDispatchToProps = (dispatch) => ({
    setCurrentEventOfObj: (eventId) => dispatch(setCurrentEventOfObjAsync(eventId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CardMapInfo);
