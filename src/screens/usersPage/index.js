
import React from 'react';
// import { connect } from 'react-redux';

// import { selectEventShortPoints } from '../../store/adminPanelTrest/adminPanelTrest.selectors'; 

import UsersPage from './UsersPage';


 
const HistoryPage = ({eventShortPoints}) => {
     
    // console.log('HistoryChanges', eventShortPoints);
    return (
            <UsersPage />
    )
}
 
  
// const mapStateToProps = () => ({
//     eventShortPoints: selectEventShortPoints(),
// });

// export default connect(mapStateToProps)(HistoryPage);
export default HistoryPage;
