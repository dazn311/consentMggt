import {dataFromServer, SelectStateTransform} from "./gen.types";

const refData = (data: dataFromServer): SelectStateTransform[] => {

    let newData: SelectStateTransform[] = [
        {
            title: `Данные ОГХ (${data.total_objects})`,
            data: [
                {caption: 'Всего объектов наших', desc: data.total_mggt_objects},
                {caption: 'Всего объектов смежников', desc: data.total_objects - data.total_mggt_objects},
                {caption: 'Кол-во пользователей', desc: data.total_users},
            ]
        },{
            title: `Данные за сутки`,
            data: [
                {caption: 'Всего новых событий', desc: data.daily_recs},
                {caption: 'Всего сообщений', desc: data.daily_messages},
                {caption: 'Всего согласованых событий', desc: data.daily_sogl_recs},
            ]
        },{
            title: `За весь период`,
            data: [
                {caption: 'Всего событий', desc: data.total_recs},
                {caption: 'Всего сообщений', desc: data.total_messages},
                {caption: 'Всего согласовано объектов', desc: data.total_sogl_objects},
                {caption: 'Всего согласованых событий', desc: data.total_sogl_recs},
            ]
        },
    ]

    return newData
}

export default refData