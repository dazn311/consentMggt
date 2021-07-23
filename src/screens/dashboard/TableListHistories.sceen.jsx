import * as React from 'react';

import clsx from 'clsx';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';

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
        cellClassName: (params) =>
            clsx('super-app', {
                negative: params.value < 0,
                positive: params.value.includes('Мосгоргеотрест'),
                // positive: params.value > 0,
            }),
    },
    { field: 'type', headerName: 'Тип изменения', width: 560,
        cellClassName: (params) =>
            clsx('super-app', {
                newEvent: params.value.includes('события'),
                // positive: params.value > 0,
            }),

    },
];

const useStyles = makeStyles({
    root: {
        '& .super-app-theme--cell': {
            backgroundColor: 'rgba(224, 183, 60, 0.55)',
            color: '#1a3e72',
            fontWeight: '600',
        },
        '& .super-app.negative': {
            backgroundColor: 'rgba(157, 255, 118, 0.49)',
            color: '#1a3e72',
            fontWeight: '600',
        },
        '& .super-app.positive': {
            // backgroundColor: '#d47483',
            color: '#ffc00091',
            fontWeight: '600',
        },
        '& .super-app.newEvent': {
            // backgroundColor: '#d47483',
            color: '#7da055',
            fontWeight: '600',
        },
    },
});



const TableListHistory = ({ dataTab,handleClickOpenFmConfigForm}) => {
    const classes = useStyles();
 
    return (
        <div style={{ height: '400px', width: '100%' }} className={classes.root}  >
            <DataGrid  onRowClick={(rowData) => handleClickOpenFmConfigForm(rowData.row)} rows={dataTab} columns={columns} onRowHover pageSize={5} loading={dataTab.length === 0} icons />
        </div> 
    );
}
 

export default TableListHistory;