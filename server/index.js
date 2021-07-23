// sever for chat events

// const express = require('express');
import express from "express";
import http from "http";
import {Server} from "socket.io"
import cors from "cors";

import PG from 'pg';

const Pool = PG.Pool;

const pool = new Pool({
    user: "mggt_alex",
    password: "79y7BdJFtmqJVtJn",
    host: "176.53.160.74",
    port: "5432",
    // database: "ismggt_geo",
    database: "test_polygon_2",
    max: 25,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
})

//При ошибке переподключаемся к базе
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

//Нормализированная функция для создания запросов
async function query(q,data){
    const client = await pool.connect()
    let res;
    try {
        await client.query('BEGIN')
        try {
            res = await client.query(q,data)
            await client.query('COMMIT')
        } catch (err) {
            await client.query('ROLLBACK')
            throw err
        }
    } finally {
        client.release()
    }
    return res
}


async function getMessagesByEventId(evId){
    return new Promise ((resolve, reject) => {
        let queryText  = ` SELECT * FROM public.mggt_message WHERE msg_rec_id = 3265;`;// = 3265;`; // good = ${evId};`;
        query(queryText)
            .then(function(data){
                let result = {
                    evMes: data.rows
                }
                resolve(result);
            })
            .catch(function(err){console.log(err)});
    });
}


const app = express();
app.use(cors())
app.use(express.json()); //work
app.use(function (req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*')
    next()
}); //work

///res.setHeader('Access-Control-Allow-Origin', '*')
const server = http.createServer(app);



// const { Pool } = require('pg');


//API endpoint 180521 Для Карточки пользователя Tab1
app.post('/query/event/messages', cors(), async function(req, res){
    const { evId } = req.body;

    try {
        let resEventMessages = await getMessagesByEventId(evId);
        // console.log('resEventMessages',resEventMessages)
        let result = {
            eventId: evId,
            test: evId,
            messages: resEventMessages.evMes
        }
        console.log(' resEventMessages.evMes - ',resEventMessages.evMes);
        res.send(result);
    } catch (e){
        console.log(' error - ',e);
    }
})

const io = new Server(server, {cors: {origin: '*'}});

//for rooms2 chat
const PORT = 4000;
const NEW_CHAT_MESSAGE_EVENT = "newChatMessage";
const GET_ALL_MESSAGES_OF_ROOM = 'allMessages';
const WHO_IS_IN_ROOM = 'who is in the room';
let messagesAllRoom = [] // [{idRoom: data: [{senderId,body,userName},{senderId,body,userName},{senderId,body,userName},]  },...]
const messMap = new Map();
console.log('messMap.size',messMap.size) //3


io.on("connection", async (socket) => {
    // console.log(`Client ${socket.id} connected`);

    // Join a conversation
    const {roomId, userName} = socket.handshake.query;
    console.log(`Client ${socket.id} - ${userName} connected to room ${roomId}`);
    socket.join(roomId);



    // получить данные из бд
    let resEventMessages = await getMessagesByEventId(roomId);
    // console.log('resEventMessages.evMes', resEventMessages.evMes)
    socket.to(roomId).to(socket.id).emit('salut-event',   resEventMessages.evMes);


    // socket.to(roomId).to(socket.id).emit('salut-event', 'Привет');

    // send all message of this room
    let MessOfRoom = getMessagesOfRoom(roomId, messagesAllRoom);
    if (MessOfRoom) {
        io.to(roomId).emit(GET_ALL_MESSAGES_OF_ROOM, MessOfRoom);
    }


    // Listen for new messages
    socket.on(NEW_CHAT_MESSAGE_EVENT, (data) => {
        let newData = {...data, date: new Date()}
        setMessagesOfRoom(roomId, newData, messagesAllRoom)
        console.log(`NEW_CHAT_MESSAGE_EVENT `, newData);
//NEW_CHAT_MESSAGE_EVENT  {
//   userName: 'ЖКХиБ ВАО',
//   body: 'new mess',
//   senderId: '0sjMvD2or17jfE5oAAAB',
//   date: 2021-07-19T12:56:05.700Z -- date format
// }
        io.to(roomId).emit(NEW_CHAT_MESSAGE_EVENT, newData);
    });

    // Leave the room if the user closes the socket
    socket.on("disconnect", () => {
        console.log(`Client ${socket.id} disconnected`);
        socket.leave(roomId);
    });
});


server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});

function getMessagesOfRoom(roomId, messages) {
    let idxMes = messages.findIndex(mes => mes.idRoom === roomId);
    if (idxMes > -1) {
        return messages[idxMes] ? messages[idxMes].data : null //data: [{senderId,body,userName},{senderId,body,userName},{senderId,body,userName},]
    } else {
        return null
    }

}

function setMessagesOfRoom(roomId, data, messages) {
    let idxMes = messages.findIndex(mes => mes.idRoom === roomId);

    if (idxMes > -1) {
        let dataOfRoom = messages[idxMes].data // []
        dataOfRoom.push(data)
        // let newMessages = {idRoom: roomId, data: dataOfRoom  };
        messages[idxMes] = {...messages[idxMes], data: dataOfRoom};

    } else {

        let newMessToState = {idRoom: roomId, data: [data]};
        messages.push(newMessToState);

    }

    return messages
}







// import  Pool  from 'pg'
// import * as pg from 'pg'
// const { Pool } = pg



// console.log(` socket.on NEW_CHAT_MESSAGE_EVENT data `,data);
// io.in(roomId).emit(NEW_CHAT_MESSAGE_EVENT, data);
// let newMessToState = {idRoom: roomId, data: data  };
// messagesAllRoom.push(newMessToState);

// data: {
//       userName: userName,
//       body: messageBody,
//       senderId: socketRef.current.id,
//     }


// messagesAllRoom [
//   {
//     idRoom: '10102',
//     data: {
//       userName: 'ЖКХиБ ВАО',
//       body: 'sdf',
//       senderId: 'xasxQOUOLd2HNupdAAAB'
//     }
//   }
// ]