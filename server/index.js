const path = require('path');
const express = require("express");
var mysql = require('mysql');
var nodemailer = require('nodemailer');
var moment = require('moment');
var jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const auth = require("../middleware/auth");

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();

const cors = require("cors");
const dbConfig = require('../app/config/db.config');
var corsOptions = {
    origin: "http://localhost:3000"
};

var con = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "123456",
    database: "myattend"
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// con.connect(err => {
//     console.log(' connected')

// })
app.get("/creatdb", (req, res) => {
    let sqlQuery = 'CREATE DATABASE myattend';
    con.query(sqlQuery, (err, res) => {
        if (err) throw err;
        console.log('created Db')
    })
});

app.get("/creattable", (req, res) => {
    let sqlQuery = 'CREATE TABLE employee ( id int primary key autoincrement, name varchar(255) NOT NULL, email varchar(190) UNIQUE, password varchar(190), joining_date varchar(255) NOT NULL';
    con.query(sqlQuery, (err, res) => {
        if (err) throw err;
        console.log('created Db')
    })
});

app.get("/creatattendancetable", (req, res) => {
    let sqlQuery = 'CREATE TABLE attendance ( id int autoincrement, email varchar(190), attenddate varchar(255) NOT NULL';
    con.query(sqlQuery, (err, res) => {
        if (err) throw err;
        console.log('created Db')
    })
});

app.get("/setattendance", (req, res) => {
    let today = new moment().format("MMM Do YYYY");
    let data = { email: req.body.email, attenddate: today};
    let sqlQuery = 'INSERT INTO attendance SET ?';
    con.query(sqlQuery, data, (err, res) => {
        if (err) {res.send({success: false, error: err})}
        console.log('set data');
        res.send({success: true})
    })
});

app.post("/newemployee", (req, res) => {
    let random_password = parseInt((Math.random() * (10 ** 7))).toString()
    let data = { name: req.body.name, email: req.body.email, joining_date: req.body.dateofjoin, password: random_password }
    // let sqlQuery = 'INSERT INTO employee SET ?';
    // con.query(sqlQuery, data, (err, res) => {
    //     if (err) throw err;
    //     const transporter = nodemailer.createTransport({
    //         host: "smtp.mailtrap.io",
    //         port: 2525,
    //         auth: {
    //           user: "8f37661ac4331d",
    //           pass: "b40e078c1a38f2"
    //         },          
    //         secure: true,
    //     })
    //     const mailData = {
    //         from: "",
    //         to: req.body.email,
    //         subject: 'Password from Employee Attendance',
    //         html: `<p>Your Password to login Employee Attendance is- ${random_password}</p>`,
    //         text: `<p>Your Password to login Employee Attendance is- ${random_password}</p>`,
    //     }
    //     transporter.sendMail(mailData, function (err, info) {
    //         if (err) {
    //             console.log(err);
    //             res.status(400).json(info)
    //         }
    //         else {
    //             console.log(info);
    //             res.status(200).json(info)
    //         }
    //     })
    // })

    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'lilly.fadel87@ethereal.email', //ethereal mail
            pass: 'mqsKwRTzJmHskqncQ5'
        },
      })
    const mailData = {
        from: 'lilly.fadel87@ethereal.email', 
        to: req.body.email,
        subject: 'Password from Employee Attendance',
        html: `<p>Hi ${req.body.name}, Your Password to login Employee Attendance is- ${random_password}</p>`,
        text: `<p>Hi ${req.body.name}, Your Password to login Employee Attendance is- ${random_password}</p>`,
    }
    transporter.sendMail(mailData, function (err, info) {
        if (err) {
            console.log(err);
            res.status(400).json(info)
        }
        else {
            console.log(info);
            res.status(200).json(info)
        }
    })
});


app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});
app.post("/signin", async (req, res) => {
    const token = await jwt.sign({email: req.body.email, password: req.body.password}, process.env.JWT_SECRET_KEY);
    res.json({ message: "Hello from server!", token, success:true });
});
app.get("/askdata", (req, res) => {
    var query = "SELECT * FROM attendance ";

    connection.query(query,function(err,rows){
        if(err) {
            res.json({"success" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"success" : true, "data" : rows});
        }
    });
});


// .............for production...............
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
//   });


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

