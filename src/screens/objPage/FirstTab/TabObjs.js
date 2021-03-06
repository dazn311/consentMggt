import React, {useEffect} from 'react';
import {useHistory} from "react-router-dom";
// import _ from "lodash";

import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import {makeStyles} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';

import Pagination from '@material-ui/lab/Pagination';

import { Random } from 'react-animated-text';
    // ,Wave 


import MessAlert from './Messages.alert';

import {setObjCurrForDetailPageAsync} from '../../../store/adminPanelTrest/adminPanelTrest.actions';
import {setCurObjAsync} from '../../../store/objs/obj.actions';

import {fetchDataForEventShortPoints} from '../../../store/adminPanelTrest/adminPanelTrest.selectors';
import {selectObjsInfoPage} from '../../../store/adminPanelTrest/StatisticPage.selectors';

// import EventDetail from './EventDetail';

const useStyles = makeStyles({
    progress: {
        width: '100%',
        '& > * + *': {
            marginTop: 4,
        },
        marginTop: 4,
    },
    table: {
        minWidth: 650,
        borderTop: '1px solid rgb(130 119 119 / 47%)'
    },
    cell: {
        minHeight: 20,
        opacity: 0.3
    },
    cellOpacity: {
        minHeight: 20,
        opacity: 0.1
    },
});

const LinearIndeterminate = () => {
    const classes = useStyles();

    return (
        <div className={classes.progress}>
            <LinearProgress/>
            {/* <LinearProgress color="secondary" /> */}
        </div>
    );
}

const randomTabElement = (text) => {
    return (
        <Random
            text={ text ? text : 'нет данных'}
            effect="verticalFadeOut"
            effectDirection="down"
            effectChange={3.0}
        />
    );
}

////////////////////////////

// let pageCoutnt = 0;
const TabObjs = ({setObjCurrForDetailPage, tabValue, selectObjsInfo, setPageT, offset, isLoading, setCurObj}) => {

    const [page, setPage] = React.useState(1);
    // const [orgRow, setOrgName] = useState({});
    // const [isOpenDetail, setIsOpenDetail] = useState(false);

    const history = useHistory();
    const classes = useStyles();


    useEffect(() => {
        // console.log('TabObjs --offset',offset);
        if (offset === '0') {
            setPage(1);
        }
    }, [offset])

    const handleChangePage = (event, newPage) => {
        setPageT(newPage);
        setPage(newPage);
    };

    // для детальной информации
    // const closeDetail = () => {
    //     setIsOpenDetail(false);
    // }

    const showEvents = (row) => {
        // setOrgName(row);
        setObjCurrForDetailPage(row);
        // setCurObj(row);
        // history.push(`/stats/objs/${row.objID}`);

        history.push({
            pathname: `/stats/obj/${row.objID}`,
            // search: '?query=obj',
            row: row
        });
    }

    let  openGreen = false;
    let openRed = !tabValue

    return (
        <React.Fragment>
            <TableContainer component={Paper}>
                <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell style={{padding: '6px 0px 6px 0px', width: '4px', maxWidth: '2px'}}/>
                            <TableCell align="right">Наименование</TableCell>
                            <TableCell align="right">Балансодержатель</TableCell>
                            <TableCell align="right">Тип</TableCell>
                            <TableCell align="right">Количество событий</TableCell>
                            {/* <TableCell align="right">Принадлежит</TableCell> */}
                            <TableCell align="right">Дата создания</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tabValue && tabValue.length ?
                            tabValue
                                // .filter((row,i) => i < 16)
                                .map((row, index) => (
                                    <TableRow key={index} onClick={() => { showEvents(row) }}
                                              style={{backgroundColor: index % 2 === 0 ? '#80808038' : '', opacity: isLoading ? .3 : 1, scale: isLoading ? .3 : 1}}>
                                        <TableCell align="left" style={{backgroundColor: row.color, padding: '6px 0px 6px 0px', width: '4px', maxWidth: '4px'}}/>
                                        <TableCell align="left"  scope="row" style={{scale: isLoading ? .3 : 1}}>{!isLoading ? row.objName : randomTabElement(row.objName) }</TableCell>
                                        <TableCell align="right">{!isLoading ? row.organization.orgname : randomTabElement(row.organization.orgname)  }</TableCell>
                                        <TableCell align="right">{!isLoading ? row.objType : randomTabElement(row.objType)   }</TableCell>
                                        <TableCell align="right">{row.objRecsAmount}</TableCell>
                                        <TableCell align="right">{new Intl.DateTimeFormat('ru-Ru').format(new Date(row.objCreationDate))}</TableCell>

                                    </TableRow>
                                )) : Array(15).fill(null).map((_, index) => (
                                <TableRow key={index} style={{backgroundColor: index % 2 === 0 ? '#80808038' : ''}}>
                                    <TableCell className={index % 2 === 0 ? classes.cell : classes.cellOpacity} align="left" style={{width: '4px', maxWidth: '4px'}}/>
                                    <TableCell className={index % 2 === 0 ? classes.cell : classes.cellOpacity} align="left" component="th" scope="row">
                                        {tabValue ? <LinearIndeterminate/> : (isLoading ? randomTabElement : 'нет данных')}
                                    </TableCell>
                                    <TableCell className={index % 2 === 0 ? classes.cell : classes.cellOpacity} align="right">{tabValue ? <LinearIndeterminate/>
                                        : (isLoading ? randomTabElement : 'нет данных')}   </TableCell>
                                    <TableCell className={index % 2 === 0 ? classes.cell : classes.cellOpacity} align="right">{tabValue ? <LinearIndeterminate/>
                                        : (isLoading ? randomTabElement : 'нет данных')}   </TableCell>
                                    <TableCell className={index % 2 === 0 ? classes.cell : classes.cellOpacity} align="right">{tabValue ? <LinearIndeterminate/>
                                        : (isLoading ? randomTabElement : 'нет данных')}   </TableCell>
                                    <TableCell className={index % 2 === 0 ? classes.cell : classes.cellOpacity} align="right">{tabValue ? <LinearIndeterminate/>
                                        : (isLoading ? randomTabElement : 'нет данных')}   </TableCell>

                                </TableRow>))

                        }
                    </TableBody>
                </Table>
                <div style={{display: 'flex', margin: 18, opacity: isLoading ? .3 : 1}}>
                    <Pagination count={selectObjsInfo.totalPages} page={page} onChange={handleChangePage} color="primary"/>
                </div>

            </TableContainer>

            {/*<EventDetail orgRow={orgRow} isOpen={isOpenDetail} closeDetail={closeDetail}/>*/}
            <MessAlert openRed={openRed} openGreen={openGreen}/>
        </React.Fragment>
    );
}

const mapStateToProps = createStructuredSelector({
    selectObjsInfo: selectObjsInfoPage, // события короткие данные для таблицы
    datesOfFetchForEvent: fetchDataForEventShortPoints, //  дата начала и конца для запроса
});

const mapDispatchToProps = (dispatch) => ({
   setObjCurrForDetailPage: (object) => dispatch(setObjCurrForDetailPageAsync(object)),
    setCurObj: (object) => dispatch(setCurObjAsync(object)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TabObjs);