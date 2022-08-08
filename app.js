const { urlencoded } = require("express");
const express = require("express");
//make conncetion
const mongoose = require('mongoose');
const db = mongoose.connect('mongodb://localhost:27017/new');
//declare schema
const nameSchema = mongoose.Schema({
    username: ``,
    number: ``,
    city: ``,
    password: ``,
    email: ``
});

const { fstat } = require("fs");
const fs = require("fs");
const { request } = require("http");
const path = require("path");
const { toNamespacedPath } = require("path");
const app = express();
const port = 80;
app.use(express.urlencoded())
app.use('/static', express.static('temp'));
app.set('view engine', 'pug')
app.set('views', path.join(__dirname, "temp"))
    //route for  index page
app.get('/', (req, res) => {
    res.status(200).render('index.pug');

})
app.get('/signup', (req, res) => {
        res.status(200).render('signup.pug');

    })
    //post Api
app.post('/signup', async(req, res) => {
    //body parser
    pass = req.body.password
    city = req.body.city
    email = req.body.email
    number = req.body.number
    user = req.body.user
        //declare model 
    const Name = mongoose.model('Name', nameSchema)
    const result = await Name.insertMany({
        username: `${user}`,
        number: `${number}`,
        city: `${city}`,
        password: `${pass}`,
        email: `${email}`
    });

    res.send('Data Inserted')

})
app.get('/search', async(req, res) => {
    //declare model 
    res.render('search.pug');
})
app.post('/search', async(req, res) => {
    email = req.body.email
    const Name = mongoose.model('Name', nameSchema)
    const upd = await Name.find({ email: `${email}` })
    res.send(upd)
})
app.get('/Delete', async(req, res) => {
    //declare model 
    res.render('Delete.pug');
})
app.post('/Delete', async(req, res) => {
    email = req.body.email
    const Name = mongoose.model('Name', nameSchema)
    const del = await Name.deleteMany({ email: `${email}` })
    res.send("Deleted succesfully")

})
app.get('/update', async(req, res) => {
    //declare model 
    res.render('update.pug');
})
app.post('/update', async(req, res) => {
    pass = req.body.password
    email = req.body.email
    npass = req.body.npass
    ncity = req.body.ncity
    nemail = req.body.nemail
    nnumber = req.body.nnumber
    nuser = req.body.nuser
    const Name = mongoose.model('Name', nameSchema)
    const up = await Name.updateMany({ email: `${email}`, password: `${pass}` }, {
        $set: { email: `${nemail}`, password: `${npass}`, city: `${ncity}`, number: `${nnumber}` }
    })
    res.send("updated succesfully");

})
app.listen(port, (req, res) => {
    console.log(` this app is running succesfully `)
})