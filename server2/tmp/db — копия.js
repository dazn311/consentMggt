const pgp = require('pg-promise')();
const db = pgp("postgres://mggt_alex:79y7BdJFtmqJVtJn@176.53.160.74:5432/test_polygon_2");
// const db = pgp("postgres://dazn311:postgress@localhost:5432/dazn311");

module.exports = db;
 
// ver.2

// const Pool = require('pg').Pool;  


// const pool = new Pool({
//     user: "dazn311",
//     password: "root",
//     host: "localhost",
//     port: "5432",
//     database: "dazn311"

// });

// module.exports = pool;





// CREATE OR REPLACE PROCEDURE public."createUser"(
// 	"$1" character varying,
// 	"$2" character varying,
// 	"$3" character varying,
// 	"$4" character varying)
// LANGUAGE 'sql'
// AS $BODY$
// INSERT INTO users (user_fio, login, password, user_fio_lit) values ($1,$2,$3,$4) RETURNING *
// $BODY$;



// tab Users

//data.user_fio + "'" + ","+ "'" + data.login + "'" + ","+ "'" + data.password + "'" + ","+ "'" + data.user_fio_lit + "

// user_id
// user_fio
// login
// password
// user_fio_lit

//Organisations: 
    // {
    //   org_id: 0,
    //   org_name: 'АДО ВВ',
    //   org_address: 'Сретенский бул., д.3',
    //   org_contacts: '+7 495 666-77-66',
    //   org_district: 1,
    //   org_type: 1,
    // }

    
////============= 
    // create table users(                                                  
    //     org_id serial primary key,                                                          
    //     org_name varchar(250),                                                          
    //     org_address varchar(250),                                                             
    //     org_contacts varchar(250),                                                          
    //     org_district integer;
    //     org_type integer
    //     FOREIGN KEY (org_id) REFERENCES users (id));

    // INSERT INTO organisations (org_name, org_address, org_contacts, org_district, org_type) values ("Волоколамская УК", "Волоколамский пр. 3", "+7 985 951-96-96", 0, 2 );