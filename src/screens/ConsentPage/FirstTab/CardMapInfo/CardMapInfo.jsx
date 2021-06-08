import React, {useCallback, useEffect, useRef, useState} from 'react';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import L, {LatLngExpression, Control} from "leaflet";
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import {
    TileLayer,
    Popup,
    Circle,
    CircleMarker,
    Polyline,
    Polygon,
    Rectangle,
    Map, Marker, SVGOverlay
} from 'react-leaflet'

import "leaflet/dist/leaflet.css";

import {selectObjCurrObj} from '../../../../store/adminPanelTrest/objspages.selectors';
import {fullDataOfActiveObForMapForRelativesSelector} from '../../../../store/consent/cons.selectors';

const positionPolygon = [[55.75357268949394, 37.75417459778939],
    [55.753563806668716, 37.75412676094323],
    [55.75356383959776, 37.75411083479522],
    [55.75355495674767, 37.75406299797433],
    [55.75354607387895, 37.75401516117512],
    [55.7535461067935, 37.753999235034215],
    [55.75352824227499, 37.75395133990926]]

const center = {
    lat: 55.753563806668716,
    lng: 37.75412676094323,
}
const positionInit = [55.75354607387895, 37.75401516117512];


let DefaultIcon = L.icon({
    iconUrl: 'https://www.svgrepo.com/show/109933/election-event-on-a-calendar-with-star-symbol.svg',
    // iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: 40,
    iconAnchor: [0, 24]
});

// let EventIcon = L.icon({
//     iconUrl: 'https://icons-for-free.com/iconfiles/png/512/svg+building+location+commercial+company+location+map+position-1320184909217004638.png',
//     // iconUrl: icon,
//     shadowUrl: iconShadow,
//     iconSize: 30
// });

let greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});


