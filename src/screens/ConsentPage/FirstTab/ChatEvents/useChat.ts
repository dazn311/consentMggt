import {useEffect, useRef, useState} from "react";
// import socketIOClient from "socket.io-client";
import {io, Socket} from "socket.io-client";

const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const SOCKET_SERVER_URL = "http://localhost:4000";
const GET_ALL_MESSAGES_OF_ROOM = 'allMessages';
const USER_NAME = 'ЖКХиБ ВАО'

let lastIds = '9920'

interface messInputType {
    body: string
    date: string
    senderId: string
    userName: string
}

interface messFromDBType {
    msg_attch_id: number // 0
    msg_date: string // "2021-03-26T12:04:30.000Z"
    msg_file: string | null //  null
    msg_fio: string // "Кисляркина Л.Л."
    msg_geomet: string | null // null
    msg_id: string // "9446"
    msg_read: number // 0
    msg_rec_id: string // "3265"
    msg_status: number // 1
    msg_text: string // "Пользователь Кисляркина Л.Л. инициировал/а событие №3265 на ОГХ «Яхромский проезд (район Дмитровский)» (9112)"
    msg_user_id: number // 182
}

interface firstMessagesType {
    body: string
    date: string
    senderId: string
    userName: string
    ownedByCurrentUser: boolean
}

const refactorMess = (mess: messFromDBType[]) => {

    let newMessArr: firstMessagesType[] = mess.map(m => {
        return {
            body: m.msg_text,
            date: m.msg_date,
            senderId: m.msg_user_id.toString(),
            userName: m.msg_fio,
            ownedByCurrentUser: false
        }
    })

    return newMessArr
}


const useChat = (roomId: string) => {
    const [messages, setMessages] = useState<firstMessagesType[]>([]);

    // const [lastIds, setLastIds] = useState([]);
    // const socketRef  = useRef<any>(null) ;

    const socketRef  = useRef(null) as any;

    useEffect(() => {

        socketRef.current  = io(SOCKET_SERVER_URL, { query: {roomId, USER_NAME} });

        // при входе в комнату, заполняем прошлыми сообщениями
        socketRef.current.on(GET_ALL_MESSAGES_OF_ROOM, (messages: messInputType[]) => {
            lastIds += `, ${socketRef.current.id}`  // добавляем текущее id
            if (messages.length) {
                let firstMessages: firstMessagesType[] = messages.map(mes => {
                    let isMe = lastIds.includes(mes.senderId.toString())
                    return {...mes, ownedByCurrentUser: isMe}
                })
                setMessages(firstMessages);
            }
        });

        // при входе в комнату, заполняем прошлыми сообщениями
        socketRef.current.on('salut-event', (messages: messFromDBType[]) => {
            console.log('salut-event', messages);
            const refactorMessages = refactorMess(messages)
            setMessages(refactorMessages);
        });

        socketRef.current.on(NEW_CHAT_MESSAGE_EVENT, (message: messInputType) => {
            console.log('NEW_CHAT_MESSAGE_EVENT messages', message);
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

    const sendMessage = (messageBody: string) => {
        socketRef.current.emit(NEW_CHAT_MESSAGE_EVENT, {
            userName: USER_NAME,
            body: messageBody,
            senderId: socketRef.current.id,
        });
    };

    return {messages, sendMessage};
};

export default useChat;

// то что приходит с сервера
//interface messType {
//     msg_id: number; // '29760',
//     msg_rec_id: number; //'3265',
//     msg_text: string; //'Согласно дан',
//     msg_status: number; // 1 ,
//     msg_date: string; // 2021-04-09T13:01:27.000Z,
//     msg_read: number;// 1,
//     msg_user_id: number;// 158,
//     msg_attch_id: number;// 0,
//     msg_fio: string;// 'Масейкин Н.Н.',
//     msg_file: number;// null,
//     msg_geomet: number;// null
//     date: string;
//     body: string;
//     ownedByCurrentUser: boolean;
// }