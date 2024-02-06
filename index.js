const express = require('express')
const cors = require('cors')
const connection = require('./database');
    
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.get("/users" , (req , res) => {
    connection.query(`SELECT * FROM user` , (err,results) => {
        if(err){
            res.json({ message : 'error'})
        }else{
            res.json({
                data : results
            })
        }
    })
    connection.end()
})

app.post("/login" , (req , res) => {
    const queryData = req.body
    connection.query(`select * from user where email = '${queryData.email}' and password = '${queryData.password}'` , (err,results) => {
        if(results){
            res.json({ data : results[0]})
        }else{
            res.json({
                message : 'error'
            })
        }
    })
    connection.end()
})

app.post("/create-user" , (req , res) => {
    const {nama,email,password} = req.body
    connection.query(`insert into user (nama,email,role,password) values('${nama}','${email}',2,'${password}')` , (err,results) => {
        if(err){
            res.json({ message : 'error'})
        }else{
            res.json({ message : "Success"})
        }
    })
    connection.end()
})


app.listen(4000,() => {
    console.log("server running")
})