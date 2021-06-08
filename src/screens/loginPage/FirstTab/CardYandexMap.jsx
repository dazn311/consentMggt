import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

// import {connect} from 'react-redux';
// import {createStructuredSelector} from 'reselect';
//
//
// import {makeStyles} from '@material-ui/core/styles';


import './paintOnMap';
// import { updateSmeObjsOfAuthUserAsync } from "../../../store/consent/cons.actions";
// import {activeObjDataOfAuthUserSelector} from "../../../store/consent/cons.selectors";


const positionInit = [55.7796, 37.5118];


const CardYandexMap = ({ id,objAdress = 'Зорге, 1', setCurObj, objBnd}) => {
    // const [draggable, setDraggable] = useState(false)
    const [position, setPosition] = useState(positionInit)
    const [eventList, setEventList] = useState([])
    let localMapConsent = null;
    const mapId = "mapYandexConsent-" + id;

    // useEffect(() => {
    //     console.log('position',position) },[position])

    // console.log('28 objBnd',objBnd)
    // console.log('28 objAdress',objAdress)

    const handleLoad = (center) => {
        window.ymaps.ready(['ext.paintOnMap']).then(() => {


            let newCenter = objBnd.length ? objBnd[0]: center;
            // console.log('28 newCenter',newCenter)
            setPosition(newCenter);

            localMapConsent = new window.ymaps.Map(mapId, {center: newCenter, zoom: 15}, {
                searchControlProvider: 'yandex#search'
            });






            const circle = new window.ymaps.GeoObject({
                geometry: {
                    type: "Circle",
                    coordinates: newCenter,
                    radius: 30
                },
                properties: {
                    hintContent: objAdress,
                    balloonContent: 'поправь меня'
                }
            }, {
                draggable: true,
                fillColor: '#ffff0022',
                strokeColor: '#3caa3c88',
                strokeWidth: 7
            })

            circle.events
                .add('mouseenter', function (e) {
                    e.get('target').properties.set('strokeColor', "red");
                    e.get('target').geometry.setRadius(40);
                })
                .add('mouseup', function (e) {
                    e.get('target').geometry.setRadius(30);

                    let newCoordinate = e.originalEvent.target.events.params.context.geometry._coordinates;
                    setPosition(newCoordinate);

                    localMapConsent.setCenter(e.get('target').geometry.getCenter());

                    new window.ymaps.geocode(newCoordinate, {results: 1}).then(function (res) {
                        let firstGeoObject = res.geoObjects.get(0);

                        let nameCurObj = firstGeoObject.properties._data.name;

                        if (objAdress !== nameCurObj) {
                            let newData = {...setCurObj, objName: nameCurObj};
                            setCurObj(newData, id)
                        }
                    }, function (err) {
                        alert(err.message);
                    });

                });

            localMapConsent.geoObjects.add(circle);

            ///////////
            let paintProcess;

            // Опции многоугольника или линии.
            let styles = [
                {draggable: true, strokeColor: '#ff00ff', strokeOpacity: 0.7, strokeWidth: 13, fillColor: '#ff00ff', fillOpacity: 0.4},
                {draggable: true,strokeColor: '#ff0000', strokeOpacity: 0.6, strokeWidth: 16, fillColor: '#ff0000', fillOpacity: 0.3},
                {draggable: true,strokeColor: '#00ff00', strokeOpacity: 0.5, strokeWidth: 13, fillColor: '#00ff00', fillOpacity: 0.2},
                {draggable: true,strokeColor: '#0000ff', strokeOpacity: 0.8, strokeWidth: 15, fillColor: '#0000ff', fillOpacity: 0.5},
                {draggable: true,strokeColor: '#000000', strokeOpacity: 0.6, strokeWidth: 18, fillColor: '#000000', fillOpacity: 0.3},
            ];

            let currentIndex = 0;

            localMapConsent.events.add('mousedown', function (e) {
                if (e.get('altKey')) {
                    if (currentIndex == styles.length - 1) {
                        currentIndex = 0;
                    } else {
                        currentIndex += 1;
                    }
                    paintProcess = new window.ymaps.ext.paintOnMap(localMapConsent, e, {style: styles[currentIndex]});
                }
            });
            //
            localMapConsent.events.add('mouseup', function (e) {
                if (paintProcess) {
                    let coordinates = paintProcess.finishPaintingAt(e);
                    paintProcess = null;
                    let newBalloonContentBody = objAdress === 'Зорге, 1' ? 'Новое событие': 'Новое событие по '+ objAdress;
                    let geoObject =
                        // button.isSelected() ?
                        new window.ymaps.Polyline(coordinates, { hintContent: newBalloonContentBody, balloonContentBody: newBalloonContentBody }, styles[currentIndex])
                    // : new window.ymaps.Polygon([coordinates], {}, styles[currentIndex]);

                    localMapConsent.geoObjects.add(geoObject);
                    setEventList(prev => [prev, geoObject]);
                    // localMapConsent.setBounds(geoObject.geometry.getBounds());
                }
            });



            // console.log('55 objBnd',objBnd)

            if (objBnd.length){
                let polygon = new window.ymaps.Polygon([objBnd], {
                    hintContent: "Obj polygon"
                }, {
                    fillColor: '#6699ff',
                    // Making the polygon transparent for map events.
                    interactivityModel: 'default#transparent',
                    strokeWidth: 8,
                    opacity: 0.5,
                });

                localMapConsent.geoObjects.add(polygon);
                localMapConsent.setBounds(polygon.geometry.getBounds());
                // localMapConsent.setCenter(polygon.geometry.getCenter());

                // console.log('33 polygon.geometry.getCenter()',polygon.geometry.getCenter())
            }





        })

    }


    useEffect(() => {

        window.ymaps.ready(() => {

            let fullAdress = 'Москва, ' + objAdress;

            window.ymaps.geocode(fullAdress, {results: 1}).then(function (res) {

                let firstGeoObject = res.geoObjects.get(0);
                // console.log(firstGeoObject)
                let centerCurObj = firstGeoObject.geometry.getCoordinates();

                    if(objBnd.length){
                        if (position !== centerCurObj) {
                            setPosition(objBnd[0]);
                        }

                        handleLoad(objBnd[0]);
                    }else {
                        if (position !== centerCurObj) {
                            setPosition(centerCurObj);
                        }
                        handleLoad(centerCurObj);
                    }


            }, function (err) {
                alert(err.message);
            });
        });
    }, [objBnd])


    return (
        <React.Fragment>
            <div id={"mapYandexConsent-" + id} style={{width: 800, height: 700, border: '1px solid #ff00005e', display:'flex', overflow: 'auto'}}></div>
        </React.Fragment>

    );
}

// const mapStateToProps = createStructuredSelector({
//     // activeObjDataOfAuthUser: activeObjDataOfAuthUserSelector, // события короткие данные для таблицы
// });
//
// const mapDispatchToProps = (dispatch) => ({
//     // setCurObj: (object) => dispatch(setObjCurrForDetailPageAsync(object)),
// });

export default  CardYandexMap
// export default connect(mapStateToProps, mapDispatchToProps)(CardYandexMap);
