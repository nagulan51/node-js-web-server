let mysql = require('mysql')

var connection = mysql.createConnection({
    host : 'localhost', 
    user : 'root',
    password : 'root',
    database : 'tuto'
})
connection.connect();

module.exports = connection