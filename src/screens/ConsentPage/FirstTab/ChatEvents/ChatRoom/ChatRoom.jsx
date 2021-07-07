import React, {useEffect, useRef} from "react";

import {Slide} from "@material-ui/core";

import "./ChatRoom.css";
import useChat from "../useChat";

// let isShowDate = true
// let mesListDate = {dateShow: '', isShowDate: true}

const MessageLi = ({message, i}) => {
    let dateDay = message.date.slice(11, 16)
    return (<li  key={i}  className={`message-item ${ message.ownedByCurrentUser ? "my-message" : "received-message"  }`}  >
            {message.body}
            <span style={{fontSize: 'smaller', marginLeft: 4, color: 'lightslategrey'}}>{dateDay}</span>
        </li>
    )
};

const ChatRoom = ({currentEventObjS}) => {
    const roomId = currentEventObjS | 9750 // props.match.params;
    // const { roomId } =  props.match.params;
    const {messages, sendMessage} = useChat(roomId);
    const [newMessage, setNewMessage] = React.useState("");

    const lastDiv = useRef(null);
    let dateShow = ''
    let isShowDate = true


    const handleNewMessageChange = (event) => {
        setNewMessage(event.target.value);
    };

    const handleSendMessage = () => {
        sendMessage(newMessage);
        setNewMessage("");
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
                <div ref={lastDiv}></div>
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


// const mapStateToProps = createStructuredSelector({
//     currentEventObjS: currentEventObjSelector,
// });

export default ChatRoom
// export default connect(mapStateToProps)(ChatRoom);
