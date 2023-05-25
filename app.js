//this is a function
const express = require('express')
const bodyParser = require('body-parser')
const sqlite3 = require('sqlite3').verbose()
const md5 = require('md5')
const cors = require('cors')
const dbsource = '/Users/robertocandela/Desktop/sqlite-tools-osx-x86-3420000/test.db'
const port = 3000
//app is an object

const app = express()

//configuring middleware cors
app.use(cors())
//configuring middleware body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

let db = new sqlite3.Database(dbsource,(err) =>{
    if(err){
        console.log(err.message)
        throw err

    }else{
        console.log('Connected to database!')
    }
});
app.get('/',(req,res) => {
    res.send("root")
});
app.get('/test1',(req,res) => {
    res.send("test1")
});

app.get('/testApp/dipendenti',(req,res)=>{

    var sql = "select * from dipendenti;"

    db.all(sql,[],(err,rows) => {
        if(err){
            res.status(400).json({"error" : err.message})
            return;
        }

        res.json({
            "dipendenti" : rows
        })
        console.log("DB Query succeeded!")
    });

});


app.post('/test2',(req,res) => {
    let data = req.body
    res.status(201)
    res.send("received body "+JSON.stringify(data))
    
    
})


app.listen(port, ()=>{
    console.log(`Example app listening on port ${port}`)
})



