import React, {useCallback} from 'react';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';


import LineChartComp from './LineChartWithXAxisPading';

import {selectCurrDay, selectCurrDayData, selectGraphSuccess, selectGraphAmount} from '../../store/adminPanelTrest/adminPanelTrest.selectors';

import {fetchAllForGraphicsAsync} from '../../store/adminPanelTrest/adminPanelTrest.actions';
import dataInitial, {dataInitialMos} from "./graphDataEmty";

///////////////////// Line Chart /////////////////////////////
const LineChartWrap = ({fetchAllForGraphics, selectCurrDay, selectCurrDayData, selectGraphSuccess, selectGraphAmount}) => {
    let { users, newRec, doneRec} = selectGraphAmount;
    // console.log('selectGraphSuccess',selectGraphSuccess)
    /////////////////////////// - fetchAll - ///////////////////////////////////
    const fetchAll = useCallback((ofsParam = 0) => {

        fetchAllForGraphics(ofsParam)

    }, [fetchAllForGraphics]);

    /////////////////////////// - end fetchAll - ///////////////////////////////////

    React.useLayoutEffect(() => {

        fetchAll(0)

    }, [fetchAll])


    //

// debugger
    if (!selectCurrDayData) {
        return (
            <LineChartComp data={dataInitialMos} isFetchingUserOnline={selectGraphSuccess} dateLabel={'0000-00-00'} usersCount={0} eventsAmount={0} endedAmount={0} fetchAll={()=>{}}/>
        )
    }

    return (
        <LineChartComp data={selectCurrDayData} isFetchingUserOnline={selectGraphSuccess} dateLabel={selectCurrDay} usersCount={users} eventsAmount={newRec} endedAmount={doneRec} fetchAll={fetchAll}/>
    )

}


const mapStateToProps = createStructuredSelector({
    selectCurrDay: selectCurrDay,
    selectCurrDayData: selectCurrDayData,
    selectGraphSuccess: selectGraphSuccess,
    selectGraphAmount: selectGraphAmount,
});

const mapDispatchToProps = (dispatch) => ({
    fetchAllForGraphics: (startDate, endDate) => dispatch(fetchAllForGraphicsAsync(startDate, endDate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LineChartWrap);
 