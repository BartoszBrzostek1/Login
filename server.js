const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");
let LocalStorage = require('node-localstorage').LocalStorage, localStorage = new LocalStorage('./scratch'); 

const router = require('./router');
const app = express();

const port = process.env.PORT || 8080;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.set("view engine", "ejs");
app.use('/static', express.static(path.join(__dirname, 'public')))

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true,
    views: 0
}));

app.use('/route', router);

app.get('/', (req, res) => {
    req.session.views = 0;
    res.render('index');
})

app.listen(port, ()=>{console.log("Listen!")});