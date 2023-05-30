const { Pool } = require('pg');

const dbConnection = new Pool({
    user: 'nilsuaksy',
    password: '1245',
    database: 'hastaneler'
});

module.exports = { dbConnection }; 