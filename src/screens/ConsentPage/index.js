import React from 'react';
import { useParams } from 'react-router-dom'

import ConsentPage from './ConsentPage';

const ConsentPageWrap = () => {
     
    let { idobj } = useParams();
    return (
            <ConsentPage idObj={idobj} />
            
    )
} 

export default ConsentPageWrap;
