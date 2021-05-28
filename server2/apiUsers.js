const express = require('express');
const cors = require('cors')
const PORT =  '3005';
// const PORT = process.env.PORT || '3005';

// const proj4 =require('proj4');
// const def_msk = '+proj=tmerc +lat_0=55.6666666667 +lon_0=37.5 +x_0=0 +y_0=0 +k_0=1. +a=6377397 +rf=299.15 +towgs84=396,165,557.7,-0.05,0.04,0.01,0 +no_defs';
const app = express();
app.use(express.json()); //work

app.use(cors({
	origin: "http://localhost:3004",
	methods: ["POST"],
	options: '*'
})); //work

const { Pool } = require('pg');

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

async function getUserById(userId){

	return new Promise ((resolve, reject) => {
		let queryText  = ` SELECT * FROM mggt_users WHERE user_id = ${userId};`; // good
		query(queryText)
			.then(function(data){
				let result = {
					user: data.rows[0] // get 276
				}
				resolve(result);
			})
			.catch(function(err){console.log(err)});
	});
}

async function getUserAmountObjs(userId){
	return new Promise ((resolve, reject) => {
		let queryText  = `SELECT count(DISTINCT rec_obj_id) FROM public.mggt_recombination WHERE rec_send_id = ${userId};`;
		query(queryText)
			.then(function(data){
				let result = {
					amObjs: data.rows[0].count // get 276
				}
				resolve(result);
			})
			.catch(function(err){console.log(err)});
	});
}

async function getUserAmountAllMessages(userId){
	return new Promise ((resolve, reject) => {
		let queryText  = `SELECT count(*) FROM public.mggt_message WHERE msg_user_id = ${userId};`;
		query(queryText)
			.then(function(data){
				let result = {
					amAllMessages: data.rows[0].count // get 276
				}
				resolve(result);
			})
			.catch(function(err){console.log(err)});
	});
}

async function getUserAmountMessagesWithFile(userId){
	return new Promise ((resolve, reject) => {
		let queryText  = `SELECT count(*) FROM public.mggt_message WHERE msg_user_id = ${userId} and msg_file IS NOT NULL;`;
		query(queryText)
			.then(function(data){
				let result = {
					amMessagesWithFile: data.rows[0].count // get 276
				}
				resolve(result);
			})
			.catch(function(err){console.log(err)});
	});
}

async function getUserAmountMessagesOfDay(userId){
	return new Promise ((resolve, reject) => {
		let queryText  = `SELECT count(*) FROM public.mggt_message WHERE msg_user_id = ${userId} and msg_date > (now() - interval '1 day');`;
		query(queryText)
			.then(function(data){
				let result = {
					mesOfDay: data.rows[0].count // get 276
				}
				resolve(result);
			})
			.catch(function(err){console.log(err)});
	});
}

async function getUserAmountMessagesOfDayWithFile(userId){
	return new Promise ((resolve, reject) => {
		let queryText  = `SELECT count(*) FROM public.mggt_message WHERE msg_user_id = ${userId} and msg_date > (now() - interval '1 day')  and  msg_file IS NOT NULL;`;
		query(queryText)
			.then(function(data){
				let result = {
					mesOfDayFile: data.rows[0].count // get 276
				}
				resolve(result);
			})
			.catch(function(err){console.log(err)});
	});
}

async function getUserAmountEvents(userId){
	return new Promise ((resolve, reject) => {
		let queryText  = `SELECT count(*) FROM public.mggt_recombination WHERE rec_send_id = ${userId} and  rec_status = 2;`;
		query(queryText)
			.then(function(data){
				let result = {
					userEvents: data.rows[0].count // get 276
				}
				resolve(result);
			})
			.catch(function(err){console.log(err)});
	});
}

async function getUserActives(userId){
	return new Promise ((resolve, reject) => {
		let queryText  = `SELECT rec_name, 
(SELECT obj_name FROM public.mggt_objects WHERE obj_id = rec_obj_id) AS rec_obj_name, 
\t rec_send_id, 
\t (SELECT user_fio FROM public.mggt_users WHERE user_id = rec_recip_id) AS rec_recip_fio, 
\t rec_id, rec_status, rec_descrip, rec_date  
\t FROM public.mggt_recombination  
\t WHERE rec_send_id  = ${userId}  ;`;
		query(queryText)
			.then(function(data){
				let result = {
					userActive: data.rows // get 276
				}
				resolve(result);
			})
			.catch(function(err){console.log(err)});
	});
}

//API endpoint 180521 Для Карточки пользователя Tab1
app.post('/query/user', cors(), async function(req, res){
	const { userID } = req.body;

	try {
		let resUser = 							await getUserById(userID);
		let resUserAmObjs = 					await getUserAmountObjs(userID);
		let resUserAmAllMessages = 				await getUserAmountAllMessages(userID);
		let resUserAmMessagesWithFile = 		await getUserAmountMessagesWithFile(userID);
		let resUserAmMessagesOfDay = 			await getUserAmountMessagesOfDay(userID);
		let resUserAmMessagesOfDayWithFile = 	await getUserAmountMessagesOfDayWithFile(userID);
		let resUserEvents = 					await getUserAmountEvents(userID);
		let resUserActives = 					await getUserActives(userID);
		let result = {
			user: resUser.user || '',
			userAmObjs: resUserAmObjs.amObjs || 0,
			userAmAllMes: resUserAmAllMessages.amAllMessages || 0,
			userAmMesFile: resUserAmMessagesWithFile.amMessagesWithFile || 0,
			mesOfDay: resUserAmMessagesOfDay.mesOfDay || 0,
			mesOfDayFile: resUserAmMessagesOfDayWithFile.mesOfDayFile || 0,
			resUserEvents: resUserEvents.userEvents || 0,
			resUserActives: resUserActives.userActive || {},
		}
		res.send(result);
	} catch (e){
		console.log(' error - ',e);
	}
})


async function getObjById(objId){
	return new Promise ((resolve, reject) => {
		let queryText  = `SELECT * FROM public.mggt_objects WHERE obj_id = ${objId};`; // good
		query(queryText)
			.then(function(data){
				let result = {
					obj: data.rows[0]
				}
				resolve(result);
			})
			.catch(function(err){console.log(err)});
	});
}

app.post('/query/obj/data', cors(), async function(req, res){
	const { objId } = req.body;
	try {
		let resObj =  await getObjById(objId);
		let result = {
			objId: objId,
			objData: resObj.obj || {},
		}
		res.json(result);
	} catch (e){
		console.log(' error - /query/obj/data',e);
	}
})


/// user actives one event

//API endpoint 240521 Для Карточки пользователя Tab2 actives

async function getUserEventByRecId(recId){
	return new Promise ((resolve, reject) => {
		let queryText  = `SELECT * FROM public.mggt_recombination WHERE rec_id = ${recId};`;
		query(queryText)
			.then(function(data){
				let result = {
					userEvent: data.rows[0] // get 276
				}
				resolve(result);
			})
			.catch(function(err){console.log(err)});
	});
}

app.post('/query/rec/data', cors(), async function(req, res){
	const { userID } = req.body;
	//SELECT * FROM public.mggt_recombination WHERE rec_id = 491;
	try {
		let resUserEvent = 							await getUserEventByRecId(recId);
		let result = {
			userEvent: resUserEvent.userEvent || '',
		}
		res.send(result);
	} catch (e){
		console.log(' error - ',e);
	}
})





app.listen(PORT, () => console.log('==============Server start on port:',PORT,'======================'))
