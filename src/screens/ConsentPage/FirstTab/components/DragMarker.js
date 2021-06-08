import React, {useCallback, useMemo, useRef, useState} from "react";
import {Marker, Popup} from "react-leaflet";
import RoomIcon from "@material-ui/icons/Room";

const center = {
    lat: 55.778,
    lng: 37.512,
}

const DragMarker = () => {
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
            icon={<RoomIcon/>}
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

export default DragMarker