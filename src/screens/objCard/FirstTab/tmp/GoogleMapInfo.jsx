import React, {useCallback, useMemo, useRef, useState} from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {Loader} from 'google-maps';

import "leaflet/dist/leaflet.css";

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




const GoogleMapInfo = async ({selectObjCurr}) => {
  const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(positionInitial);
  const markerRef = useRef(null)
  const classes = useStyles();

  const center = [55.7767, 37.5102]

  const bounds = [
    [55.7767, 37.5102],
    [55.7778, 37.5132],
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
  const options = {
  };
  const loader = new Loader('AIzaSyBMw6WfyqoSk3NM71WTwivnyq9bw7FgRyU', options);


  let map;
  const google = await loader.load();
  console.log('google',google)

  const initMap = () => {
      map = new window.google.maps.Map(markerRef, {
       center: {lat: 55.778, lng: 37.510},
       zoom: 15,
     });

     console.log('map',map);

   }



  return (
      <React.Fragment>
         <div onLoad={initMap()} ref={markerRef}>{'map && map'}</div>
      </React.Fragment>

  );
}


export default  GoogleMapInfo
