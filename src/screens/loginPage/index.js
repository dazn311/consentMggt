import React from 'react';
import { useParams } from 'react-router-dom'

import LoginPage from './ConsentPage';

const LoginPageWrap = () => {
     
    let { idobj } = useParams();
    return (
            <LoginPage idObj={idobj} />
            
    )
} 

export default LoginPage;
