import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import L, {LatLngExpression, Control} from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// import  {  Marker, Map, SVGOverlay, TileLayer, Popup } from "leaflet";
// import  { EditControl } from "react-leaflet-draw";
// import worldGeoJSON from 'geojson-world-map';

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

// import RoomIcon from '@material-ui/icons/Room';
import {makeStyles} from '@material-ui/core/styles';

import {selectObjCurrObj} from '../../../store/adminPanelTrest/objspages.selectors';
import Poly from "react-svg-polygon/package-publish/Poly";
// import 'node_modules/leaflet-geosearch/dist/geosearch.css';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        maxHeight: '70vh',
        overflow: 'auto',
        border: '1px solid #8080802e',
        padding: 4,
        margin: window.innerWidth < 500 ? '0px' : '4px 8px',
        marginTop: window.innerWidth < 500 ? '8px' : ' 4px',
    },
    span: {
        color: theme.palette.primary.main
    },
    red: {
        color: theme.palette.redLight
    },
    purple: {
        color: theme.palette.purple
    }
}));

const positionInitial = [55.77878422115485, 37.512232485280926]; //улица Зорге, 1


const positionPolygon = [[ 55.75357268949394,37.75417459778939  ],
    [55.753563806668716 ,37.75412676094323  ],
    [ 55.75356383959776,  37.75411083479522],
    [  55.75355495674767,37.75406299797433 ],
    [ 55.75354607387895,  37.75401516117512],
    [  55.7535461067935,37.753999235034215 ],
    [  55.75352824227499,37.75395133990926 ]]

const center = {
    lat: 55.753563806668716,
    lng: 37.75412676094323,
}
const positionInit = [55.75354607387895,  37.75401516117512];







//////////////////////////////////////////////////////////////////////////////////
const CardMapInfo = ({objBnd}) => {
    const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(center)
    const [markers, setMarkers] = useState([])
    const [eventObj, setEventObj] = useState([])
    const markerRef = useRef(null)
    const mggtRef = useRef(null)

    useEffect(() => {
        console.log('pos',position)
    },[position])

    useEffect(() => {
        console.log('markers',markers)
    },[markers])

    const addMarker = (e) => {
        console.log('e.latlng',e.latlng)
        const newMarkersValue = [...markers, e.latlng]
        setMarkers(newMarkersValue)
    }

    const addEventObj = (e) => {
        console.log('e.latlng',e.latlng)
        const newEventValue = [...eventObj, e.latlng]
        setEventObj(newEventValue)
    }

    const eventHandlers =
        () => ({
            dragend() {
                console.log('eventHandlers dragend')
                const marker = markerRef.current
                if (marker != null) {
                    setPosition(marker.getLatLng())
                }
            },
        })

    const toggleDraggable = useCallback(() => {
        setDraggable((d) => !d)
    }, [])

    let DefaultIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow
    });
    L.Marker.prototype.options.icon = DefaultIcon;

    const bounds = [
        [55.7757, 37.5102],
        [55.7768, 37.5148],
    ];


    const changeCoordinate = (e, index) => {
        //SVGOverlay
        console.log('changeCoordinate',e.nativeEvent.coordinate)

        let newCoord = e.nativeEvent.coordinate;
        let newEditing = Object.assign({}, this.state.editing);
        let newCoordinates = Object.assign({}, newEditing.coordinates);
        newCoordinates[index] = newCoord;
        newEditing.coordinates = newCoordinates;
        let transformedCoords = Object.keys(newEditing.coordinates).map(function (key) {
            return newEditing.coordinates[key];
        });
        newEditing.coordinates = transformedCoords;
        console.log('newEditing', newEditing);
        // this.setState({
        //   editing: newEditing
        // })
    }

    const updateMarker = () => {
        console.log('updateMarker')

    }
    const purpleOptions = { color: 'purple' }
    const yellowOptions = { color: 'yellow' }

    // console.log('markers[0]',markers[0])
    // console.log('centerMap',centerMap)
    let centerMap = objBnd && objBnd[objBnd.length / 2];
    console.log('centerMap',centerMap)
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
                center={objBnd ? centerMap :center}
                // center={objBnd ? objBnd[0] :center}
                zoom={15}
                scrollWheelZoom={false}
                onClick={ addMarker}
            >
                <Control position='topright' />



                {objBnd && <Polygon draggable={true} pathOptions={purpleOptions} positions={objBnd} />}
                {markers.length === 4 && <Polygon pathOptions={yellowOptions} positions={markers} />}
                {/*{markers[0] && <Circle color={'#343444'}*/}
                {/*                       fillColor={'#34FF44'} radius={20} cender={ [markers[0].lat,markers[0].lng]} />}*/}



                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">MosGeoTrest</a> '
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />


                <Marker
                    draggable={draggable}
                    eventHandlers={eventHandlers}
                    color={'red'}
                    position={objBnd ? objBnd[0] :position}
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

                {/*{ markers[2]*/}
                {/*&& <SVGOverlay*/}
                {/*    ref={mggtRef}*/}
                {/*    draggable={true}*/}
                {/*    onDragend={(e, index) => {*/}
                {/*        changeCoordinate(e, index)*/}
                {/*    }}*/}
                {/*    attributes={{stroke: 'green'}}*/}
                {/*    bounds={[[markers[1].lat,markers[1].lng],[markers[2].lat,markers[2].lng]]}*/}
                {/*    // bounds={bounds}*/}
                {/*>*/}
                {/*    <rect x="0" y="0" width="100%" height="100%" fill="purple"/>*/}
                {/*    <circle r="5" cx="10" cy="10" fill="red"/>*/}
                {/*    <text x="15%" y="60%" stroke="white">*/}
                {/*        Новое событие*/}
                {/*    </text>*/}
                {/*</SVGOverlay>*/}
                {/*}*/}



                {/*{ markers.map((position, idx) =>*/}
                {/*    <Marker draggable={draggable} key={`marker-${idx}`} position={position}>*/}
                {/*        <Popup>*/}
                {/*            <span>Новое событие</span>*/}
                {/*        </Popup>*/}
                {/*    </Marker>*/}
                {/*)}*/}

            </Map>
        </React.Fragment>

    );
}

const mapStateToProps = createStructuredSelector({
    selectObjCurr: selectObjCurrObj, // события короткие данные для таблицы
});

export default connect(mapStateToProps)(CardMapInfo);
