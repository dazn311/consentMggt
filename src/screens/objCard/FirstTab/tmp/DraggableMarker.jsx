import React, {useCallback, useMemo, useRef, useState} from 'react';

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

const positionInitial  = [55.77878422115485, 37.512232485280926];

//[55.77678422115445, 37.511232485280906]
const center = {
  lat: 55.77878,
  lng: 37.5122,
}


const DraggableMarker =() => {
    const [draggable, setDraggable] = useState(true)
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
      <React.Fragment>
        <Marker
            draggable={draggable}
            eventHandlers={eventHandlers}
            position={position}
            ref={markerRef}>
            <Popup minWidth={90}>
            <span onClick={toggleDraggable}>
          {draggable
            ? 'Можете передвигать'
            : 'Повторите клик, чтобы передвинуть'}
            </span>
            </Popup>
        </Marker>
      </React.Fragment>

  );
}


export default DraggableMarker
