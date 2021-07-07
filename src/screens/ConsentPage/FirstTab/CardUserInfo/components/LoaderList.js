import {CircularProgress} from "@material-ui/core";
import React from "react";

const LoaderList = ({title}) => {
    return (<div style={{display: 'flex', alignSelf: 'center', alignItems: 'center', paddingRight: 8}}>
        <div style={{padding: 8}}>{title}</div>
        <CircularProgress size={18}/>
    </div>)
}

export default LoaderList;