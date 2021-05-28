
const db = require('../db');

// Organisations: 
//     [
//       {
//         org_id: 0,
//         org_name: 'АДО ВВ',
//         org_address: 'Сретенский бул., д.3',
//         org_contacts: '+7 495 666-77-66',
//         org_district: 1,
//         org_type: 1,
//       }

class OrganisationsController {
    // post http://localhost:3005/api/org
    async creatOrg (req, res) {
        const {org_name, org_address, org_contacts, org_district, org_type, user_id} = req.body;
        try {
            // поверка пользователя на наличие
            let isUser = await db.query('select exists(select 1 from users where id = $1)', [user_id]);
            isUser = isUser.rows[0].exists;
            if (isUser) {
                const newOrg = await db.query('INSERT INTO organisations (org_name, org_address, org_contacts, org_district, org_type, user_id) values ($1,$2,$3,$4,$5,$6) RETURNING *', 
                [org_name, org_address, org_contacts, org_district, org_type, user_id]);
                res.json(newOrg.rows[0]);
            } else {
                res.json({'error': 'error: no user in db'});
            }
        } catch (e) {
            res.json({'error': 'error input data for db'});
        }
        
        
    }

    // get http://localhost:3005/api/orgs
    async getAllOrgs (req, res) {
        const org = await db.query('SELECT * FROM organisations  LEFT JOIN users  ON organisations.user_id = users.id');
        res.json(org.rows);
    }
  
    // get http://localhost:3005/api/org/2
    async getOrg (req, res) {
        const id = req.params.id;
        const org = await db.query('SELECT * FROM organisations WHERE id = $1', [id]);
        res.json(org.rows[0]);
    }

    // "org_name": "УК Тверская",
    //     "org_address": "1-я Тверская ул.",
    //     "org_contacts": "1234-3333",
    //     "org_district": 2,
    //     "org_type": 1,
    //     "user_id": 4,

    // put http://localhost:3005/api/org
    async updateOrg (req, res) {
        const {org_name, org_address, org_contacts, org_district, org_type, org_id} = req.body;

        let isOrg = await db.query('select exists(select 1 from organisations where org_id = $1)', [org_id]);
        isOrg = isOrg.rows[0].exists;

        if (isOrg) {
            const newOrg = await db.query('UPDATE organisations SET org_name = $1, org_address = $2,org_contacts = $3, org_district = $4, org_type = $5 WHERE org_id = $6 RETURNING *', 
            [org_name, org_address,org_contacts, org_district, org_type, org_id]);

            res.json(newOrg.rows[0]);
        }else {
            res.json({'error': 'error: no exeting org  in db'});
        }
        

    }

    // delete http://localhost:3005/api/org/13
    async deleteOrg (req, res) {
        const id = req.params.id;
        const org = await db.query('DELETE FROM organisations WHERE org_id = $1', [id]);
        const isOrg = org.rowCount; 
        console.log('org Result',isOrg);
        if (isOrg === 0){
            res.json({'error': ' Нет такой записи в БД'});
        }else {
            res.json({'message': ' this org is deleting from db'});
        }
        
    }

    
}

module.exports = new OrganisationsController();


    ////  data.user_fio + "'" + ","+ "'" + data.login + "'" + ","+ "'" + data.password + "'" + ","+ "'" + data.user_fio_lit + "
// console.log('====================================');
//         console.log('user_fio, login, password, user_fio_lit',user_fio, login, password, user_fio_lit);
//         console.log('====================================');