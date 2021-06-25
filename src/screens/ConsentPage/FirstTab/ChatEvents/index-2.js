import React, { Fragment, useState, useEffect } from 'react';
import { render } from 'react-dom';
import io from 'socket.io-client';
import 'babel-polyfill';

import C from './consts';
import E from './events';
import Messages from './components/Messages';
import Form from './components/Form';
import UsersBar from './components/UsersBar';
import OnlineUserBar from './components/OnlineUserBar';

const socket = io.connect(C.SOCKET_URL);

const ChatEvents = () => {
  const [messages, setMessages] = useState([
    {
      text: 'Согласование?',
      name: 'МГГТ'
    },
    {
      text: 'Да, согласуем объект',
      name: 'Ксения'
    }
  ]);

  const [user, setUser] = useState({
    // id: 1,
    // name: 'МГГТ',
    // orgName: '',
    // available: false,
    // avatar: '1.jpg'
  });

  useEffect(function() {
    socket.on(E.ADD_MESSAGE_FROM_SERVER, ({ message }) =>
      setMessages(messages => [...messages, message])
    );
  }, []);

  const chooseUserHandler = ({ id, name, orgName, avatar }) => {
    socket.emit(E.CHOOSE_USER_FROM_CLIENT, { id });
    setUser({ name, orgName, avatar });
  };

  const addMessageHandler = message => {
    const newMessage = {
      ...user,
      text: message
    };
    socket.emit(E.ADD_MESSAGE_FROM_CLIENT, { message: newMessage });
    setMessages(messages => [...messages, newMessage]);
  };

  const delUserS = (id) => {
    const chooseUser = {
      id: 1,
      name: 'Урсу Ю.А',
      orgName: 'ГБУ "МГГТ"',
      available: false,
      avatar: '1.jpg'
    }
    setUser(chooseUser)
    socket.emit(E.CHOOSE_USER_FROM_CLIENT, { id });

  }
  console.log('user',user)
  return (
    <div>
      {/*<button onClick={delUserS} >back</button>*/}
      {user.name ? (
        <Fragment>
          <UsersBar socket={socket} onChoose={chooseUserHandler} />
          <OnlineUserBar user={user} />
          <Messages messages={messages} />
          <Form onSubmit={addMessageHandler} />
        </Fragment>
      ) : (
        <Fragment>
          <h4>Смежники и МГГТ</h4>
          <UsersBar socket={socket} onChoose={chooseUserHandler} />
        </Fragment>
      )}
    </div>
  );
};

export default ChatEvents

// render(
//   <ChatContainer>
//     <ChatEvents />
//   </ChatContainer>,
//   document.getElementById('root')
// );
