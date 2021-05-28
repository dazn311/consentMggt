
const pool = require('../db');

 
class UsersController {



    async  query(q,data){
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
    async  getOnlineByInterval(vars){
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
            this.query(queryText)
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

    //Вызываем функцию для выполнения нашего запроса.
    async  getUserById(vars){
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
            this.query(queryText)
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


    // post http://localhost:3005/api/users
    async getAllUsers (req, res) {
        console.log('44 post http://localhost:3005/api/users',req.body.data);
        const {login, password} = req.body.data;
        console.log(req.body);
        try {
            let result = await this.getOnlineByInterval(req.body);
            res.send(result);
            console.log(result);
        } catch (e){
            console.log(e);
        }

    }

    // post http://localhost:3005/api/user
    async getUser (req, res) {
        console.log('44 post http://localhost:3005/api/user',req.body.data);
        const {userID} = req.body.data;
        console.log('req.body.data',req.body.data);
        try {
            let result = await this.getUserById(userID);
            console.log(result);
            res.send(result);

        } catch (e){
            console.log(e);
        }

    }






    
}

module.exports = new UsersController();


    ////  data.user_fio + "'" + ","+ "'" + data.login + "'" + ","+ "'" + data.password + "'" + ","+ "'" + data.user_fio_lit + "
// console.log('====================================');
//         console.log('user_fio, login, password, user_fio_lit',user_fio, login, password, user_fio_lit);
//         console.log('====================================');



// CREATE OR REPLACE FUNCTION add_user
//   (character varying(100), character varying(100), character(250), character(150))
// RETURNS integer
// AS $body$
// DECLARE
//     userId integer; -- use an integer variable
// BEGIN
//   IF EXISTS(SELECT 0 FROM users WHERE login = $1 AND password = $2)
//   THEN RETURN 003;
//   ELSEIF EXISTS(SELECT 0 FROM users WHERE login = $1)
//   THEN RETURN 001;
//   ELSEIF EXISTS(SELECT 0 FROM users WHERE password = $2)
//   THEN RETURN 002;
//   ELSE 
//        INSERT INTO users (login, password, user_fio, user_fio_lit) values ($1, $2, $3, $4) 
//        RETURNING id 
//        INTO userId;  
//        return userId;
//   END IF;
//   RETURN 0;
// END;
// $body$
// LANGUAGE plpgsql



// CREATE OR REPLACE FUNCTION getUsers()
// RETURNS TABLE(id integer, user_fio character, login character)
// AS $body$
// DECLARE
//     userId integer; -- use an integer variable
// BEGIN
//   IF EXISTS(SELECT 0 FROM users WHERE login = $1 AND password = $2)
//   THEN RETURN 003;
//   ELSEIF EXISTS(SELECT 0 FROM users WHERE login = $1)
//   THEN RETURN 001;
//   ELSEIF EXISTS(SELECT 0 FROM users WHERE password = $2)
//   THEN RETURN 002;
//   ELSE 
//        INSERT INTO users (login, password, user_fio, user_fio_lit) values ($1, $2, $3, $4) 
//        RETURNING id 
//        INTO userId;  
//        return userId;
//   END IF;
//   RETURN 0;
// END;
// $body$
// LANGUAGE plpgsql




// RETURNS TABLE(id integer, login character varying, password character varying, user_fio character varying, user_fio_lit character varying)
// RETURNS TABLE(id integer, login character varying, password character varying, user_fio character varying, user_fio_lit character varying)
// DECLARE
//     userLogin    character varying; -- use an integer variable
// 	userPassword character varying;
// 	userFields character varying[];
// BEGIN
//   IF EXISTS(SELECT 0 FROM users WHERE login = $1 AND password = $2)
//   THEN RETURN 003;
//   ELSEIF EXISTS(SELECT 0 FROM users WHERE login = $1)
//   THEN RETURN 001;
//   ELSEIF EXISTS(SELECT 0 FROM users WHERE password = $2)
//   THEN RETURN 002;
//   ELSE 
//        RETURN QUERY
//         SELECT id,login, password, user_fio, user_fio_lit FROM users;
//   END IF;
//   RETURN [];
// END;



// -- FUNCTION: public.getUsers(character varying, character varying)

// -- DROP FUNCTION public."getUsers"(character varying, character varying);

// CREATE OR REPLACE FUNCTION public."getUsers"(
// 	user_login character varying,
// 	user_password character varying)
//     RETURNS "char"[]
//     LANGUAGE 'plpgsql'
//     COST 100
//     VOLATILE PARALLEL UNSAFE
// AS $BODY$
// DECLARE
//      userLogin    character varying; -- use an integer variable
// 	    userPassword character varying;
// 	    userFields character varying[];
// BEGIN
// 		IF EXISTS(SELECT 0 FROM users WHERE login = user_login AND password = user_password)
//        	THEN 
//         	 SELECT id,login, password, user_fio, user_fio_lit FROM users;
// 		ELSE 
//          	SELECT login FROM users WHERE login = $1;
// 		END IF;	 
// END;
// $BODY$;

// ALTER FUNCTION public."getUsers"(character varying, character varying)
//     OWNER TO dazn311;




// TABLE(id,  login, password, user_fio, user_fio_lit),
// CREATE OR REPLACE FUNCTION public."getUsers"(
// 	user_login character varying,
// 	user_password character varying)
//     RETURNS SETOF "char"[] 
//     LANGUAGE 'plpgsql'
//     COST 100
//     STABLE PARALLEL UNSAFE
//     ROWS 1000

// AS $BODY$
// DECLARE
// 	userFields character varying[];
// BEGIN
// 		IF EXISTS(SELECT 0 FROM users WHERE login = user_login AND password = user_password)
//        	THEN 
//         	RETURN QUERY (SELECT users.id,users.login, users.password, users.user_fio, users.user_fio_lit FROM users);
// 		ELSE 
//          	RETURN QUERY (SELECT users.login FROM users WHERE login = user_login);
// 		END IF;	 
// END;
// $BODY$;

// ALTER FUNCTION public."getUsers"(character varying, character varying)
//     OWNER TO dazn311;




// CREATE OR REPLACE FUNCTION get_all_users(login character varying, password character varying)
// RETURNS TABLE(id integer, login character varying, password character varying, user_fio character varying, user_fio_lit character varying) as $$
// DECLARE
//     server_session TABLE(users.id, users.login,
//         users.password, users.password, users.user_fio, users.user_fio_lit);
// BEGIN
//     select 0 from users where users.login=login and users.password=password into server_session;
//     IF FOUND
//         THEN
//             BEGIN
//                 RETURN  QUERY SELECT 
//                             users.id, users.login,
//                             users.password, users.password, users.user_fio, users.user_fio_lit FROM users;
//             EXCEPTION
//                 WHEN OTHERS THEN
//                     RAISE NOTICE 'Data rows were NOT found (%)',SQLERRM;
//                     RETURN;

//             END;
//         ELSE
//             RAISE NOTICE 'Session row was NOT found';
//             RETURN;
//     END IF;
// END;
// $$ LANGUAGE plpgsql;


// CREATE OR REPLACE FUNCTION public.get_all_users(
// 	"userLogin" character varying,
// 	"userPassword" character varying)
//     RETURNS TABLE(id integer, login character varying, password character varying, user_fio character varying, user_fio_lit character varying) 
//     LANGUAGE 'plpgsql'
//     COST 100
//     VOLATILE PARALLEL UNSAFE
//     ROWS 1000

// AS $BODY$
// DECLARE
//     server_session character varying[];
// BEGIN
//     select 0 from users where users.login=userLogin and users.password=userPassword into server_session;
//     IF FOUND
//         THEN
//             BEGIN
//                 RETURN  QUERY SELECT 
//                             users.id, users.login,
//                             users.password, users.password, users.user_fio, users.user_fio_lit FROM users;
//             EXCEPTION
//                 WHEN OTHERS THEN
//                     RAISE NOTICE 'Data rows were NOT found (%)',SQLERRM;
//                     RETURN;

//             END;
//         ELSE
//             RAISE NOTICE 'Session row was NOT found';
//             RETURN;
//     END IF;
// END;
// $BODY$;

// ALTER FUNCTION public.get_all_users(character varying, character varying)
//     OWNER TO dazn311;



// DECLARE
//     userId char[]; -- use an integer variable
// BEGIN
//   IF EXISTS(SELECT 0 FROM users WHERE login = $1 AND password = $2)
//   THEN 
//   	SELECT login, password, user_fio, user_fio_lit FROM users 
//        RETURNING login, password, user_fio, user_fio_lit 
//        INTO userId; --<< here
//        RETURN userId;
//   ELSEIF EXISTS(SELECT 0 FROM users WHERE login = $1)
//   THEN SELECT login FROM users 
//        RETURNING login
//        INTO userId; --<< here
//        RETURN userId;
//   ELSEIF EXISTS(SELECT 0 FROM users WHERE password = $2)
//   THEN SELECT password FROM users 
//        RETURNING  password 
//        INTO userId; --<< here
//        RETURN userId;
//   END IF;
  
  
  
// END;


// DECLARE
//     userId character varying[]; -- use an integer variable
// BEGIN
//   IF EXISTS(SELECT users.login FROM public.users WHERE users.login = $1 AND users.password = $2)
//   THEN 
//   	SELECT users.login as user_login, users.password  as user_password, users.user_fio   as user_user_fio, users.user_fio_lit   as user_user_fio_lit FROM public.users 
//        INTO userId; --<< here
//        RETURN userId;
//   ELSEIF EXISTS(SELECT 0 FROM public.users WHERE users.login = $1)
//   THEN SELECT users.login FROM users 
//        INTO userId; --<< here
//        RETURN userId;
//   ELSEIF EXISTS(SELECT 0 FROM public.users WHERE users.password = $2)
//   THEN SELECT users.password FROM public.users 
//        INTO userId; --<< here
//        RETURN userId;
//   END IF;