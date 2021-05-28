import React from 'react';

import { connect } from 'react-redux';

import { setCurrentPoint } from '../../store/adminPanelTrest/adminPanelTrest.actions'

import { selectCurrentPointId, allPoints } from '../../store/adminPanelTrest/adminPanelTrest.selectors';

import './list-points.styles.scss';
 
const ListPoints = ({ points, currentPoint, setCurrentPoint }) => {
    const setCurrent = (itemId) => {setCurrentPoint(itemId)};
    return (
        
            <div className="list-group-wrap">
                 <div className="admin-list__header header-tab">События в точках</div>
                <ul className="list-group">
                    {points.map(point => {
                    let newClass = currentPoint === point.id ? "list-group-item active":"list-group-item";

                    return(
                        <li key={point.id} onClick={() => setCurrent(point.id)}  className={newClass}>{point.namePoint}</li>
                    )})}
                </ul>
            </div>
           
        
    )
}

const mapDispatchToProps = dispatch => ({
    setCurrentPoint: item => dispatch(setCurrentPoint(item))
  });

  const mapStateToProps = (state) => ({
      currentPoint: selectCurrentPointId(state),
      points: allPoints(state),
  })
  export default connect(mapStateToProps, mapDispatchToProps)(ListPoints);
   