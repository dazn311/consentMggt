import React  from 'react';
import {observer} from 'mobx-react'

import stateObjsMobx from "../../../../store/consent/objsConsent/objsCons.mobx";

import 'babel-polyfill';
import ChatRoom from "./ChatRoom/ChatRoom";

const ChatEvents = observer(() => {
  return ( <ChatRoom currentEventObjS={stateObjsMobx.eventState.selectedRecId} /> );
})

export default  ChatEvents





















// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import { render } from 'react-dom';
// import io from 'socket.io-client';

// const dazGlobalVar = 27;

// import C from './consts';
// import E from './events';
// import Messages from './components/Messages';
// import Form from './components/Form';
// import UsersBar from './components/UsersBar';
// import OnlineUserBar from './components/OnlineUserBar';
// import Home from "./Home/Home";


// import {currentEventObjSelector} from "../../../../store/consent/events/evt.selectors";
// import {createStructuredSelector} from "reselect";
// import {connect} from "react-redux";

// const socket = io.connect(C.SOCKET_URL);


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


// const mapStateToProps = createStructuredSelector({
//   currentEventObjS: currentEventObjSelector,
// });


// export default ChatEvents

// render(
//   <ChatContainer>
//     <ChatEvents />
//   </ChatContainer>,
//   document.getElementById('root')
// );
