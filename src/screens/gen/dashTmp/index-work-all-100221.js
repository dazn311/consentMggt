
import React, { useState } from 'react';
// import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { selectCurrentUser } from '../../store/user/user.selectors'; 

import Dashboard from './Dashboard';


const AuthDash = ({currentUser}) => {
    const [state] = useState(currentUser);

    if (state && state.login !== 'demo') {
        // return (<Redirect to="/login" />)
    }

    return (
            <Dashboard currentUser={currentUser}/>
    )
}
 
  
const mapStateToProps = createStructuredSelector ({
    currentUser: selectCurrentUser,
});

 
export default connect(mapStateToProps)(AuthDash);
