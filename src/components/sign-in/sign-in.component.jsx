import React from 'react';

import { connect } from 'react-redux';

import { setCurrentUser } from '../../store/user/user.actions';

import { selectCurrentPointId, allPoints } from '../../store/adminPanelTrest/adminPanelTrest.selectors';

import './sign-in.styles.scss';
 
const ListPoints = ({ points, currentPoint, setCurrentUser }) => {
    const setCurrent = () => {setCurrentUser({
        id: 0,
        name: 'Sanya',
        lastName: 'Smolenski',
        type: 'guest',
        status: 'OK',
        organisation: 'УК Беговая, д.4',
      })};
    return (
        <div className="admin-list">

            Sign In
            <button onClick={setCurrent}>Sign In</button>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    setCurrentUser: item => dispatch(setCurrentUser(item))
  });

  const mapStateToProps = (state) => ({
      currentPoint: selectCurrentPointId(state),
      points: allPoints(state),
  })
  export default connect(mapStateToProps, mapDispatchToProps)(ListPoints);
   