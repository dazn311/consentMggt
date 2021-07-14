import React, {useCallback, useMemo, useRef, useState} from 'react';

import L from "leaflet";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import {
  TileLayer,
  Popup,
  Map, Marker, SVGOverlay
} from 'react-leaflet'
import "leaflet/dist/leaflet.css";

// const positionInitial  = [55.77878422115485, 37.512232485280926];
//
// const center = { lat: 55.778, lng: 37.512 }
const positionInit  = [55.7796, 37.5118];
const bounds = [ [55.7757, 37.5102], [55.7768, 37.5148] ];

const CardMapInfo = ( ) => {
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

  const toggleDraggable = useCallback(() => { setDraggable((d) => !d) }, [])
  L.Marker.prototype.options.icon = L.icon({ iconUrl: icon, shadowUrl: iconShadow });

  const changeCoordinate = (e, index) => {
    let newCoordinate = e.nativeEvent.coordinate;
    let newEditing = Object.assign({},this.state.editing);
    let newCoordinates = Object.assign({},newEditing.coordinates);
    newCoordinates[index] = newCoordinate;
    newEditing.coordinates = newCoordinates;
    newEditing.coordinates = Object.keys(newEditing.coordinates).map(function (key) { return newEditing.coordinates[key]; });
    console.log('newEditing',newEditing);
  }

  return (
      <React.Fragment>
        <Map dragging={false} center={position} zoom={15} scrollWheelZoom={false} >

          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">MosGeoTrest</a> '
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  />

          <Marker draggable={draggable}  eventHandlers={eventHandlers} position={position} ref={markerRef} >
            <Popup minWidth={90}>
              <span onClick={toggleDraggable}>
                {draggable
                    ? 'Можете передвигать'
                    : 'Кликните тут, чтобы передвинуть'}
              </span>
            </Popup>
          </Marker>

          <SVGOverlay ref={mggtRef}  draggable={true}  onDragend={(e, index) => {changeCoordinate(e, index)}}
              attributes={{ stroke: 'green' }} bounds={bounds} >

            <rect x="0" y="0" width="100%" height="100%" fill="purple" />
            <circle r="5" cx="10" cy="10" fill="red" />
            <text x="15%" y="60%" stroke="white">МосГеоТрест</text>

          </SVGOverlay>

        </Map>
      </React.Fragment>

  );
}


export default CardMapInfo
