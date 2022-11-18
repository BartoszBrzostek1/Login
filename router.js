let express = require("express");
const session = require("express-session");
const { isGeneratorFunction } = require("util/types");
let router = express.Router();


const passy = {
    login: "admin",
    haslo: "12345"
}


router.post('/login', (req, res) => {
    if(req.body.login == passy.login && req.body.haslo == passy.haslo){
        req.session.user = req.body.login;
        req.session.views++;
        res.redirect('/route/dashboard');
        
    }
    else
    {
        res.end("Nieprawidłowy login lub haslo")
    }
});

router.get('/dashboard', (req, res) => {
    if(req.session.user){
        res.render('dashboard', {user : req.session.user, views: req.session.views});
    }
    else
    {
        res.send("Nieautoryzowany użytkownik. Wróć aby się poprawnie zalogować.");
    }
});

router.get('/logout', (req, res) => {
    req.session.views--;
    req.session.destroy(function(error){
        if(error){
            console.log(error);
            res.send("Error")
        }
        else
        {
            res.render('index', { title: "Logowanie", logout : "Wylogowano pomyślnie"});
        }
    })
});

module.exports = router;