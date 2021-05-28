
import React from 'react';
// import { connect } from 'react-redux';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';  
// import { selectEventShortPoints } from '../../store/adminPanelTrest/adminPanelTrest.selectors'; 

import ObjPage from './ObjPage';

// const theme = createMuiTheme({
//     palette: {
//       primary: {
//         light: '#757ce8',
//         main: '#3f50b5',
//         dark: '#002884',
//         contrastText: '#fff',
//       },
//       secondary: {
//         light: '#ff7961',
//         main: '#f44336',
//         dark: '#ba000d',
//         contrastText: '#000',
//       },
//     },
//   });
 
const HistoryPage = ({eventShortPoints}) => {
     
    // console.log('HistoryChanges', eventShortPoints);
    return (
        // <ThemeProvider theme={theme}>
            <ObjPage />
            // </ThemeProvider>
    )
}
 
 
// const mapStateToProps = () => ({
//     eventShortPoints: selectEventShortPoints(),
// });

// export default connect(mapStateToProps)(HistoryPage);
export default HistoryPage;
