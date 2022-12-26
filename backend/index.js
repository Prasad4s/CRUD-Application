const express = require('express');
const bodyparser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(cors());
app.use(bodyparser.json());


//database connection
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'crud',
    port:3306
});

//check database connection

db.connect(err=>{
    if(err){console.log('errd');}
    console.log('database connected ...');
})

//get all data

app.get('/student',(req,res)=>{
    
    let qr = `select * from student`;

    db.query(qr,(err,result)=>{
        if(err)
        {
            console.log(err,'errs');
        }

        if(result.length>0)
        {
            res.send({
                message:'all user data',
                data:result
            });
        }
    });

});

// get signle data
app.get('/student/:id',(req,res)=>{
    let gID = req.params.id;

    let qr = `select * from student where id = ${gID}`;

    db.query(qr,(err,result)=>{
        if(err){console.log(err);}

        if(result.length>0)
        {
            res.send({
                message:'get single data',
                data:result
            });
        }
        else
        {
            res.send({
                message:'data not found'
            });
        }
    });
});

//creare data

app.post('/student',(req,res)=>{
    console.log(req.body,'createdata');

    let fname = req.body.fname;
    let lname = req.body.lname;
    //let dob = req.body.dob;
    let age = req.body.age;
    let ge = req.body.gender;
    let add = req.body.address;
    let pm = req.body.pmobile;

    let qr = `insert into student(fname,lname,age,gender,address,pmobile)
                    values('${fname}','${lname}','${age}','${ge}','${add}','${pm}')`;
    console.log(qr,'qr')
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}
        console.log(result,'result')
        res.send({
            message:'data inserted',
        });
        
    });
    
});


// update single data
app.put('/student/:id',(req,res)=>{

    console.log(req.body,'updatedata');

    let gId = req.params.id;
    let fname = req.body.fname;
    let lname = req.body.lname;
    //let dob = req.body.dob;
    let age = req.body.age;
    let ge = req.body.gender;
    let address = req.body.address;
    let pm = req.body.pmobile;

    let qr = `update student set fname = '${fname}', lname ='${lname}', age='${age}', gender='${ge}', address='${address}', pmobile='${pm}'
                where id =${gId}`;

    db.query(qr,(err,result)=>{

        if(err){console.log(err);}

        res.send({
            message:'data updated'
        });
    });
})

// delete single data
app.delete('/student/:id',(req,res)=>{

    let qId = req.params.id;

    let qr = `delete from student where id = '${qId}'`;
    db.query(qr,(err,result)=>{
        if(err){console.log(err);}

        res.send(
            {
                message:'data deleted'
            }
        )
    });
});



app.listen(3000,()=>{
    console.log('server running');
})