import React, {useEffect, useRef} from "react";

import {Slide} from "@material-ui/core";

import "./ChatRoom.css";
import useChat from "../useChat";

interface ChatRoomProps {
    currentEventObjS: number;
}

interface firstMessagesType {
    body: string
    date: string
    senderId: string
    userName: string
    ownedByCurrentUser: boolean
}

interface MessageLiProps {
    message: firstMessagesType;
    i: number
}

const MessageLi: React.FC<MessageLiProps> = ({message, i}) => {
    let dateDay = message.date.slice(11, 16)
    return (<li  key={i}  className={`message-item ${ message.ownedByCurrentUser ? "my-message" : "received-message"  }`}  >
            {message.body}
            <span style={{fontSize: 'smaller', marginLeft: 4, color: 'lightslategrey'}}>{dateDay}</span>
        </li>
    )
};

const ChatRoom: React.FC<ChatRoomProps> = ({currentEventObjS}) => {
    const roomId = currentEventObjS | 0// 9750 // props.match.params;
    const [newMessage, setNewMessage] = React.useState("");
    const {messages, sendMessage} = useChat('10606');

    console.log('change room to',currentEventObjS)

    const lastDiv = useRef(null) as React.RefObject<HTMLDivElement>
    // const lastDiv = useRef<HTMLDivElement>(null);
    let dateShow = ''
    let isShowDate = true

    const handleNewMessageChange  = (event:  React.ChangeEvent<HTMLTextAreaElement> ) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {

        // let newMesObj:firstMessagesType = {
        //     body: newMessage,
        //     date: new Date().toISOString(),
        //     senderId: '531', //.toString(),
        //     userName: "ЖКХиБ ВАО",
        //     ownedByCurrentUser: true
        // }
        sendMessage(newMessage);
        // setNewMessage(newMessage);
        setNewMessage('')
        // console.log('newMessage4444',newMessage);
        // console.log('messages4444',messages);
    };

    useEffect(() => {
        // console.log('messagesChat',messages)
        if (lastDiv.current) {
            lastDiv.current.scrollIntoView(false);
        }
    }, [messages])

    return (
        <Slide direction="left" in={true} mountOnEnter unmountOnExit>
        <div className="chat-room-container">
            <h4 className="room-name">Событие №: {roomId}</h4>
            <div className="messages-container">
                <ol className="messages-list">
                    {messages.map((message, i) => {
                        let dateDay = message.date.slice(0, 10)
                        if(dateShow.includes(dateDay)){
                            isShowDate = false
                        }else {
                            dateShow += ', ' + dateDay
                            isShowDate = true
                        }
                        return (
                            <>
                                {isShowDate &&
                                <div style={{textAlign: 'center', color: 'burlywood'}}> -- {dateDay} -- </div>}
                                <MessageLi message={message} i={i} key={i}/>
                            </>
                        )
                    })}
                </ol>
                <div ref={lastDiv} />
            </div>

            <textarea
                value={newMessage}
                onChange={handleNewMessageChange}
                placeholder="Написать сообщение..."
                className="new-message-input-field"
            />
            <button onClick={handleSendMessage} className="send-message-button">
                Отправить
            </button>
        </div>
        </Slide>
    );
};

export default ChatRoom


// const mapStateToProps = createStructuredSelector({
//     currentEventObjS: currentEventObjSelector,
// });

// export default connect(mapStateToProps)(ChatRoom);



// interface messType   {
//     msg_id: number; // '29760',
//     msg_rec_id: number ; //'3265',
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

// interface useChatType {
//     messages: firstMessagesType[];
//     sendMessage: () => {};
// }
