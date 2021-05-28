
import React from 'react';

import Dashboard from './Dashboard';


const AuthDash = () => {
    let currentUser = {username: 'demo'};

    return (
            <Dashboard currentUser={currentUser}/>
    )
}
 
  

 
export default AuthDash;
