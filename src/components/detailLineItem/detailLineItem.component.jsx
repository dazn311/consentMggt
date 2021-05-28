import React from 'react';


import './detailLineItem.styles.scss';
 
const DetailLineItem = ({ header, contect }) => {
    // const setCurrent = (itemId) => {setCurrentPoint(itemId)};

     const line = contect ? 
                (<tr>
                    <td style={{borderRight:'1px solid rgba(51, 32, 218, 0.2)',minWidth:'200px',width:'fit-content'}}>{header}</td>
                    <td style={{textAlign: 'center'}}>{contect}</td>
                </tr>)
                : '';
    return (
        line
        
    )
}

export default DetailLineItem;
   