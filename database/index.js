import mysql from 'mysql'
 const connection = mysql.createConnection({
    host     : 'database-1.clw08wwgm5ok.ap-southeast-2.rds.amazonaws.com',
    user     : 'admin',
    port : '3306',
    password : 'coba123456',
    database : 'MyDb'
});

export default connection

