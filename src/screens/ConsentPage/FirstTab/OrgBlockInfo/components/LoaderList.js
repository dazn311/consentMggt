import React from "react";
import {CircularProgress} from "@material-ui/core";

const LoaderList = ({title}) => {
    return (<div style={{display: 'flex', alignSelf: 'center', alignItems: 'center', padding: 8}}>
        <div style={{padding: 8}}>{title}</div>
        <CircularProgress size={18}/>
    </div>)
}

export default LoaderList;