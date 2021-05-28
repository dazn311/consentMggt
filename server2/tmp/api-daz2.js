const express = require('express');
const cors = require('cors')
const PORT =  '3005';
// const PORT = process.env.PORT || '3005';

const app = express();
//Вызов библиотеки
const { Pool } = require('pg')

//Покдючение пула
const pool = new Pool({
	user: "mggt_alex",
	password: "79y7BdJFtmqJVtJn",
	host: "176.53.160.74",
	port: "5432",
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

//Вызываем функцию для выполнения нашего запроса.
async function get_online_byinterval(vars){
	console.log(vars);
	return new Promise ((resolve, reject) => {

		//Проверяем входные параметры и добавляем к строке в случае наличия
		let queryText, functionVars;
		if(typeof vars != 'undefined'){
			functionVars = "";
			if(typeof vars.startDate != 'undefined'){
				functionVars += "'"+vars.startDate+"'";
			}
			if(typeof vars.endDate != 'undefined'){
				functionVars += ",'"+vars.endDate+"'";
			}
			queryText = `
				SELECT * FROM get_online_byinterval(`+functionVars+`);
			`;
		} else {
			queryText = `
				SELECT * FROM get_online_byinteval();
			`;

		}
		console.log(queryText);
		query(queryText)
			.then(function(data){
				//console.log(data.rows[0]);
				let result = {
					startTime: data.rows[0].starttime,
					endTime: data.rows[0].endtime,
					online: data.rows[0].online
				}
				resolve(result);
			})
			.catch(function(err){console.log(err)});
	});
}



//API endpoint
app.post('/query/users/online/byinterval', async function(req, res){
	console.log( 'Запрос на кол-во пользователей онлайн за промежуток времени',req);
	console.log(req.body);
	try {
		let result = await get_online_byinterval(req.body);
		res.send(result);
		console.log(result);
	} catch (e){
		console.log(e);
	}
})




app.listen(PORT, () => console.log('==============Server start on port:',PORT,'======================'))


