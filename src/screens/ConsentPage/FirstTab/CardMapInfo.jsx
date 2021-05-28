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
  const mggtRef = useRef(null)

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

  const bounds = [
    [55.7757, 37.5102],
    [55.7768, 37.5148],
  ];



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
          scrollWheelZoom={false}
        >

          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">MosGeoTrest</a> '
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />


          <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
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


          <SVGOverlay
              ref={mggtRef}
              draggable={true}
              onDragend={(e, index) => {changeCoordinate(e, index)}}
              attributes={{ stroke: 'green' }}
              bounds={bounds}
          >
            <rect x="0" y="0" width="100%" height="100%" fill="purple" />
            <circle r="5" cx="10" cy="10" fill="red" />
            <text x="15%" y="60%" stroke="white">
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
