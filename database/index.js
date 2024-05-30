import mysql from 'mysql'
 const connection = mysql.createConnection({
    host     : 'database-2.cjwcywoci4t3.ap-southeast-1.rds.amazonaws.com',
    user     : 'admin',
    port : '3306',
    password : 'coba12345',
    database : 'MyDb'
});

export default connection

