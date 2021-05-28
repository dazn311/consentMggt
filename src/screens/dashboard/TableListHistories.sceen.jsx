import * as React from 'react';  

import { DataGrid } from '@material-ui/data-grid';
// import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress"; 
// import TableLoader from '../../components/tabLoader/TabLoader';

const columns = [ 
    { field: 'date', headerName: 'Дата', type: 'string', width: 160, direction: 'desc' },
    { field: 'text', headerName: 'Описание события', width: 200 },
    {
        field: 'fullName',
        headerName: 'Пользователь',
        description: 'Эту колонку нельзя выбрать.',
        width: 420,
    },
    { field: 'type', headerName: 'Тип изменения', width: 560 },
];


const TableListHistory = ({ dataTab,handleClickOpenFmConfigForm}) => {
    if ( dataTab.length === 0){
        // return (<div style={{width:'100%', display:'flex', justifyContent:'flex-start'}}><TableLoader /> </div>)
        // return (<div style={{width:'100%', display:'flex', justifyContent:'center'}}><CircularProgress size={34} color="secondary" /> </div>)
    }
 
    return (
        <div style={{ height: '400px', width: '100%' }}>
            <DataGrid  onRowClick={(rowData) => handleClickOpenFmConfigForm(rowData.row)} rows={dataTab} columns={columns} onRowHover pageSize={5} loading={false} icons />
        </div> 
    );
}
 

export default TableListHistory;