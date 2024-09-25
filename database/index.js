import mysql from 'mysql'
 const connection = mysql.createConnection({
    host     : 'database-1.co1tih7nxklf.ap-southeast-1.rds.amazonaws.com',
    user     : 'admin',
    port : '3306',
    password : 'S4lm4n95',
    database : 'logistics'
});

export default connection

