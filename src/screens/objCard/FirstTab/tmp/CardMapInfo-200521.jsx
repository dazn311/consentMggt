import React, {useCallback, useMemo, useRef, useState} from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import L, { LatLngExpression } from "leaflet";
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

import RoomIcon from '@material-ui/icons/Room';
import { makeStyles } from '@material-ui/core/styles';

import { selectObjCurrObj } from '../../../store/adminPanelTrest/objspages.selectors';




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

const positionInitial  = [55.77878422115485, 37.512232485280926];

//[55.77678422115445, 37.511232485280906]
// const center = {
//   lat: 55.778,
//   lng: 37.512,
// }

const DraggableMarker =() =>{
  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(center)
  const markerRef = useRef(null)

  const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  return (
      <Marker
          draggable={draggable}
          eventHandlers={eventHandlers}
          position={position}
          ref={markerRef}>
          icon={<RoomIcon />}
        <Popup minWidth={90}>
        <span onClick={toggleDraggable}>
          {draggable
              ? 'Можете передвигать'
              : 'Кликните тут, чтобы передвинуть'}
        </span>
        </Popup>
      </Marker>
  )
}


const center = {
  lat: 55.778,
  lng: 37.512,
}
const positionInit  = [55.7796, 37.5118];


const CardMapInfo = ({selectObjCurr}) => {
  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(positionInit)
  const markerRef = useRef(null)

  const eventHandlers = useMemo(
      () => ({
        dragend() {
          const marker = markerRef.current
          if (marker != null) {
            setPosition(marker.getLatLng())
          }
        },
      }),
      [],
  )
  const toggleDraggable = useCallback(() => {
    setDraggable((d) => !d)
  }, [])

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
  });
  L.Marker.prototype.options.icon = DefaultIcon;

  // const position  = [55.77678422115445, 37.511232485280906];

  // const center = [51.505, -0.09]

  const bounds = [
    [55.7757, 37.5102],
    [55.7768, 37.5132],
  ]

  const polyline2 = [
    [51.505, -0.09],
    [51.51, -0.1],
    [51.51, -0.12],
  ]
  const polyline = [
    [55.77678422115445, 37.511232485280906],
    [55.77678422115485, 37.512232485280936],
    [55.77778422115485, 37.511232485280956],
    [55.77678422115485, 37.511232485280956],
  ]
 // const polylineWorkZorgi = [
 //    [55.77678422115445, 37.511232485280906],
 //    [55.77678422115485, 37.512232485280936],
 //    [55.77778422115485, 37.511232485280956],
 //    [55.77678422115485, 37.511232485280956],
 //  ]

  const multiPolyline = [
    [
      [55.77878422115445, 37.511232485280906],
      [55.77778422115485, 37.513232485280936],
      [55.77878422115485, 37.512232485280956],
    ],
    [
      [55.77878422115445, 37.515232485280906],
      [55.77778422115485, 37.513232485280936],
      [55.77878422115485, 37.511232485280956],
    ],[
      [55.77878422115445, 37.515232485280906],
      [55.77578422115485, 37.513232485280936],
      [55.77778422115485, 37.512232485280956],
    ],
  ]
  // polygon 26254.667970 4443.613000
  //4577.867486,26319.590043
  // API key mggt maps  AIzaSyBMw6WfyqoSk3NM71WTwivnyq9bw7FgRyU
  const polygon1 = [
    [51.515, -0.09],
    [51.52, -0.1],
    [51.52, -0.12],
  ]
  const polygon = [
    [55.77878422115445, 37.512532485280906],//
    [55.77785422115485, 37.513232485280936],//низ правый
    [55.77798422115485, 37.511232485280956], //низ левый
    [55.77888422115485, 37.510232485280956],// вверх левый
    [55.77998422115485, 37.512432485280956], // вверх правый
  ]

  const multiPolygon = [
    [
      [51.51, -0.12],
      [51.51, -0.13],
      [51.53, -0.13],
    ],
    [
      [51.51, -0.05],
      [51.51, -0.07],
      [51.53, -0.07],
    ],
  ]

  const rectangle = [
    [55.77888422115485, 37.510232485280956],// вверх левый
    [55.77785422115485, 37.513232485280936],//низ правый
  ]

  const fillBlueOptions = { fillColor: 'purple' }
  const blackOptions = { color: 'black' }
  const limeOptions = { color: 'lime' }
  const purpleOptions = { color: 'purple' }
  const redOptions = { color: 'red' }

  const onPressRect =(text) => {
    console.log(text);
  }

  const changeCoordinate = (e, index) => {
    let newCoord = e.nativeEvent.coordinate;
    let newEditing = Object.assign({},this.state.editing);
    let newCoordinates = Object.assign({},newEditing.coordinates);
    newCoordinates[index] = newCoord;
    newEditing.coordinates = newCoordinates;
    let transformedCoords = Object.keys(newEditing.coordinates).map(function (key) { return newEditing.coordinates[key]; });
    newEditing.coordinates = transformedCoords;
    console.log('newEditing',newEditing);
    // this.setState({
    //   editing: newEditing
    // })
  }

  const updateMarker = () => {
    console.log('updateMarker')}


  return (
      <React.Fragment>
        <Map
            dragging={false}
            center={position}
            zoom={15}
            scrollWheelZoom={false} >
          {/*<GeoJSON*/}
          {/*    data={worldGeoJSON}*/}
          {/*    style={() => ({*/}
          {/*      color: '#4a83ec',*/}
          {/*      weight: 0.5,*/}
          {/*      fillColor: "#1a1d62",*/}
          {/*      fillOpacity: 1,*/}
          {/*    })}*/}
          {/*/>*/}
          <TileLayer
              attribution='&copy; <a href="http://osm.org/copyright">MosGeoTrest</a> '
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />


          <Marker
              draggable={draggable}
              eventHandlers={eventHandlers}
              position={position}
              ref={markerRef}>
            <Popup minWidth={90}>
              <span onClick={toggleDraggable}>
                {draggable
                    ? 'Можете передвигать'
                    : 'Кликните тут, чтобы передвинуть'}
              </span>
            </Popup>
          </Marker>





          {/*<Circle*/}
          {/*    draggable={draggable}*/}
          {/*    eventHandlers={eventHandlers}*/}
          {/*    center={position}*/}
          {/*    pathOptions={fillBlueOptions}*/}
          {/*    radius={30}*/}
          {/*    position={position}*/}
          {/*    ref={markerRef}*/}
          {/*/>*/}

          {/*<DraggableMarker />*/}
          <SVGOverlay draggable onDragend={(e, index) => {changeCoordinate(e, index)}}   attributes={{ stroke: 'green' }} bounds={bounds} >
            <rect x="0" y="0" width="100%" height="100%" fill="purple" />
            <circle r="5" cx="10" cy="10" fill="red" />
            <text x="30%" y="50%" stroke="white">
              МосГеоТрест
            </text>
          </SVGOverlay>

        </Map>
      </React.Fragment>

  );
}
 
const mapStateToProps = createStructuredSelector ({
  selectObjCurr: selectObjCurrObj, // события короткие данные для таблицы
});

export default connect(mapStateToProps)(CardMapInfo);
