import React, {useCallback, useMemo, useRef, useState} from "react";
import {Marker, Popup, Polygon} from "react-leaflet";
import RoomIcon from "@material-ui/icons/Room";

const center = {
    lat: 55.778,
    lng: 37.512,
}

const ObjPolygon = () => {
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
        <Polygon
            draggable={true}
            eventHandlers={eventHandlers}
            position={position}
        >
            icon={<RoomIcon/>}
            <Popup minWidth={90}>
                <span  >
                   'Можете передвигать'
                </span>
            </Popup>
        </Polygon>
    )
}

export default ObjPolygon