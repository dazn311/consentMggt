import React  from 'react';
import ElemEventObj from "./ElemEventObj";
import ListItemText from "@material-ui/core/ListItemText";

const ListItemEvents = ({ eventsList, visibleList = true}) => {

    return (
        <ListItemText
            style={{maxHeight: 500, overflow: visibleList ? 'auto' :'auto'
                , maxWidth : visibleList ? 420 : 2
                // , maxWidth : 420
                // , display: visibleList ? 'block' : 'none'
                , transition: 'all 0.5s ease-out'
            }}
            // primary="Сотытия объекта"
            secondary={
                // <EventsList  eventsList={eventsList} />}
                eventsList.length &&
                eventsList.map(ev => {
                    return <ElemEventObj  event={ev} />
                })}
        />


        // <div >
        //     {eventsList.length &&
        //     eventsList.map(ev => {
        //         return <ElemEventObj  event={ev} />
        //     })
        //     }
        // </div>
    )
}

export default ListItemEvents;