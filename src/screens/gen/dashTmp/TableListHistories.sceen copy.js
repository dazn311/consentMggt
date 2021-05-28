import * as React from 'react';
import _ from "lodash";

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';


import { selectEventShortPoints, selectStatusEventPoint, selectStatusEnumEventPointColor } from '../../store/adminPanelTrest/adminPanelTrest.selectors'; 

import { DataGrid } from '@material-ui/data-grid';

const columns = [
//   { field: 'id', headerName: 'ID', width: 70 },
    // { field: 'color', headerName: '', width: 2 , padding: 0, type: 'string'},
    { field: 'date', headerName: 'Дата', type: 'string', width: 190, direction: 'desc' },
    { field: 'text', headerName: 'Описание события', width: 230 },
    {
        field: 'fullName',
        headerName: 'Пользователь',
        description: 'This column has a value getter and is not sortable.',
        // sortable: false,
        width: 280,
        // valueGetter: (params) =>
        // `${params.getValue('text') || ''} ${params.getValue('type') || ''}`,
    },
    { field: 'type', headerName: 'Тип изменения', width: 280 },
];

let rows = [
  { id: 1, type: 'Snow', text: 'Jon', date: '35',fullName: 'Vasya' },
  { id: 2, type: 'Lannister', text: 'Cersei', date: '42',fullName: 'Vasya' },
  { id: 3, type: 'Lannister', text: 'Jaime', date: '45',fullName: 'Vasya' },
  { id: 4, type: 'Stark', text: 'Arya', date: '16' ,fullName: 'Vasya'},
  { id: 5, type: 'Targaryen', text: 'Daenerys', date: 'null',fullName: 'Vasya' },
  { id: 6, type: 'Melisandre', text: 'null', date: '150' ,fullName: 'Vasya'},
  { id: 7, type: 'Clifford', text: 'Ferrara', date: '44',fullName: 'Vasya' },
  { id: 8, type: 'Frances', text: 'Rossini', date: '36',fullName: 'Vasya' },
  { id: 9, type: 'Roxie', text: 'Harvey', date: '65',fullName: 'Vasya' },
];

// const setColorRow = () => {
  
  
//   setTimeout(() => {
//     const tabCelles = document.getElementsByClassName('MuiDataGrid-cell');
//   // console.log('tabCelles',tabCelles);
//     let arr = [].slice.call(tabCelles);
//     arr.forEach(element => {
      
//       if (element.getAttribute('data-field') === 'color'){
//         console.log('setColorRow',element.getAttribute('data-value'));
//         element.innerHTML = '';
//         element.style.backgroundColor = element.getAttribute('data-value');
//         element.style.padding = 0;
//       }
//     });
//   }, 500);
  
  
//   //document.getElementsByClassName('MuiDataGrid-cell')[1].getAttribute('data-value');
// }

// const setColorRowPadding = () => {
//   const tabCelles = document.getElementsByClassName('MuiDataGrid-cell');
//   var arr = [].slice.call(tabCelles);
  
//   arr.forEach(element => {
//     if (element.getAttribute('data-field') === 'color'){
//       console.log('setColorRowPadding',element.getAttribute('data-value'));
//       element.innerHTML = '';
//       element.style.padding = 0;
//     }
//   });
// }

// let btns = document.querySelectorAll('button');
// btns.forEach(btn => {
//       btn.addEventListener('click', function(e) {setTimeout(() => {
//         const tabCelles = document.getElementsByClassName('MuiDataGrid-cell');
//         let arr = [].slice.call(tabCelles);
//         arr.forEach(element => {
          
//           if (element.getAttribute('data-field') === 'color'){
//             console.log('btn',element.getAttribute('data-value'));
//             element.innerHTML = '';
//             element.style.backgroundColor = element.getAttribute('data-value');
//             element.style.padding = 0;
//           }
//         });
//       }, 500);
//     });
// });

// document.getElementsByClassName('MuiTablePagination-actions')[0].addEventListener('click', function(e) {
//   setTimeout(() => {
//     const tabCelles = document.getElementsByClassName('MuiDataGrid-cell');
//     let arr = [].slice.call(tabCelles);
//     arr.forEach(element => {
      
//       if (element.getAttribute('data-field') === 'color'){
//         console.log('setColorRow',element.getAttribute('data-value'));
//         element.innerHTML = '';
//         element.style.backgroundColor = element.getAttribute('data-value');
//         element.style.padding = 0;
//       }
//     });
//   }, 500);
// });

const TableList = ({ eventShortPoints, statusEventPoint,statusEnumEventPointColor }) => {
    console.log(statusEnumEventPointColor);
    rows = [];
    let nodesEvent = eventShortPoints.data.nodes;
    if (Array.isArray(eventShortPoints.data.nodes) ) {
      // console.log('trueee');
      nodesEvent = _.orderBy(eventShortPoints.data.nodes, ['date'], ['desc']);
      // console.log('eventShortPoints',nodesEvent);
    }
    
    nodesEvent.map((nodeE,index) => {
        const dateFormatt =  nodeE.date.split('T')[0].split('-')[2] + '/' + nodeE.date.split('T')[0].split('-')[1] + '/' + nodeE.date.split('T')[0].split('-')[0] + ' (' +  nodeE.date.split('T')[1].slice(0,5) + ')';
        let newNode = { id: index, date: dateFormatt, text: nodeE.text, fullName: nodeE.user.username, type: statusEventPoint[nodeE.type]};
        rows.push(newNode);
        return newNode
    });
  return (
    <div style={{ height: 400, width: '100%' }}>
      {/* <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection /> */}
      <DataGrid rows={rows} columns={columns} pageSize={5} loading={false} icons />
      {/* {setColorRowPadding()}
      {setColorRow()} */}
    </div>
  );
}

const mapStateToProps = createStructuredSelector ({
    eventShortPoints: selectEventShortPoints, // события короткие данные для таблицы
    statusEventPoint: selectStatusEventPoint, // классификация статусов "new_msg"
    statusEnumEventPointColor: selectStatusEnumEventPointColor, // for color elements
  });
  
  
  export default connect(mapStateToProps)(TableList);