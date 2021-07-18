import React, {useRef, useState} from 'react';

import * as L from 'leaflet';
import 'proj4leaflet';

import iconShadow from 'leaflet/dist/images/marker-shadow.png';
// import {ZoomControl} from './ZoomControl';

import {
    // MapComponent,
    TileLayer,
    // Popup,
    // Circle,
    // CircleMarker,
    // Polyline,
    Polygon,
    // Rectangle,
    Map,
    // Marker

    // SVGOverlay
} from 'react-leaflet'

import "leaflet/dist/leaflet.css";

let DefaultIcon = L.icon({
    iconUrl: 'https://static1.squarespace.com/static/58c9e16237c5813452abfd18/t/5ad62def352f53ede18773ba/1622151102743/',
    shadowUrl: iconShadow,
    iconSize: 40,
    iconAnchor: [0, 24]
});
//


///////////////////////////////////////////////////objAddress = 'Зорге, 1', objBnd = '', id = 0, setCurObj///////////////////////////////
const CardMapInfo = ({bnd, showMap = false}) => {
    const [purpleOptions] = useState({shapeOptions: {color: '#f00'}})
    const [yellowOptions] = useState({fillOpacity: .1, color: "orange", fill: 'red'})

    const localMapRef = useRef(null)
    // const zoomMapRef = useRef(null)

    L.Marker.prototype.options.icon = DefaultIcon;

    return (
            <Map  key={'map567890'}
                 dragging={true}
                 zoom={15}
                 scrollWheelZoom={false}
                 bounds={bnd.objBnd && bnd.objBnd.coordinates}
                 ref={localMapRef}
                // crs={L.CRS.EPSG4326}
                // crs={crsMos}
                // CRS
            >
                {bnd.relBnd
                && <Polygon
                    key={1}
                    lineCap={'butt'}
                    color={'#ff9800'}
                    opacity={0.5}
                    draggable={true}
                    pathOptions={yellowOptions}
                    positions={bnd.relBnd ? bnd.relBnd.coordinates : []}
                />}

                {bnd.objBnd &&
                // && <TileLayer>
                    <Polygon key={2} draggable={true} pathOptions={purpleOptions} positions={bnd.objBnd.coordinates}/>

                // </TileLayer>
                    }
                    {/*<ZoomControl positions={bnd.objBnd.coordinates} ref={zoomMapRef}  />*/}


                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">MosGeoTrest</a> '
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

            </Map>
    );
}


export default CardMapInfo


// import AssistantPhotoIcon from '@material-ui/icons/AssistantPhoto';

// import DialogMarkerMap from "../../../../../components/dialogMarkerMap/DialogMarkerMap";

// import {  center, positionInit } from "./constants";

// import WKT from "terraformer-wkt-parser";


// const [openMarkerS, setOpenMarkerS] = useState(false)
// const [captionDialogS ] = useState('Задать название события')
// const [bodyMarketDialogS, setBodyMarketDialogS] = useState(objAddress)
// // const [draggable, setDraggable] = useState(true)
// const [position ] = useState(center)
//
//
// const [markers, setMarkers] = useState([])
// const [markersData, setMarkersData] = useState([])


// const [objBndS, setObjBndS] = useState([])
// const [eventObj, setEventObj] = useState([])


// const pathOptions= {fillOpacity: 1, color: "orange"};
// const purpleOptions = {color: 'purple'}
// const yellowOptions = {color: 'yellow'}

//
// const reMapRecsDataS = (evArr) => {
//     //   console.log('reMapRecsDataS')
//     let mapCenter = localMapRef.current.props.center
//     let evArrTmp = evArr.map((evt,idx) => {
//         let lat = mapCenter.lat + (idx / 3000.0)
//         // let lat = 55.7450 + (idx / 3000.0)
//         // console.log('idx * 0.0',idx / 10000.0)
//         let newPoint = {lat: lat , lng: 37.8187 }
//         return {...evt, rec_bnd: newPoint}
//
//     })
//
//
//     setMarkersData(evArrTmp)
//
//
// }

// console.log('333 markersData',markersData)
// console.log('recsDataS',recsDataS)

//
// const addMarker = (e) => {
//     // console.log('addMarker latlng',e.latlng)
//     const newMarkersValue = [...markers, e.latlng]
//     setMarkers(newMarkersValue)
// }

//
// const setBodyTxtMarker = (txt) => {
//     setBodyMarketDialogS(txt)
//     // console.log('setBodyTxtMarker',txt)
//     //   console.log('updateMarker')
//
// }
//
//
// const handleMarkerClick = (e, eventPoint) =>{
//     // this.setState({ currentPos: e.latlng });//
//     // console.log( ' -latlng',e.latlng)
//     console.log( 'eventPoint rec_id', eventPoint.rec_id)
//     // setCurrentEventOfObj(eventPoint.rec_id)
//     setOpenMarkerS(true)
// }


// console.log(currentEventObjS) //rec_id: 15561
// console.log(markersData) //rec_id: 15561


