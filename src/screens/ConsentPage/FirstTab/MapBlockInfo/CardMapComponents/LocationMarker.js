import React, {useState} from 'react';

import * as L from 'leaflet';
import 'proj4leaflet';

import iconShadow from 'leaflet/dist/images/marker-shadow.png';

//
import {
    Popup,
    Marker
} from 'react-leaflet'

import "leaflet/dist/leaflet.css";


const LocationMarker = () => {
    const [position, setPosition] = useState(null)
    const map = L.useMapEvents({
        click() {
            map.locate()
        },
        locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, map.getZoom())
        },
    })

    return position === null ? null : (
        <Marker position={position}>
            <Popup>You are here</Popup>
        </Marker>
    )
}

export default LocationMarker
