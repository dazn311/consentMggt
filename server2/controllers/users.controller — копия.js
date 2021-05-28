
const db = require('../db');
 
class UsersController {
    // post http://localhost:3005/api/user
    async creatUser0 (req, res) {
        const {user_fio, login, password, user_fio_lit} = req.body;
        let result = 0;
        const newUser = await db.proc('createUser',[user_fio, login, password, user_fio_lit],null,result);
        console.log('result',result);
        // const newUser = await db.query('INSERT INTO users (user_fio, login, password, user_fio_lit) values ($1,$2,$3,$4) RETURNING *', 
        // [user_fio, login, password, user_fio_lit]);
        // res.json(newUser.rows[0]);
        res.set('Access-Control-Allow-Origin', 'http://localhost:3004');
        res.set('Content-Type', 'application/x-www-form-urlencoded');
        res.json({'newUser':newUser});
    }

     // post http://localhost:3005/api/user
    async creatUser (req, res) {
        const {user_fio, login, password, user_fio_lit} = req.body;
        const result = await db.func('addUser',[login, password, user_fio, user_fio_lit]);
        const userID = result[0].addUser;
        console.log('userID',userID);
         
        res.set('Access-Control-Allow-Origin', 'http://localhost:3004');
        res.set('Content-Type', 'application/x-www-form-urlencoded');
        res.json({'userID':userID});
    }

    // get http://localhost:3005/api/users
    async getAllUsers0 (req, res) {
        console.log(' get http://localhost:3005/api/users',req);
        res.set('Access-Control-Allow-Origin', 'http://localhost:3004');
        res.set('Content-Type', 'application/x-www-form-urlencoded');
        // const users = await db.query('SELECT * FROM users');
        const users = await db.query('SELECT * FROM public.mggt_users ORDER BY user_id ASC LIMIT 1000');
        res.json(users.rows);
    } 
      
    // post http://localhost:3005/api/users
    async getAllUsers (req, res) {
        console.log('44 post http://localhost:3005/api/users',req.body.data); 
        res.set('Access-Control-Allow-Origin', 'http://localhost:3004');
        res.set('Content-Type', 'application/x-www-form-urlencoded');
        //         	 SELECT id,login, password, user_fio, user_fio_lit FROM users;
        //     userLogin    character varying; -- use an integer variable
        // 	userPassword character varying;
        const {login, password} = req.body.data; 
        const userPassword = password;
        const userLogin = login;  
        // const users = await db.func('SELECT * FROM getUsers(userLogin,userPassword)',[userLogin,userPassword]);
        // const users = await db.func('getUsers',[login,password]);
        // const users = await db.func('getUsersAll',[userLogin,userPassword]); 
        // SELECT * FROM public.mggt_message

        const users = await db.func('get_users');  // получение всех пользователей
        // const users = await db.one('SELECT * FROM public.mggt_message',[{limit:2000}]); 
        // console.log('users',users); 
        // console.log('users',users.rows); 
        console.log('users',users.length); 
        res.json(users); 
    }    
     // post http://localhost:3005/api/users
    // async getAllUsers (req, res) {
    //     console.log(' post http://localhost:3005/api/users',req.body.data); 
    //     res.set('Access-Control-Allow-Origin', 'http://localhost:3004');
    //     res.set('Content-Type', 'application/x-www-form-urlencoded');
    //     //         	 SELECT id,login, password, user_fio, user_fio_lit FROM users;
    //     //     userLogin    character varying; -- use an integer variable
    //     // 	userPassword character varying;
    //     const {login, password} = req.body.data; 
    //     const userPassword = password;
    //     const userLogin = login;  
    //     // const users = await db.func('SELECT * FROM getUsers(userLogin,userPassword)',[userLogin,userPassword]);
    //     // const users = await db.func('getUsers',[login,password]);
    //     // const users = await db.func('getUsersAll',[userLogin,userPassword]); 
    //     const users = await db.func('get_users'); 
    //     console.log('users',users.rows); 
    //     res.json(users); 
    // }    
     
    // get http://localhost:3005/api/user/2
    async getUser (req, res) {
        const id = req.params.id;
        const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        // const user = await db.query('CALL yourStoredProcedure();');
        // const user = await db.proc('SELECT * FROM users WHERE id = $1', [id]);
        res.json(user.rows[0]);
    }  
 
    // put http://localhost:3005/api/user
    async updateUser (req, res) {
        const {user_fio, login, password, user_fio_lit, id} = req.body.data;
        console.log(user_fio, login, password, user_fio_lit, id);
        console.log(req.body);

        const newUser = await db.query('UPDATE users SET user_fio = $1, login = $2, password = $3, user_fio_lit = $4 WHERE id = $5 RETURNING *', 
        [user_fio, login, password, user_fio_lit, id]);
        res.json(newUser.rows[0]);

    }

    // delete http://localhost:3005/api/user/13
    async deleteUser (req, res) {
        const id = req.params.id;
        const user = await db.query('DELETE FROM users WHERE id = $1', [id]);
        res.json(user.rows[0]);
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