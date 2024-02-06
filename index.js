// const express = require('express')
const mysql   = require('mysql');
var connection = mysql.createConnection({
    host     : 'database-2.clw08wwgm5ok.ap-southeast-2.rds.amazonaws.com',
    user     : 'admin',
    port : '3306',
    password : 'coba1234',
    database : 'TA'
    });
    
    connection.connect((err) => {
        if (err) {
            console.log('error connecting: ' + err);
            return;
          }
         
          console.log('connected');
    });
    
// const app = express()
// app.get('/', (req,res)=> {

    

//     res.json({
//         data : "Hello"
//     })
// })

// app.listen(4000,() => {
//     console.log("server running")
// })