import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import { makeStyles } from '@material-ui/core/styles';

import { selectObjCurrObj } from '../../../store/adminPanelTrest/objspages.selectors';

import './paintOnMap';



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

const center = {
  lat: 55.778,
  lng: 37.512,
}
const positionInit  = [55.7796, 37.5118];

let localMap;

const CardYandexMap = ({selectObjCurr, objAdress = 'Зорге, 1'}) => {
  // const [draggable, setDraggable] = useState(false)
  const [position, setPosition] = useState(positionInit)

  const handleLoad =  (center) => {
      // await window.ymaps.ready(['ext.paintOnMap'])
          // .then( () => {
      // console.log('window.ymaps.ready -ext.paintOnMap');


      console.log('let localMap')
      window.ymaps.ready(['ext.paintOnMap']).then(() => {
          console.log('paintOnMap')
          localMap = new window.ymaps.Map('mapYandex', {center: center, zoom: 16}, {
              searchControlProvider: 'yandex#search'
          });
          // localMap = new window.ymaps.Map('mapYandex', {center: center, zoom: 16}, {
          //     searchControlProvider: 'yandex#search'
          // });

          const circle = new window.ymaps.GeoObject({
              geometry: {
                  type: "Circle",
                  coordinates: center,
                  radius: 30
              },
              // Свойства.
              properties: {
                  hintContent: objAdress,
                  balloonContent: 'поправь меня'
              }
          }, {
              // Опции.
              // Объект можно перетаскивать.
              draggable: true,
              // Цвет и прозрачность заливки.
              fillColor: '#ffff0022',
              // Цвет и прозрачность границ.
              strokeColor: '#3caa3c88',
              // Ширина линии.
              strokeWidth: 7
          })

          circle.events
              .add('mouseenter', function (e) {
                  // Ссылку на объект, вызвавший событие,
                  // можно получить из поля 'target'.
                  // console.log(e.target);dd
                  // console.log('mouseenter',e.originalEvent.target.events.params.context.geometry._coordinates);
                  // console.log('mouseenter',e.originalEvent.target.events.params.context.properties._data.hintContent);
                  console.log('mouseenter',e.get('target').properties.set('strokeColor', "red") );
                  e.get('target').properties.set('strokeColor', "red");
                  e.get('target').properties.set('fillColor', "red");
                  //e.get('target').properties.strokeColor //.strokeColor.color = 'red'
                  // e.get('target').properties.set('hintContent', objAdress);
                  // e.get('target').options.strokeColor ('strokeColor', "red");

                  // e.originalEvent.target.events.params.context.properties._data.hintContent.setHintContent('sss')
                  // e.get('target').options.options.fillColor = 'red'//.set('strokeColor', 'red');
                  e.get('target').options.set('strokeColor', 'yellow');
              })
              .add('mouseleave', function (e) {
                  e.get('target').options.unset('preset');
                  // console.log(e.get('target'));
                  console.log('mouseleave',e.originalEvent.target.events.params.context.geometry._coordinates);
              });

          localMap.geoObjects.add(circle);

          ///////////
          let paintProcess;

          // Опции многоугольника или линии.
          let styles = [
              {strokeColor: '#ff00ff', strokeOpacity: 0.7, strokeWidth: 3, fillColor: '#ff00ff', fillOpacity: 0.4},
              {strokeColor: '#ff0000', strokeOpacity: 0.6, strokeWidth: 6, fillColor: '#ff0000', fillOpacity: 0.3},
              {strokeColor: '#00ff00', strokeOpacity: 0.5, strokeWidth: 3, fillColor: '#00ff00', fillOpacity: 0.2},
              {strokeColor: '#0000ff', strokeOpacity: 0.8, strokeWidth: 5, fillColor: '#0000ff', fillOpacity: 0.5},
              {strokeColor: '#000000', strokeOpacity: 0.6, strokeWidth: 8, fillColor: '#000000', fillOpacity: 0.3},
          ];

          let currentIndex = 0;

          // Создадим кнопку для выбора типа рисуемого контура.
          let button = new window.ymaps.control.Button({data: {content: 'Вкл/откл рисование'}, options: {maxWidth: 150}});
          localMap.controls.add(button);
          //
          // // Подпишемся на событие нажатия кнопки мыши.
          localMap.events.add('mousedown', function (e) {
              // Если кнопка мыши была нажата с зажатой клавишей "alt", то начинаем рисование контура.
              if (e.get('altKey')) {
                  if (currentIndex == styles.length - 1) {
                      currentIndex = 0;
                  } else {
                      currentIndex += 1;
                  }
                  console.log('mousedown')
                  paintProcess = new window.ymaps.ext.paintOnMap(localMap, e, {style: styles[currentIndex]});
              }
          });
          //
          // // Подпишемся на событие отпускания кнопки мыши.
          localMap.events.add('mouseup', function (e) {
              if (paintProcess) {

                  // Получаем координаты отрисованного контура.
                  let coordinates = paintProcess.finishPaintingAt(e);
                  paintProcess = null;
                  // В зависимости от состояния кнопки добавляем на карту многоугольник или линию с полученными координатами.
                  let geoObject = button.isSelected() ?
                      new window.ymaps.Polyline(coordinates, {}, styles[currentIndex]) :
                      new window.ymaps.Polygon([coordinates], {}, styles[currentIndex]);

                  localMap.geoObjects.add(geoObject);
              }
          });


      })





      ///////////////////////////////


  // })
  }


    ////////////////

  useEffect(() => {
    window.ymaps.ready(() => {
    // window.ymaps.ready(['ext.paintOnMap']).then( () => {
    //     console.log('window.ymaps.ready');
    //   handleLoad();
    });
  }, [ handleLoad])



    useEffect(() => {
    window.ymaps.ready(() => {
        window.ymaps.geocode(objAdress, { results: 1 }).then(function (res) {
            // Выбираем первый результат геокодирования.

            let firstGeoObject = res.geoObjects.get(0);
            // console.log('ymaps.geocode -firstGeoObject', firstGeoObject);
            let centerCurObj = firstGeoObject.geometry.getCoordinates();
            // console.log('ymaps.geocode -centerCurObj', centerCurObj);
            // console.log('ymaps.geocode -position', position);
            if ( position !== centerCurObj){
                setPosition(centerCurObj);
            }

            // localMap.container.fitToViewport();
            // attachReverseGeocode(localMap);
            handleLoad(centerCurObj);

        }, function (err) {
            // Если геокодирование не удалось, сообщаем об ошибке.
            alert(err.message);
        });
    });
  }, [])




  return (
      <React.Fragment>
        <div id="mapYandex" style={{width: 600, height: 400, border:'1px solid #ff00005e'}} ></div>
      </React.Fragment>

  );
}
 
const mapStateToProps = createStructuredSelector ({
  selectObjCurr: selectObjCurrObj, // события короткие данные для таблицы
});

export default connect(mapStateToProps)(CardYandexMap);
