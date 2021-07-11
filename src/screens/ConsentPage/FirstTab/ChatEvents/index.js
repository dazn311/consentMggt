import React  from 'react';
import {observer} from 'mobx-react'

import stateObjsMobx from "../../../../store/consent/objsConsent/objsCons.mobx";

// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { render } from 'react-dom';
// import io from 'socket.io-client';

import 'babel-polyfill';
// import C from './consts';
// import E from './events';
// import Messages from './components/Messages';
// import Form from './components/Form';
// import UsersBar from './components/UsersBar';
// import OnlineUserBar from './components/OnlineUserBar';
// import Home from "./Home/Home";
import ChatRoom from "./ChatRoom/ChatRoom";
// import {currentEventObjSelector} from "../../../../store/consent/events/evt.selectors";
// import {createStructuredSelector} from "reselect";
// import {connect} from "react-redux";

// const socket = io.connect(C.SOCKET_URL);
window.dazGlobalVar = 28;
// const dazGlobalVar = 27;

const ChatEvents = observer(({currentEventObjS}) => {
  // const [messages, setMessages] = useState([
  //   {
  //     text: 'Согласование?',
  //     name: 'МГГТ'
  //   },
  //   {
  //     text: 'Да, согласуем объект',
  //     name: 'Ксения'
  //   }
  // ]);

  // const [user, setUser] = useState({
  //   // id: 1,
  //   // name: 'МГГТ',
  //   // orgName: '',
  //   // available: false,
  //   // avatar: '1.jpg'
  // });


  // useEffect(function() {
  //   socket.on(E.ADD_MESSAGE_FROM_SERVER, ({ message }) =>
  //     setMessages(messages => [...messages, message])
  //   );
  // }, []);
  //


  // console.log('user',user)
  // console.log(currentEventObjS )
  return (
      <ChatRoom currentEventObjS={stateObjsMobx.eventState.selectedRecId} />
  );
})


// const mapStateToProps = createStructuredSelector({
//   currentEventObjS: currentEventObjSelector,
// });

export default  ChatEvents

// export default ChatEvents

// render(
//   <ChatContainer>
//     <ChatEvents />
//   </ChatContainer>,
//   document.getElementById('root')
// );
