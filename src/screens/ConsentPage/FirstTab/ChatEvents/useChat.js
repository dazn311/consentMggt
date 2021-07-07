import { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = "http://localhost:4000";
const GET_ALL_MESSAGES_OF_ROOM = 'allMessages';
const USER_NAME = 'ЖКХиБ ВАО'

let lastIds = '9920'

const useChat = (roomId) => {
  const [messages, setMessages] = useState([]);
  // const [lastIds, setLastIds] = useState([]);
  const socketRef = useRef();


  useEffect(() => {

    // console.log('useChat -- roomId',roomId);
    // console.log('useChat -- lastIds',lastIds);
    socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
      query: { roomId, USER_NAME },
    });

    // при входе в комнату, заполняем прошлыми сообщениями
    socketRef.current.on(GET_ALL_MESSAGES_OF_ROOM, (messages) => {
      // let firstMessages = []
      lastIds += `, ${socketRef.current.id}`  // добавляем текущее id
      if(messages.length){
        let firstMessages = messages.map(mes => {
          let isMe = lastIds.includes(mes.senderId.toString())
          const incomingMessage = {
            ...mes,
            ownedByCurrentUser: isMe,
            // ownedByCurrentUser: mes.senderId === socketRef.current.id,
          };
          return incomingMessage
        })
        console.log('GET_ALL_MESSAGES_OF_ROOM messages',messages);
        setMessages(firstMessages);
      }
    });

    // при входе в комнату, заполняем прошлыми сообщениями
    socketRef.current.on('salut-event', (messages) => {
      console.log('salut-event',messages);
      // setMessages(messages);
    });

    socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message) => {
      console.log('NEW_CHAT_MESSAGE_EVENT messages',message);
      const incomingMessage = {
        ...message,
        ownedByCurrentUser: message.senderId === socketRef.current.id,
      };
      setMessages((messages) => [...messages, incomingMessage]);
    });

    return () => {
      setMessages([]);
      socketRef.current.disconnect();
    };
  }, [roomId]);

  const sendMessage = (messageBody) => {
    socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
      userName: USER_NAME,
      body: messageBody,
      senderId: socketRef.current.id,
    });
  };

  return { messages, sendMessage };
};

export default useChat;
