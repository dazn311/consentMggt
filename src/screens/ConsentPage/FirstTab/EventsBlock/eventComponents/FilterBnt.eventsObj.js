import React  from "react";

import ClearIcon from "@material-ui/icons/Clear";
import CallMergeIcon from "@material-ui/icons/CallMerge";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import {Tooltip} from "@material-ui/core";

const FilterBnt = ({eventsFilterID = 0, setFilterType}) => {
    return (
        <div className='filter-bnt' style={{marginLeft: -30, bottom: 0, display: "flex", flexDirection: "column", position: 'absolute'}}>
            <Tooltip title={"Все события выбранного объекта"}>
                <ClearIcon style={{color: eventsFilterID === 0 ? "greenyellow" : "grey", cursor: "pointer"}}
                           onClick={() => setFilterType(0)}/>
            </Tooltip>

            <Tooltip title={"События относятся к текущему и смежн. объекту"}>
                <CallMergeIcon style={{color: eventsFilterID === 1 ? "greenyellow" : "grey", cursor: "pointer"}}
                               onClick={() => setFilterType(1)}/>
            </Tooltip>

            <Tooltip title={"Согласованные все события выделенного объекта"}>
                <DoneAllIcon style={{color: eventsFilterID === 2 ? "greenyellow" : "grey", cursor: "pointer"}}
                             onClick={() => setFilterType(2)}/>
            </Tooltip>

        </div>
    );
};

export default FilterBnt;
