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
        const someData = await dbConnection.query('SELECT * FROM hastalar order by id');

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




app.get('/details', async (req, res) => {
    try {
        const someData = await dbConnection.query(`
        select  hastalar.name, hastalar.surname, hastalar.birthplace, hastalar.birthyear, hastalar.gender, hastaneler.name hospital, hastaneler.address, hastaneler.type, muayene.description, receteler.code from (((hastalar
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
            res.status(400).send('Kullanıcı kayıtlıdır.');
        } else {
            const bodyUser = req.body.user;
            await dbConnection.query(`INSERT INTO public.users(
                "firstName", "lastName", "identityNumber", "personnelNumber", email, password, "birthYear", "phoneNumber", gender)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`, [bodyUser.firstName, bodyUser.lastName, bodyUser.identityNumber, bodyUser.personnelNumber, bodyUser.email, bodyUser.password, bodyUser.birthYear, bodyUser.phoneNumber, bodyUser.gender]);
            res.status(201).send('Kullanıcı oluşturuldu.');
        }
        res.status(404).send("Kullanıcı Bulunamadı.");
    } catch (error) {
        res.status(500);
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