// const polGeo = 'POLYGON((5648.076235 -7621.028963,5628.444000 -7617.194000,5627.582231 -7616.991185,5624.590921 -7616.255664,5622.877114 -7615.838302,5619.262881 -7615.269384,5618.042906 -7615.734453,5617.557288 -7615.919577,5615.851695 -7616.772954,5614.430368 -7617.829516,5613.130868 -7619.089263,5612.278072 -7620.349011,5588.469422 -7613.851321,5586.486500 -7609.859270,5585.342423 -7607.850649,5583.298061 -7604.261423,5581.136810 -7600.466980,5581.104418 -7600.414228,5580.454000 -7599.355000,5575.755000 -7591.562000,5576.086000 -7587.507000,5576.290000 -7586.215000,5575.941235 -7586.374542,5576.401000 -7583.750000,5576.742683 -7583.532785,5579.108000 -7570.200000,5579.695446 -7566.958561,5581.041940 -7559.531710,5581.195210 -7558.787070,5580.750000 -7558.924000,5578.913000 -7559.680000,5578.321314 -7559.982131,5575.539698 -7561.368783,5576.339370 -7554.307020,5573.322000 -7553.821000,5570.239000 -7552.585000,5570.760476 -7550.998205,5565.351837 -7549.019182,5560.642433 -7547.758727,5556.881000 -7546.517000,5550.700000 -7544.782000,5547.570996 -7543.990269,5547.317000 -7543.926000,5544.666282 -7543.118208,5543.789079 -7546.181158,5542.839271 -7549.781222,5540.332280 -7559.283489,5537.500253 -7570.017741,5537.015000 -7571.857000,5533.556306 -7584.797956,5531.852646 -7591.172322,5531.700592 -7591.741241,5530.918360 -7594.668020,5528.473070 -7593.974820,5523.970000 -7592.806000,5523.337000 -7601.180000,5524.003000 -7605.684000,5520.423000 -7607.248000,5519.325000 -7607.787000,5518.512000 -7608.150000,5517.708000 -7608.512000,5516.736000 -7608.902000,5516.023000 -7609.249000,5515.241000 -7609.606000,5514.223000 -7610.007000,5513.404000 -7610.369000,5512.550000 -7610.801000,5512.144457 -7610.947773,5512.047593 -7610.982829,5529.433903 -7636.966102,5529.572538 -7636.993469,5530.452000 -7636.495000,5531.555600 -7638.265048,5534.319252 -7643.959281,5540.906952 -7656.077613,5545.064830 -7663.256716,5548.941193 -7670.077099,5550.312933 -7672.466311,5552.866098 -7676.480728,5559.062102 -7685.992834,5561.940779 -7690.145252,5565.413124 -7695.154019,5565.975118 -7695.944145,5571.461495 -7703.657621,5573.573122 -7706.880591,5575.827000 -7712.326000,5580.306991 -7720.817326,5580.199000 -7720.826000,5578.811904 -7726.059582,5576.079924 -7736.367482,5576.171808 -7736.392933,5585.275499 -7738.914610,5585.775903 -7739.056207,5590.486000 -7740.389000,5601.092000 -7743.387000,5606.375138 -7744.834364,5609.501001 -7745.690723,5620.839911 -7748.454927,5621.480360 -7748.619540,5627.656098 -7750.000000,5630.202830 -7750.569270,5639.595349 -7752.402958,5640.228490 -7748.855550,5642.188640 -7748.517400,5642.741450 -7746.088220,5643.604350 -7739.357100,5643.986550 -7735.892100,5644.747380 -7729.999890,5645.471636 -7724.159444,5647.088900 -7711.117720,5649.476440 -7693.353810,5652.146130 -7673.785870,5655.968000 -7646.184000,5656.326297 -7643.846203,5658.359573 -7630.579607,5658.790138 -7627.770277,5659.401446 -7623.801026,5657.359000 -7623.325000,5648.076235 -7621.028963))'
//
// const bndMSK = [[5648.076235, -7621.028963],[5628.444000, -7617.194000]]
// let geoJson = (poly) => WKT.parse(poly)


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

// lg('markersData')
// console.log('objBnd',objBnd)
// console.log('bnd',bnd )
// console.log('geoJson(polGeo)',geoJson(polGeo).coordinates[0][0] )
// if(!bnd.objBnd){
//     return <div>"objBnd === null"</div>
// }


// let greenIcon = new L.Icon({
//     iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
//     shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
//     iconSize: [25, 41],
//     iconAnchor: [12, 41],
//     popupAnchor: [1, -34],
//     shadowSize: [41, 41]
// });


// const mapStateToProps = createStructuredSelector({
//     currentEventObjS: currentEventObjSelector,
// eventsActiveObjS: eventsActiveObjSelector,
// selectObjCurr: selectObjCurrObj, // события короткие данные для таблицы
// fullDataOfActiveObForMapForRelatives: fullDataOfActiveObForMapForRelativesSelector, // события короткие данные для таблицы
// recsDataS: recsDataSelector, // события короткие данные для таблицы
//setCurrentEventOfObjAsync
// });

