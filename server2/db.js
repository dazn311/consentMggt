// const pgp = require('pg-promise')();
// const db = pgp("postgres://mggt_alex:79y7BdJFtmqJVtJn@176.53.160.74:5432/test_polygon_2");
// const db = pgp("postgres://dazn311:postgress@localhost:5432/dazn311");

// module.exports = db;
 
// ver.2

// const pgp = require('pg')();

const Pool = require('pg').Pool;


const pool = new Pool({
    user: "mggt_alex",
    password: "79y7BdJFtmqJVtJn",
    host: "176.53.160.74",
    port: "5432",
    database: "test_polygon_2",
    max: 25,
	idleTimeoutMillis: 30000,
	connectionTimeoutMillis: 2000

});

//При ошибке переподключаемся к базе
pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})

// const pool = new Pool({
//     user: "dazn311",
//     password: "root",
//     host: "localhost",
//     port: "5432",
//     database: "dazn311"

// });
 
module.exports = pool;


