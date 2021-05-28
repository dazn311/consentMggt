import React from 'react';

import { connect } from 'react-redux';


import { selectCurrentPointId, allPoints,allOrganisations } from '../../store/adminPanelTrest/adminPanelTrest.selectors';

import DetailLineItem from '../detailLineItem/detailLineItem.component';

import './detailListPoints.styles.scss';
 
const DetailListPoints = ({ items, currentPoint,allOrganisations }) => {
    const currentItem = items[currentPoint -1];
    const organizationInit = allOrganisations[currentItem.organizationInit];
    const organizationOtvet = allOrganisations[currentItem.organizationOtvet];
    //console.log(currentItem);
    return (
        <div className="list-group-wrap">
        <div  className="list-group">
             
                <div className="admin-list-detail-activeCompany">
                    <div className="admin-list__header header-tab">Замечания по инициировании события</div>
                    <table className="table table-hover" >
                        <tbody>
                            <DetailLineItem header="Комментарий" contect={currentItem.comment}/>
                            <DetailLineItem header="Дата" contect={currentItem.date}/> 
                        </tbody>
                    </table>
                </div>

                <div className="admin-list-detail-activeCompany">
                    <div className="admin-list__header header-tab">Организация инициировала событие</div>
                    <table className="table table-hover" >
                        <tbody>
                            <DetailLineItem header="Организация" contect={organizationInit.name}/>
                            <DetailLineItem header="Адрес" contect={organizationInit.adress}/>
                            <DetailLineItem header="Контакное лицо" contect={organizationInit.contactUsers[0]}/>
                            <DetailLineItem header="телефоны" contect={organizationInit.phones[0]}/>
                            
                        </tbody>
                    </table>
                </div>
 
                <div className="admin-list-detail-activeCompany">
                    <div className="admin-list__header header-tab">Организация ответчик события</div>
                    <table className="table table-hover" >
                        <tbody>
                            <DetailLineItem header="Организация" contect={organizationOtvet.name}/>
                            <DetailLineItem header="Адрес" contect={organizationOtvet.adress}/>
                            <DetailLineItem header="Контакное лицо" contect={organizationOtvet.contactUsers[0]}/>
                            <DetailLineItem header="телефоны" contect={organizationOtvet.phones[0]}/>
                        </tbody>
                    </table>
                </div>

                
             
        </div>
        </div>
        
    )
}

  const mapStateToProps = (state) => ({
      currentPoint: selectCurrentPointId(state),
      allOrganisations: allOrganisations(state),
      items: allPoints(state),
  })

  export default connect(mapStateToProps)(DetailListPoints);
   