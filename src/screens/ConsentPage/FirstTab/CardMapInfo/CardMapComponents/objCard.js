import CardMapInfo from "../CardMapInfo";
import React from "react";

export const ObjCard = (objAddress = 'Зорге, 1', objBnd = [],relBnd = [], id = 0, setCurObj) => {

    return (<CardMapInfo
        id={'card-yandex' + id}
        objAddress={objAddress}
        objBnd={objBnd}
        relBnd={relBnd}
        setCurObj={setCurObj}
    />)
}