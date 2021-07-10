import React from 'react';

import {Slide} from "@material-ui/core";

const ReadMe = () => {

    return (
        <Slide direction="up" in={true} mountOnEnter unmountOnExit>
            <div className='ReadMe'>

                {/*// plan*/}

            </div>
        </Slide>
    );
}
// plan
// Выбор организации - загружает список 1 объектов( тут список), objectsDataLst.data.objects

// выбор объекта( из списка 1)  - загружает выбраный объект(в нем есть список смежников) objsArr.11718 в нем есть objBnd и список obj_relatives
// выбираем смеж объект         - загружаем объект смежный
//
//
//
//
//
export default ReadMe
