import React from 'react';
import { useParams } from 'react-router-dom'

import ObjCard from './ObjCard';

const ObjCardPage = () => {
     
    let { idobj } = useParams();
    return (
            <ObjCard idObj={idobj} />
            
    )
} 

export default ObjCardPage;