// const mapDispatchToProps = (dispatch) => ({
//     setCurrentEventOfObj: (eventId) => dispatch(setCurrentEventOfObjAsync(eventId)),
// });


// {markersData.length && markersData.map((evt, idx) => {
//                     let markerRefTmp = idx === 0 ? markerRef : markerRef1
//                     return(<CircleMarker
//                             ref={markerRefTmp}
//                             opacity={evt.rec_id === currentEventObjS  ? 1 : 0.7}
//                             fillColor={evt.rec_id === currentEventObjS ? 'blue' : 'green'}
//                             weight={evt.rec_id === currentEventObjS ? 4 : 2}
//                             radius={evt.rec_id === currentEventObjS ? 15 : 10}
//                             // center={localMapRef.current.props.center}
//                             center={  recsBnd.length > idx ? recsBnd[idx] : positionInit}
//                             // center={evt.rec_bnd}
//                             onClick={(e) => {handleMarkerClick(e, evt)}}
//                             color={evt.rec_status === 5 ? 'green' : 'blue'}
//                             // onClick={() => console.log('click marker')}
//                             draggable={true}
//                             // eventHandlers={eventHandlers}
//                             // eventHandlers={(e) => eventHandlersEventMarker(e, idx)}
//                             key={`markerEvt-${idx}`}
//                             // position={evt.rec_bnd}
//                         >
//                             {/*<Popup>*/}
//                             {/*    <span>({evt.rec_id}) {evt.rec_name}</span>*/}
//                             {/*</Popup>*/}
//                         </CircleMarker>)
//                     }
//                 )}


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


// useEffect(() => {
//     return () => {
//         setCurrentEventOfObj(null)
//     };
// }, [setCurrentEventOfObj]);
//
// useEffect(() => {
//         reMapRecsDataS(recsDataP)
//
// },[recsDataP])

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


//<Slide direction="down" in={showMap} mountOnEnter unmountOnExit ref={sliderRef} timeout={2000} children={localMapRef}>
//             <Map key={'map567890'}
//                  dragging={true}
//                  zoom={15}
//                  scrollWheelZoom={false}
//                  bounds={bnd.objBnd && bnd.objBnd.coordinates}
//                  ref={localMapRef}
//                 // crs={L.CRS.EPSG4326}
//                 // crs={crsMos}
//                 // CRS
//             >
//                 {bnd.relBnd
//                 && <Polygon
//                     key={1}
//                     lineCap={'butt'}
//                     color={'#ff9800'}
//                     opacity={0.5}
//                     draggable={true}
//                     pathOptions={yellowOptions}
//                     positions={bnd.relBnd ? bnd.relBnd.coordinates : []}
//                 />}
//
//                 {bnd.objBnd &&
//                 // && <TileLayer>
//                     <Polygon key={2} draggable={true} pathOptions={purpleOptions} positions={bnd.objBnd.coordinates}/>
//
//                 // </TileLayer>
//                     }
//
//                 <TileLayer
//                     attribution='&copy; <a href="http://osm.org/copyright">MosGeoTrest</a> '
//                     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                 />
//
//             </Map>
//         </Slide>



// import {Slide} from "@material-ui/core";

// import {Slide} from "@material-ui/core";
//
// let DefaultIcon = L.icon({
//     iconUrl: 'https://static1.squarespace.com/static/58c9e16237c5813452abfd18/t/5ad62def352f53ede18773ba/1622151102743/',
//     shadowUrl: iconShadow,
//     iconSize: 40,
//     iconAnchor: [0, 24]
// });
//
//
// const def_msk = '+proj=tmerc +lat_0=55.6666666667 +lon_0=37.5 +x_0=0 +y_0=0 +k_0=1. +a=6377397 +rf=299.15 +towgs84=396,165,557.7,-0.05,0.04,0.01,0 +no_defs';



// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import L from "proj4leaflet";
// import L from "leaflet";


// let crsMos = new L.Proj.CRS('EPSG:4326',def_msk, {resolutions: [8192, 4096, 2048, 1024, 512, 256, 128]})
// let crsMos = new L.Proj.CRS('EPSG:8901', '+proj=utm +zone=32 +ellps=GRS80 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs',
//     {
//         resolutions: [
//             131073, 65537, 32769, 16385, 8193, 4097, 2049, 1025, 513, 257,
//             129,
//             65, 33, 17, 9, 5, 3, 2
//         ],
//         origin: [9629.222929, -1987.333308],
//         bounds:  L.bounds( [9629.056505, -1989.108605], [9629.222929, -1987.333308]),
//     })
////9629.056505 -1989.108605,9629.222929 -1987.333308,

// let map = L.map('map', {
//     crs: crsMos,
//     zoomControl: false,
//     zoomSnap: 0.1,
//     continuousWorld: true,
//     worldCopyJump: false
// }).setView([59.877812, 8.590628], 5);
//.setView([9629.056505, -1989.108605], 13);

//9629.056505 -1989.108605,9629.222929 -1987.333308, - moscow

// L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
//     minZoom: 7,
//     maxZoom: 18
// }).addTo(map);




