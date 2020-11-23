const express = require('express') 
var cors = require('cors');
const mysql = require('mysql') 
const md5 = require('md5');
const db = mysql.createConnection({   
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'streetfood'
})
db.connect()
const app = express() 
app.use(cors());

app.get('/users', (req, res) => {  
    let sql = 'SELECT username,fname,lname,email FROM member' 
    let query = db.query(sql, (err, results) => { 
        if (err) throw err  
        console.log(results) 
        res.json(results)   
    })
})

app.get('/users/memberID', (req, res) => {  
    let memberID = req.query.memberID
    let sql = 'SELECT username,fname,lname,email FROM member WHERE memberID = '+memberID 
    let query = db.query(sql, (err, results) => { 
        if (err) throw err  
        console.log(results) 
        res.json(results)   
    })
})

app.get('/users/email', (req, res) => {  
    let email = req.query.email
    let sql = "SELECT username,fname,lname,email FROM member WHERE email = '"+email+"'" 
    let query = db.query(sql, (err, results) => { 
        if (err) throw err  
        console.log(results) 
        res.json(results)   
    })
})

app.get('/users/username', (req, res) => {  
    let username = req.query.username
    let sql = "SELECT username,fname,lname,email FROM member WHERE username = '"+username +"'" 
    let query = db.query(sql, (err, results) => { 
        if (err) throw err  
        console.log(results) 
        res.json(results)   
    })
})

app.get('/login', (req, res) => {  
    let username = req.query.username
    let password = md5(req.query.password)
    let sql = "SELECT memberID,username,fname,lname,email FROM member WHERE username = '"+username +"' AND password = '"+password+"'" 
    let query = db.query(sql, (err, results) => { 
        if (err){
            let data = {
                status : 'error',
                result : err
            }
            res.json(data) 
        }else{
            let data = {
                status : 'success',
                result : results
            }
            res.json(data) 
        }
    })
})

app.get('/shop', (req, res) => {  
    let sql = "SELECT * FROM shop" 
    let query = db.query(sql, (err, results) => { 
        if (err) throw err  
        console.log(results) 
        res.json(results)   
    })
})

app.get('/shop/:id', (req, res) => {  
    let shopID = req.params.id
    let sql = "SELECT * FROM shop WHERE shopID = '"+ shopID+"'"
    let query = db.query(sql, (err, results) => { 
        if (err) throw err  
        console.log(results) 
        res.json(results)   
    })
})

app.get('/shop/product/:id', (req, res) => {  
    let shopID = req.params.id
    let sql = "SELECT * FROM product WHERE shopID = '"+ shopID+"'"
    let query = db.query(sql, (err, results) => { 
        if (err) throw err  
        console.log(results) 
        res.json(results)   
    })
})





app.listen('3001', () => {   
    console.log('start port 3001')
})