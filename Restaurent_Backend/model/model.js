// database connection 
const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "11224455",
    database: "test",
    port: 3306,
    multipleStatements: true,
});

module.exports = db