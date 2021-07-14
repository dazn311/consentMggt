import React, { useEffect} from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
// import {useHistory} from "react-router-dom";

import {  selectCurObjRec } from '../../../store/objs/obj.selectors';
import { selectObjsPage } from '../../../store/adminPanelTrest/StatisticPage.selectors';
import { selectObjRectPage } from '../../../store/adminPanelTrest/objsPage.selectors';
import { fetchObjRectListAsync } from '../../../store/adminPanelTrest/adminPanelTrest.actions';
import { objCurrentSelector } from '../../../store/adminPanelTrest/objspages.selectors';

import CartGenInfo from './CardGenInfo';
// import CardEventInfo from './CardEventInfo';
import MapBlockInfo from "./MapBlockInfo";
// import CardYandexMap from "./CardYandexMap";

import './eventDetail.styles.scss';
import './map-widget.css';

// parrent data idObj={idObj} currObj={currObj} -- local.row ///
const TabFirstObjCard = ({ idObj,currObj, fetchObjRectList, selectObjRect,selectCurObjRec,objCurrentSelector  }) => {
  // const  mapContainer = createRef();
  //   const history = useHistory();
  useEffect(() => {
    // console.log(' fetchObjRectList idObj', idObj);
    if (idObj ){
        // if (history.location.pathname.split('/')[3] !== currObj.objID.toString()){
            fetchObjRectList(idObj);
        // }

    }
  },[idObj,fetchObjRectList])


    // console.log('333 history',history.location.pathname.split('/')[3])
    console.log('333 currObj',currObj)
    console.log('333 objCurrentSelector',objCurrentSelector)
// console.log('333 selectCurrentUserAllData == history.location.pathname',history.location.pathname.split('/')[3] === currObj.objID.toString())

  return (
    <div style={{display:'flex',flexWrap:'nowrap', flexDirection: window.innerWidth < 500 ? 'column' : 'row', justifyContent:'flex-start'}} >
          <CartGenInfo currObj={objCurrentSelector}  objRect={selectCurObjRec} />
        {
            // selectObjRect &&
        // <CardEventInfo currObj={currObj} objRect={selectObjRect} ></CardEventInfo>
        }
      <div  style={{display:'flex',flexWrap:'nowrap', justifyContent:'center', position: 'relative', overflow: 'unset'}} >
        {/*{currObj && <CardYandexMap objAdress={ 'Москва, ' + currObj.objName} orgName={ currObj.organization.orgname} />}*/}
        {/*{currObj && <CardYandexMap objAdress={currObj.objName} />}*/}
        {objCurrentSelector && <MapBlockInfo key={'key-MapBlockInfo'} objAdress={objCurrentSelector.objName} />}
      </div>

    </div>
  );
}


const mapStateToProps = createStructuredSelector ({
    selectCurObjRec: selectCurObjRec, // события короткие данные для таблицы
  selectObjRect: selectObjRectPage, // события короткие данные для таблицы
  selectObjs: selectObjsPage, // события короткие данные для таблицы
    objCurrentSelector: objCurrentSelector, // события короткие данные для таблицы
});

const mapDispatchToProps = (dispatch) => ({
  fetchObjRectList: (objectID, limit, offset) => dispatch(fetchObjRectListAsync(objectID, limit, offset)),
}); 
 
export default connect(mapStateToProps,mapDispatchToProps)(TabFirstObjCard);