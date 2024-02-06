const mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'database-1.clw08wwgm5ok.ap-southeast-2.rds.amazonaws.com',
    user     : 'admin',
    port : '3306',
    password : 'coba1234',
    database : 'MyDb'
});

module.exports = connection