const styleConsent = {
    display: 'flex',
    flexWrap: 'nowrap',
    flexDirection: window.innerWidth < 500 ? 'column' : 'row',
    justifyContent: 'flex-start'
}

const styleOrg = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    border: '2px solid #4D584D',
    minWidth: 350,
    width: 350,
    minHeight: 550,
    position: 'relative',
    overflow: 'unset'
}
const styleCardMapInfo = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    minWidth: 560,
    width: 560,
    minHeight: 550,
    position: 'relative',
    overflow: 'unset'
}

const styleEventsObj = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    border: '2px solid #4D584D',
    // position: 'relative',
    overflow: 'unset',
    // border: '1px solid red',
    minWidth: 100,
    // width: 350,
    minHeight: 100,
    height: 620
}

const styleChatEvents = {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    position: 'relative',
    overflow: 'unset',
    border: '2px solid #4D584D',
    minWidth: 350,
    width: 350,
}

export  {styleConsent, styleOrg, styleCardMapInfo, styleEventsObj, styleChatEvents}