///////////////////////////////////////////////////objAddress = 'Зорге, 1', objBnd = '', id = 0, setCurObj///////////////////////////////
const CardMapInfo = ({objAddress, objBnd = [], relBnd = [], fullDataOfActiveObForMapForRelatives, setCurObj}) => {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const [markers, setMarkers] = useState([])
    // const [objBndS, setObjBndS] = useState([])
    const [eventObj, setEventObj] = useState([])
    const [purpleOptions] = useState({shapeOptions: {color: '#f00'}})
    const [yellowOptions] = useState({fillOpacity: .1, color: "orange", fill: 'red'})

    // const pathOptions= {fillOpacity: 1, color: "orange"};
    // const purpleOptions = {color: 'purple'}
    // const yellowOptions = {color: 'yellow'}
    const markerRef = useRef(null)


    const addMarker = (e) => {
        // console.log('e.latlng',e.latlng)
        const newMarkersValue = [...markers, e.latlng]
        setMarkers(newMarkersValue)
    }

    const addEventObj = (e) => {
        // console.log('e.latlng',e.latlng)
        const newEventValue = [...eventObj, e.latlng]
        setEventObj(newEventValue)
    }

    const eventHandlers =
        () => ({
            dragend() {
                // console.log('eventHandlers dragend')
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        })

    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])


    L.Marker.prototype.options.icon = DefaultIcon;

    const bounds = [
        [55.7757, 37.5102],
        [55.7768, 37.5148],
    ];


    const changeCoordinate = (e, index) => {
        //SVGOverlay
        // console.log('changeCoordinate',e.nativeEvent.coordinate)

        let newCoord = e.nativeEvent.coordinate;
        let newEditing = Object.assign({}, this.state.editing);
        let newCoordinates = Object.assign({}, newEditing.coordinates);
        newCoordinates[index] = newCoord;
        newEditing.coordinates = newCoordinates;
        let transformedCoords = Object.keys(newEditing.coordinates).map(function (key) {
            return newEditing.coordinates[key];
        });
        newEditing.coordinates = transformedCoords;
        // console.log('newEditing', newEditing);
        // this.setState({
        //   editing: newEditing
        // })
    }

    const updateMarker = () => {
        //   console.log('updateMarker')

    }

    // let polRel = null

    // useEffect(() => {
    //     if (Array.isArray(relBnd[0])) {
    //
    //         polRel = <Polygon draggable={true} pathOptions={yellowOptions} positions={relBnd}/>
    //         if (polRel) {
    //             polRel.on('mouseover', function (e) {
    //                 polRel.setStyle({
    //                     fillOpacity: 0.4
    //                 });
    //             });
    //             polRel.on('mouseout', function (e) {
    //                 polRel.setStyle({
    //                     fillOpacity: 0
    //                 });
    //             });
    //         }
    //
    //     }
    //
    // }, [relBnd])

    // useEffect(() => {
    //     if (Array.isArray(relBnd[0])) {
    //
    //         if(relBnd.length && Array.isArray(relBnd[0])){
    //             console.log('relBnd', JSON.stringify(relBnd))
    //             polRel =  <Polygon key={1} color={'#ff9800'} opacity={0.5} draggable={true} pathOptions={yellowOptions} positions={relBnd}/>
    //         }
    //     }
    //
    //
    //
    // }, [relBnd])


    return (
        <React.Fragment>
            {/*<div style={{position:'absolute', zIndex: 1000, left:40, top: 33 }}>*/}
            {/*    <Poly*/}
            {/*        sides={4}*/}
            {/*        cx={50}*/}
            {/*        cy={50}*/}
            {/*        width={100}*/}
            {/*        height={100}*/}
            {/*        r={30}*/}
            {/*        stroke={"#18efff"}*/}
            {/*        fill={'#66339970'}*/}
            {/*    />*/}
            {/*    <Poly sides={5} r={30} fill={"red"} stroke={"none"} />*/}
            {/*</div>*/}
            <Map
                dragging={true}
                // center={centerForMap}
                center={position}
                // zoom={15}
                scrollWheelZoom={false}
                onClick={addMarker}
                bounds={objBnd}
            >

                {relBnd.length && Array.isArray(relBnd[0]) && <Polygon key={1} color={'#ff9800'} opacity={0.5} draggable={true} pathOptions={yellowOptions} positions={relBnd}/>}
                {Array.isArray(objBnd[0]) && <Polygon key={2} draggable={true} pathOptions={purpleOptions} positions={objBnd}/>}
                {/*{polRel && polRel}*/}
                {/*{markers.length === 4 && <Polygon pathOptions={yellowOptions} positions={markers} />}*/}
                {/*{markers[0] && <Circle color={'#343444'}*/}
                {/*                       fillColor={'#34FF44'} radius={20} cender={ [markers[0].lat,markers[0].lng]} />}*/}


                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">MosGeoTrest</a> '
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />


                <Marker
                    draggable={draggable}
                    eventHandlers={eventHandlers}
                    icon={greenIcon}
                    // icon={EventIcon}
                    position={center}
                    ref={markerRef}
                >

                    <Popup minWidth={90}>
                      <span onClick={toggleDraggable}>
                        {draggable
                            ? 'Можете передвигать'
                            : 'Кликните тут, чтобы передвинуть'}
                      </span>
                    </Popup>
                </Marker>

                {/*{Array.isArray(relBnd[0])*/}
                {/*&& <SVGOverlay*/}
                {/*    // ref={mggtRef}*/}
                {/*    draggable={true}*/}
                {/*    onDragend={(e, index) => {*/}
                {/*        changeCoordinate(e, index)*/}
                {/*    }}*/}
                {/*    attributes={{stroke: 'green'}}*/}
                {/*    // bounds={[[markers[1].lat,markers[1].lng],[markers[2].lat,markers[2].lng]]}*/}
                {/*    bounds={relBnd}*/}
                {/*>*/}
                {/*    <rect x="0" y="0" width="100%" height="100%" fill="purple"/>*/}
                {/*    <circle r="5" cx="10" cy="10" fill="red"/>*/}
                {/*    <text x="15%" y="60%" stroke="white">*/}
                {/*        Новое событие*/}
                {/*    </text>*/}
                {/*</SVGOverlay>*/}
                {/*}*/}


                {markers.map((position, idx) =>
                    <Marker draggable={draggable} key={`marker-${idx}`} position={position}>
                        <Popup>
                            <span>Новое событие</span>
                        </Popup>
                    </Marker>
                )}

            </Map>
        </React.Fragment>

    );
}

const mapStateToProps = createStructuredSelector({
    selectObjCurr: selectObjCurrObj, // события короткие данные для таблицы
    fullDataOfActiveObForMapForRelatives: fullDataOfActiveObForMapForRelativesSelector, // события короткие данные для таблицы
});

export default connect(mapStateToProps)(CardMapInfo);
