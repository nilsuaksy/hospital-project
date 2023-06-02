const express = require('express');
const cors = require('cors');
const { dbConnection } = require('./database/pool');

const app = express();

app.use(cors());
app.use(express.json());


app.get('/hospitals', async (req, res) => {
    try {
        const someData = await dbConnection.query('SELECT * FROM hastaneler order by id');

        const rows = someData.rows;

        res.status(200).json(rows);
    } catch (error) {
        console.log('Hata bulundu');
        res.status(500);
    }
});

app.get('/patients', async (req, res) => {
    try {
        const someData = await dbConnection.query(`
        SELECT hastalar.*, hastaneler.hname FROM hastalar  
            inner join hastaneler on hastalar.hastaneid = hastaneler.id 
        order by id
        `);

        const rows = someData.rows;

        res.status(200).json(rows);
    } catch (error) {
        console.log('Hata bulundu');
        res.status(500);
    }
});

app.get('/departments', async (req, res) => {
    try {
        const someData = await dbConnection.query('SELECT * FROM muayene order by id');

        const rows = someData.rows;

        res.status(200).json(rows);
    } catch (error) {
        console.log('Hata bulundu');
        res.status(500);
    }
});

app.get('/recipients', async (req, res) => {
    try {
        const someData = await dbConnection.query('SELECT * FROM receteler order by id');

        const rows = someData.rows;

        res.status(200).json(rows);
    } catch (error) {
        console.log('Hata bulundu');
        res.status(500);
    }
});

app.get('/MR', async (req, res) => {
    try {
        const someData = await dbConnection.query(`
        select  hastalar.pname, hastalar.surname, hastaneler.hname, muayene.description, receteler.code from (((hastalar
            inner join hastaneler on hastaneler.id = hastalar.hastaneid)
            inner join muayene on muayene.hastaid = hastalar.id)
            inner join receteler on receteler.muayeneid = muayene.id) order by hastalar.id`);

        const rows = someData.rows;

        res.status(200).json(rows);
    } catch (error) {
        console.log('Hata bulundu.');
        res.status(500);
    }
});




app.get('/details', async (req, res) => {
    try {
        const someData = await dbConnection.query(`
        select  hastalar.pname, hastalar.surname, hastalar.birthplace, hastalar.birthyear, hastalar.gender, hastaneler.hname , hastaneler.address, hastaneler.type, muayene.description, receteler.code from 
        (((hastalar
            inner join hastaneler on hastaneler.id = hastalar.hastaneid)
            inner join muayene on muayene.hastaid = hastalar.id)
            inner join receteler on receteler.muayeneid = muayene.id) order by hastalar.id`);

        const rows = someData.rows;

        res.status(200).json(rows);
    } catch (error) {
        console.log('Hata bulundu');
        res.status(500);
    }
});

app.post("/signin", async (req, res) => {
    try {
        const userInfo = await dbConnection.query(`select * from users where "personnelNumber" = $1`, [req.body.personnelNumber]);
        const user = userInfo.rows.length > 0 ? userInfo.rows[0] : null;
        if (user) {
            if (user.password === req.body.password) {
                res.status(200).json(user);
            }
        }
        res.status(404).send("Kullanıcı Bulunamadı.");
    } catch (error) {
        res.status(500);
    }
});

app.post("/signup", async (req, res) => {
    try {
        const newUserInfo = await dbConnection.query(`select * from users where "personnelNumber" = $1`, [req.body.personnelNumber]);
        const user = newUserInfo.rows.length > 0 ? newUserInfo.rows[0] : null;
        if (user) {
            console.log(req.body);
            res.status(400).send('Kullanıcı kayıtlıdır.');
        } else {
            console.log(req.body);

            const bodyUser = req.body.user;
            await dbConnection.query(`INSERT INTO public.users(
                "firstName", "lastName", "identityNumber", "personnelNumber", email, password, "birthYear", "phoneNumber", gender)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [bodyUser.firstName, bodyUser.lastName, bodyUser.identityNumber, bodyUser.personnelNumber, bodyUser.email, bodyUser.password, bodyUser.birthYear, bodyUser.phoneNumber, bodyUser.gender]);
            res.status(201).send('Kullanıcı oluşturuldu.');
        }
        res.status(404).send("Kullanıcı Bulunamadı.");
    } catch (error) {
        console.log(error);

        res.status(500).send("hata aldım");
    }
});

app.post('/hospitals', async (req, res) => {
    try {
        const newHospital = req.body;

        await dbConnection.query(`
        insert into hastaneler(hname, address, type) values($1, $2, $3)
        `, [newHospital.hname, newHospital.address, newHospital.type]);

        res.status(201).send('Kaydedildi.');
    } catch (error) {
        console.log(error);
        res.status(500).send('Hastane Kaydedilirken Hata Oluştu.');
    }
});

app.patch('/hospitals/:id', async (req, res) => {
    try {
        const hospitalId = req.params.id;
        const hospitalToBeUpdated = req.body;
        await dbConnection.query(`
        Update hastaneler set hname = $1, address = $2, type = $3 where id = $4
    `, [
            hospitalToBeUpdated.hname,
            hospitalToBeUpdated.address,
            hospitalToBeUpdated.type,
            hospitalId
        ]);

        res.status(201).send('Güncellendi.');
    } catch (error) {
        res.status(500).send('Ürün Güncellenirken Hata Oluştu.');

    }
});

app.post('/patients', async (req, res) => {
    try {
        const newPatient = req.body;

        await dbConnection.query(`
        insert into hastalar(pname, surname, birthyear, birthplace, gender) values ($1, $2, $3, $4, $5)`,
            [newPatient.pname, newPatient.surname, newPatient.birthyear, newPatient.birthplace, newPatient.gender]);

        res.status(201).send('Kaydedildi.');
    } catch (error) {
        console.log(error);
        res.status(500).send('Hasta Kaydedilirken Hata Oluştu.');
    }
});

app.patch('/patients/:id', async (req, res) => {
    try {
        const patientId = req.params.id;
        const patientToBeUpdated = req.body;
        await dbConnection.query(`update hastalar set pname = $1, surname = $2, birthyear = $3, birthplace = $4,  gender = $5 where id = $6`, [
            patientToBeUpdated.pname,
            patientToBeUpdated.surname,
            patientToBeUpdated.birthyear,
            patientToBeUpdated.birthplace,
            patientToBeUpdated.gender,
            patientId
        ]);

        res.status(201).send('Güncellendi.');
    } catch (error) {
        res.status(500).send('Ürün Güncellenirken Hata Oluştu.');
    }
});

app.delete('/hospitals/:id', async (req, res) => {
    try {
        const id = req.params.id;

        await dbConnection.query(`delete from hastaneler where id = $1`, [id]);
        res.status(204).send('Kayıt Silindi.');
    } catch (error) {
        console.log(error);
        res.status(500).send('Silinirken hata oluştu.');
    }
});


app.listen(5001, () => {
    console.log('5001. port dinleniyor.');
    dbConnection.connect().then(() => {
        console.log('Porta bağlanıldı');
    }).catch(() => {
        console.log('Porta bağlanırken sorunla karşılaşıldı.');
    });
});